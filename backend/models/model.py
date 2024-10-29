from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import bcrypt
import secrets
from datetime import datetime, timedelta
from models import Base

# User Model
class User(Base):
    __tablename__ = 'users'

    address = Column(String(42), primary_key=True, default='0x0000000000000000000000000000000000000000')
    name = Column(String(100), nullable=False)
    image = Column(String(255), default='/images/airpods.jpg')
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    location = Column(String(100), default='火星')
    gender = Column(String(10), default='保密')
    role = Column(String(20), default='user')
    reset_password_token = Column(String(255), nullable=True)
    reset_password_expire = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # 关联 Campaign 表，一对多关系
    campaigns = relationship("Campaign", back_populates="owner", cascade="all, delete-orphan")

    def __init__(self, address, email, password , name= '', image='', location='火星', gender='保密', role='user'):
        self.address = address
        self.name = name
        self.email = email
        self.set_password(password)
        self.image = image
        self.location = location
        self.gender = gender
        self.role = role

    def set_password(self, password):
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

    def get_reset_password_token(self):
        reset_token = secrets.token_hex(20)
        self.reset_password_token = bcrypt.hashpw(reset_token.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        self.reset_password_expire = datetime.utcnow() + timedelta(minutes=10)
        return reset_token


# Campaign Model
class Campaign(Base):
    __tablename__ = 'campaigns'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    address = Column(String(42), ForeignKey('users.address'))  # 外键关联 User 表
    created_at = Column(DateTime, default=datetime.utcnow)

    # 关联 User 表，多对一关系
    owner = relationship("User", back_populates="campaigns")


