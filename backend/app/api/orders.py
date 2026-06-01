from decimal import Decimal

from sqlalchemy.orm import Session, joinedload
from fastapi import APIRouter, Depends, HTTPException, status

from app.db.session import get_db
from app.models.customer import Customer
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderRead


router = APIRouter(prefix="/orders", tags=["orders"])


def _order_details(query):
    return query.options(
        joinedload(Order.customer),
        joinedload(Order.items).joinedload(OrderItem.product),
    )


@router.post("", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
def create_order(payload: OrderCreate, db: Session = Depends(get_db)):
    customer = db.get(Customer, payload.customer_id)
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found.")

    merged_items: dict[int, int] = {}
    for item in payload.items:
        merged_items[item.product_id] = merged_items.get(item.product_id, 0) + item.quantity

    products = (
        db.query(Product)
        .filter(Product.id.in_(merged_items.keys()))
        .with_for_update()
        .all()
    )
    products_by_id = {product.id: product for product in products}
    missing_ids = sorted(set(merged_items) - set(products_by_id))
    if missing_ids:
        raise HTTPException(status_code=404, detail=f"Product not found: {missing_ids[0]}.")

    total = Decimal("0.00")
    order = Order(customer_id=payload.customer_id, total_amount=total)
    db.add(order)
    db.flush()

    for product_id, quantity in merged_items.items():
        product = products_by_id[product_id]
        if product.quantity_in_stock < quantity:
            db.rollback()
            raise HTTPException(
                status_code=409,
                detail=f"Insufficient inventory for product {product.sku}.",
            )
        product.quantity_in_stock -= quantity
        unit_price = Decimal(str(product.price))
        line_total = unit_price * quantity
        total += line_total
        db.add(
            OrderItem(
                order_id=order.id,
                product_id=product.id,
                quantity=quantity,
                unit_price=unit_price,
                line_total=line_total,
            )
        )

    order.total_amount = total
    db.commit()
    return _order_details(db.query(Order)).filter(Order.id == order.id).one()


@router.get("", response_model=list[OrderRead])
def list_orders(db: Session = Depends(get_db)):
    return _order_details(db.query(Order)).order_by(Order.id.desc()).all()


@router.get("/{order_id}", response_model=OrderRead)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = _order_details(db.query(Order)).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")
    return order


@router.delete("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = _order_details(db.query(Order)).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")

    for item in order.items:
        item.product.quantity_in_stock += item.quantity
    db.delete(order)
    db.commit()
