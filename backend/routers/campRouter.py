from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers import campController
from schemas.campSchema import CampaignBase
from database import get_db
from fastapi.security import OAuth2PasswordRequestForm
from utils.utils import get_current_user

router = APIRouter()

# 添加新活动
@router.post("/api/campaign")
def add_campaign(campaign: CampaignBase, db: Session = Depends(get_db)):
    return campController.add_campaign(campaign, db)