from pydantic import BaseModel
from typing import List, Optional

# Pydantic model for Review
class ReviewBase(BaseModel):
    rating: float
    comment: Optional[str] = None

class Review(ReviewBase):
    id: int
    user_id: int
    product_id: int
    name: Optional[str] = None

    class Config:
        orm_mode = True

# Pydantic model for Product
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    category: str

class Product(ProductBase):
    id: int
    rating: Optional[float] = None
    numReviews: Optional[int] = None
    image: Optional[str] = None
    reviews: List[Review] = []  # 添加 reviews 数组

    class Config:
        orm_mode = True
