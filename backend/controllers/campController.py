from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from models.model import Campaign
from schemas.campSchema import CampaignBase

from database import get_db
from utils.utils import authenticate_user, create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm


def add_campaign(campaign: CampaignBase, db: Session):
    try:
        # campaign_exists = db.query(Campaign).filter(Campaign.id == campaign.id).first()
        # if campaign_exists:
        #     raise HTTPException(status_code=400, detail="活动已存在")
        new_campaign = Campaign(**campaign.dict())
        db.add(new_campaign)
        db.commit()
        db.refresh(new_campaign)
        return {
            "id": new_campaign.id,
            "title": new_campaign.title,
            "details": new_campaign.details,
            "owner_address": new_campaign.owner_address,
            "beneficiary_address": new_campaign.beneficiary_address,
            "created_at": new_campaign.created_at
        }
    except Exception as e:
        return {"error": str(e)}

def get_campaign(campaignId: int, db: Session):
    try:
        campaign = db.query(Campaign).filter(Campaign.id == campaignId).first()
        if not campaign:
            raise HTTPException(status_code=404, detail="活动不存在")
        return {
            "id": campaign.id,
            "title": campaign.title,
            "details": campaign.details,
            "owner_address": campaign.owner_address,
            "beneficiary_address": campaign.beneficiary_address,
            "created_at": campaign.created_at
        }
    except Exception as e:
        return {"error": str(e)}