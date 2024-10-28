from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Schema for creating a new message
class MessageCreate(BaseModel):
    conversation_id: str
    content: str
    sender_id: str
    timestamp: Optional[datetime] = datetime.now()  # 自动设置当前时间戳



# Schema for returning a message (response model)

class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    content: str
    sender_id: str
    timestamp: datetime



    class Config:
        orm_mode = True  # 允许从 ORM 模型读取数据
