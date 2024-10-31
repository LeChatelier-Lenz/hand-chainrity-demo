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
    username = Column(String(100), nullable=False)
    image = Column(String(255), default='/images/airpods.jpg')
    email = Column(String(100), nullable=False, unique=True)
    phone = Column(String(11), nullable=True)
    password = Column(String(255), nullable=False)
    location = Column(String(100), default='火星')
    gender = Column(String(10), default='保密')
    role = Column(String(20), default='user')
    reset_password_token = Column(String(255), nullable=True)
    reset_password_expire = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # 关联 Campaign 表，一对多关系
    owned_campaigns = relationship("Campaign", back_populates="owner", foreign_keys="[Campaign.owner_address]", cascade="all, delete-orphan")
    beneficiary_campaigns = relationship("Campaign", back_populates="beneficiary", foreign_keys="[Campaign.beneficiary_address]", cascade="all, delete-orphan")
    applications = relationship("Application", back_populates="user",cascade="all, delete-orphan")
    def __init__(self, address, username, email, password ,phone='', name= '', image='', location='火星', gender='保密', role='user'):
        self.address = address
        self.username = username
        self.name = name
        self.email = email
        self.phone = phone
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
    details = Column(Text, nullable=False)
    owner_address = Column(String(42), ForeignKey('users.address'))  # 外键关联 User 表
    beneficiary_address = Column(String(42), ForeignKey('users.address'))
    created_at = Column(DateTime, default=datetime.utcnow)

    # 关联 User 表，多对一关系，指定 foreign_keys
    owner = relationship("User", back_populates="owned_campaigns", foreign_keys=[owner_address])
    beneficiary = relationship("User", back_populates="beneficiary_campaigns", foreign_keys=[beneficiary_address])

class Application(Base):
    __tablename__ = 'applications'

    id = Column(Integer, primary_key=True, autoincrement=True)
    address = Column(String(42), ForeignKey('users.address'))
    name = Column(String(24), nullable=False)
    idCard = Column(String(18), nullable=False)
    phone = Column(String(11), nullable=False)
    details = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)
    status = Column(String(10), default='pending')

    user = relationship("User", back_populates="applications")

    def __init__(self, address, name, idCard, phone, details, description=''):
        self.address = address
        self.name = name
        self.idCard = idCard
        self.phone = phone
        self.details = details
        self.description = description
        self.status = 'pending'
