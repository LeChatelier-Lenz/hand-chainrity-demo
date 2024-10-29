from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from models.model import Campaign
from schemas.campSchema import CampaignBase

from database import get_db
from utils.utils import authenticate_user, create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm


def add_campaign(campaign: CampaignBase, db: Session):
    campaign_exists = db.query(Campaign).filter(Campaign.id == campaign.id).first()
    if campaign_exists:
        raise HTTPException(status_code=400, detail="活动已存在")
    new_campaign = Campaign(**campaign.dict())
    db.add(new_campaign)
    db.commit()
    db.refresh(new_campaign)
    return {
        "id": new_campaign.id,
        "title": new_campaign.title,
        "description": new_campaign.description,
        "address": new_campaign.address,
        "created_at": new_campaign.created_at
    }
