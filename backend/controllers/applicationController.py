from datetime import datetime

from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from models.model import Campaign, User
from schemas.applicationSchema import  ApplicationCreate
from models.model import Application
from utils.utils import get_current_user


def add_application(application: ApplicationCreate, db: Session, current_user: User = Depends(get_current_user)):
    try:
        beneficiary = db.query(User).filter(User.address == current_user.address).first()
        if not beneficiary:
            raise HTTPException(status_code=400, detail="登陆信息错误，请重新登陆")
        if beneficiary.role == 'beneficiary':
            raise HTTPException(status_code=400, detail="受益人已存在")
        new_application = Application(
            **application.dict(),  # 解包字典
            address=current_user.address,
        )

        #new_application = Application(**application.dict())
        db.add(new_application)
        db.commit()
        db.refresh(new_application)

        return {
            "id": new_application.id,
        }
    except Exception as e:
        return {"error": str(e)}

def approve_application(application_id: int, db: Session, current_user: User = Depends(get_current_user)):
    try:
        application = db.query(Application).filter(Application.id == application_id).first()
        if not application:
            raise HTTPException(status_code=404, detail="申请不存在")
        if application.status == 'approved':
            raise HTTPException(status_code=400, detail="申请已批准")
        if current_user.role != 'admin':
            raise HTTPException(status_code=400, detail="权限不足")
        application.status = 'approved'
        application_user = db.query(User).filter(User.address == application.address).first()
        application_user.role = 'beneficiary'
        application_user.name = application.name
        application_user.phone = application.phone
        application_user.idCard = application.idCard
        db.commit()
        db.refresh(application)
        db.refresh(application_user)
        return application
    except Exception as e:
        return {"error": str(e)}


def list_application(page_num: int, db: Session, current_user: User = Depends(get_current_user)):
    try:
        if current_user.role != 'admin':
            raise HTTPException(status_code=400, detail="权限不足")

        query = db.query(Application).filter(Application.status == 'pending')

        if page_num == -1:
            applications = query.all()  # 返回所有符合条件的申请
        else:
            applications = query.limit(page_num * 10).all()  # 返回前 page_num * 10 条数据

        return applications
    except Exception as e:
        return {"error": str(e)}

