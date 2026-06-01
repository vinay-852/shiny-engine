from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status

from app.db.session import get_stockpilot_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductRead, ProductUpdate


router = APIRouter(prefix="/products", tags=["products"])


@router.post("", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
def stockpilot_create_product(payload: ProductCreate, db: Session = Depends(get_stockpilot_db)):
    product = Product(**payload.model_dump())
    db.add(product)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Product SKU must be unique.") from exc
    db.refresh(product)
    return product


@router.get("", response_model=list[ProductRead])
def stockpilot_list_products(db: Session = Depends(get_stockpilot_db)):
    return db.query(Product).order_by(Product.id.desc()).all()


@router.get("/{product_id}", response_model=ProductRead)
def stockpilot_get_product(product_id: int, db: Session = Depends(get_stockpilot_db)):
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    return product


@router.put("/{product_id}", response_model=ProductRead)
def stockpilot_update_product(product_id: int, payload: ProductUpdate, db: Session = Depends(get_stockpilot_db)):
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(product, field, value)

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Product SKU must be unique.") from exc
    db.refresh(product)
    return product


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def stockpilot_delete_product(product_id: int, db: Session = Depends(get_stockpilot_db)):
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    db.delete(product)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Product is used by an order and cannot be deleted.") from exc
