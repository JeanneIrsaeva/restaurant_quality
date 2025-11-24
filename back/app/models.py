from sqlalchemy import Column, String, Boolean, Text, Float, DateTime, ForeignKey, Table, UniqueConstraint
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from database import Base

# Таблица для связи многие-ко-многим между заведениями и тегами
establishment_tag = Table(
    'establishment_tag',
    Base.metadata,
    Column('establishment_id', String, ForeignKey('establishments.id')),
    Column('tag_id', String, ForeignKey('tags.id'))
)

class User(Base):
    __tablename__ = "user"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False)
    role = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    phone = Column(String)
    
    establishments = relationship("Establishment", back_populates="owner")
    favorites = relationship("Favorite", back_populates="user")

class Country(Base):
    __tablename__ = "country"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, nullable=False)
    is_active = Column(Boolean, default=True)
    
    establishments = relationship("Establishment", back_populates="country")

class Category(Base):
    __tablename__ = "category"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, nullable=False)
    is_active = Column(Boolean, default=True)
    
    establishments = relationship("Establishment", back_populates="category")

class Tag(Base):
    __tablename__ = "tag"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, nullable=False)
    is_active = Column(Boolean, default=True)
    
    establishments = relationship("Establishment", secondary=establishment_tag, back_populates="tags")

class Establishment(Base):
    __tablename__ = "establishment"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    description = Column(Text)
    contact_phone = Column(String)
    contact_email = Column(String)
    address = Column(String)
    city = Column(String)
    open_hours = Column(String)
    link_to = Column(String)
    rating = Column(Float, default=0.0)
    is_published = Column(Boolean, default=False)
    
    owner_id = Column(String, ForeignKey("users.id"), nullable=False)
    category_id = Column(String, ForeignKey("categories.id"), nullable=False)
    country_id = Column(String, ForeignKey("countries.id"), nullable=False)
    
    # Для хранения списка изображений (JSON строка)
    images = Column(Text)
    
    owner = relationship("User", back_populates="establishments")
    category = relationship("Category", back_populates="establishments")
    country = relationship("Country", back_populates="establishments")
    tags = relationship("Tag", secondary=establishment_tag, back_populates="establishments")
    favorites = relationship("Favorite", back_populates="establishment")

class Favorite(Base):
    __tablename__ = "favorite"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    establishment_id = Column(String, ForeignKey("establishments.id"), nullable=False)
    
    user = relationship("User", back_populates="favorites")
    establishment = relationship("Establishment", back_populates="favorites")
    __table_args__ = (UniqueConstraint('user_id', 'establishment_id', name='unique_user_establishment'),)