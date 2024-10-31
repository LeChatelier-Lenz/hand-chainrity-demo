from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime

# CampaignSchema 定义
class CampaignBase(BaseModel):
    id: int
    title: str = Field(..., max_length=100, description="活动标题")
    details: str = Field(..., description="活动描述")
    owner_address: str = Field(..., max_length=42, description="发起人地址（与用户地址关联）")
    beneficiary_address: str = Field(..., max_length=42, description="受益人地址（与用户地址关联）")
    created_at: Optional[datetime] = None  # 活动创建时间

    class Config:
        orm_mode = True  # 使得 Pydantic 可以与 SQLAlchemy 模型兼容

class Campaign(CampaignBase):
    class Config:
        orm_mode = True

