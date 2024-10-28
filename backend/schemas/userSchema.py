from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List

class UserBase(BaseModel):
    name: str = Field(..., max_length=100)
    image: Optional[str] = Field(default='/images/airpods.jpg')
    email: EmailStr
    location: Optional[str] = Field(default='火星')
    gender: Optional[str] = Field(default='保密')
    biography: Optional[str] = Field(default='我的个性签名')
    role: Optional[str] = Field(default='user')

class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

class UserUpdate(UserBase):
    password: Optional[str] = Field(None, min_length=6)

class User(UserBase):
    id: int
    followers: List[str] = Field(default_factory=list)
    followings: List[str] = Field(default_factory=list)
    reset_password_token: Optional[str]
    reset_password_expire: Optional[str]
    created_at: str
    updated_at: str

    class Config:
        orm_mode = True
