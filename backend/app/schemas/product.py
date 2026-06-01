from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


class ProductBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    sku: str = Field(..., min_length=1, max_length=64)
    price: Decimal = Field(..., ge=0, decimal_places=2)
    quantity_in_stock: int = Field(..., ge=0)


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=120)
    sku: str | None = Field(None, min_length=1, max_length=64)
    price: Decimal | None = Field(None, ge=0, decimal_places=2)
    quantity_in_stock: int | None = Field(None, ge=0)


class ProductRead(ProductBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
