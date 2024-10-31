from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers import applicationController
from models.model import User
from schemas.applicationSchema import ApplicationCreate
from schemas.campSchema import CampaignBase
from database import get_db
from fastapi.security import OAuth2PasswordRequestForm
from utils.utils import get_current_user

router = APIRouter()

@router.post("/api/application")
def add_application(application: ApplicationCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return applicationController.add_application(application, db, current_user)


@router.get("/api/application/approve/{application_id}")
def add_application(application_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return applicationController.approve_application(application_id, db, current_user)

@router.get("/api/application/reject/{application_id}")
def add_application(application_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return applicationController.reject_application(application_id, db, current_user)


@router.get("/api/application/list/{page_num}")
def add_application(page_num:int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return applicationController.list_application(page_num, db, current_user)