from sqlalchemy import Column, String, Boolean, Text, Float, DateTime, ForeignKey, Table, Integer, CheckConstraint
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from .database import Base  

establishment_tag = Table(
    'establishment_tag',
    Base.metadata,
    Column('establishment_id', String, ForeignKey('establishments.id')),
    Column('tag_id', String, ForeignKey('tags.id'))
)

class EstablishmentType(Base):
    __tablename__ = "establishment_types"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, nullable=False)
    is_active = Column(Boolean, default=True)
    
    establishments = relationship("Establishment", back_populates="establishment_type")

class Country(Base):
    __tablename__ = "countries"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, nullable=False)
    is_active = Column(Boolean, default=True)
    
    establishments = relationship("Establishment", back_populates="country")

class Category(Base):
    __tablename__ = "categories"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, nullable=False)
    is_active = Column(Boolean, default=True)
    
    establishments = relationship("Establishment", back_populates="category")

class Tag(Base):
    __tablename__ = "tags"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, unique=True, nullable=False)
    is_active = Column(Boolean, default=True)

class Establishment(Base):
    __tablename__ = "establishments"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    description = Column(Text)
    contact_phone = Column(String)
    contact_email = Column(String)
    address = Column(String)
    city = Column(String)
    open_hours = Column(String)
    link_to = Column(String)
    rating = Column(Float, default=0.0)
    is_published = Column(Boolean, default=False)
    
    establishment_type_id = Column(String, ForeignKey("establishment_types.id"), nullable=False)
    category_id = Column(String, ForeignKey("categories.id"), nullable=False)
    country_id = Column(String, ForeignKey("countries.id"), nullable=False)
    
    images = Column(Text)  
    
    establishment_type = relationship("EstablishmentType", back_populates="establishments")
    category = relationship("Category", back_populates="establishments")
    country = relationship("Country", back_populates="establishments")
    tags = relationship("Tag", secondary=establishment_tag, backref="establishments")
    
    __table_args__ = (
        CheckConstraint('rating >= 0 AND rating <= 5', name='rating_range_check'),
    )