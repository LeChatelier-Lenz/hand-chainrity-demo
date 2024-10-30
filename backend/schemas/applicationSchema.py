from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class ApplicationBase(BaseModel):

    name: str = Field(..., max_length=100, description="真实姓名")
    idCard: str = Field(..., max_length=18, description="身份证号")
    phone: str = Field(..., max_length=11, description="手机号")
    description: str = Field(..., description="申请描述")


    class Config:
        orm_mode = True

class Application(ApplicationBase):
    id: int
    address: str
    details: str
    status: str
    createdAt: str
    class Config:
        orm_mode = True

class ApplicationCreate(ApplicationBase):
    details: str = Field(..., description="申请详情")