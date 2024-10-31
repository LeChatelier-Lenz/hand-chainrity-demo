from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from models.model  import User
from schemas.userSchema import UserCreate, UserUpdate
from database import get_db
from utils.utils import authenticate_user, create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm
#from app.dependencies import get_current_user

# 登录用户并生成 token
def auth_user(db: Session, form_data: OAuth2PasswordRequestForm):
    try:
        user = authenticate_user(db, form_data.username, form_data.password)
        if not user:
            raise HTTPException(status_code=400, detail="邮箱或密码错误")
        token = create_access_token(data={"user_address": user.address})
        return {
            "address": user.address,
            "username": user.username,
            "email": user.email,
            "role": user.role,
            "image": user.image,
            "token": token
        }
    except Exception as e:
        return {"error": str(e)}

# 获取当前登录用户的个人资料
def get_user_profile(db: Session, current_user: User = Depends(get_current_user)):
    return {
        "address": current_user.address,
        "username": current_user.username,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role,
        "image": current_user.image,
    }

# 通过用户 ID 获取用户信息
def check_user_by_address(user_address: str, db: Session):
    user = db.query(User).filter(User.address == user_address).first()
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    return user.role

def get_user_by_address(user_address: str, db: Session):
    user = db.query(User).filter(User.address == user_address).first()
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    return {
            "name": user.name,
            "address": user.address,
            "email": user.email,
            "phone": user.phone,
            "role": user.role,
        }

def admin_get_user_by_address(user_address: str, db: Session,current_user: User = Depends(get_current_user)):
    try:
        admin = db.query(User).filter(User.address == current_user.address).first()
        if admin.role != 'admin':
            raise HTTPException(status_code=400, detail="权限不足")
        user = db.query(User).filter(User.address == user_address).first()
        if not user:
            raise HTTPException(status_code=404, detail="用户不存在")
        return user
    except Exception as e:
        return {"error": str(e)}

# 更新用户个人资料
def update_user_profile(user_update: UserUpdate, db: Session, current_user: User = Depends(get_current_user)):
    current_user.username = user_update.username or current_user.username
    current_user.email = user_update.email or current_user.email
    db.commit()
    db.refresh(current_user)
    return current_user

# 注册新用户
def register_user(user: UserCreate, db: Session):
    try:
        user_exists = db.query(User).filter(User.address == user.address).first()
        if user_exists:
            raise HTTPException(status_code=400, detail="用户已存在")
        new_user = User(**user.dict())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        token = create_access_token(data={"user_address": new_user.address})
        return {
            "username": new_user.username,
            "address": new_user.address,
            "email": new_user.email,
            "token": token,
            "role": "user",

        }
    except Exception as e:
        return {"error": str(e)}

# 关注用户
def follow_user(target_user_id: int, db: Session, current_user: User = Depends(get_current_user)):
    target_user = db.query(User).filter(User.id == target_user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="目标用户不存在")
    if target_user.id == current_user.id:
        raise HTTPException(status_code=403, detail="不能关注自己")
    if current_user.id not in target_user.followers:
        target_user.followers.append(current_user.id)
        current_user.followings.append(target_user.id)
        db.commit()
    return {"message": "关注成功"}

# 取消关注
def unfollow_user(target_user_id: int, db: Session, current_user: User = Depends(get_current_user)):
    target_user = db.query(User).filter(User.id == target_user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="目标用户不存在")
    if current_user.id in target_user.followers:
        target_user.followers.remove(current_user.id)
        current_user.followings.remove(target_user.id)
        db.commit()
    return {"message": "取消关注成功"}


def get_owned_campaigns(db: Session, current_user: User = Depends(get_current_user)):
    try:
        user = db.query(User).filter(User.address == current_user.address).first()
        if not user:
            raise HTTPException(status_code=404, detail="用户不存在")
        return user.owned_campaigns
    except Exception as e:
        return {"error": str(e)}


def get_beneficiary_campaigns(db: Session, current_user: User = Depends(get_current_user)):
    try:
        user = db.query(User).filter(User.address == current_user.address).first()
        if not user:
            raise HTTPException(status_code=404, detail="用户不存在")
        return user.beneficiary_campaigns
    except Exception as e:
        return {"error": str(e)}