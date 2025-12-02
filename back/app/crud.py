from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func
from typing import List, Optional
import math

from .models import Establishment, EstablishmentType, Category, Country, Tag
from .schemas import CatalogFilterParams

class EstablishmentCRUD:
    @staticmethod
    def get_establishments(db: Session, filters: CatalogFilterParams):
        query = db.query(Establishment).filter(Establishment.is_published == True)
        
        if filters.name:
            query = query.filter(Establishment.name.ilike(f"%{filters.name}%"))
        
        if filters.establishment_type_id:
            query = query.filter(Establishment.establishment_type_id == filters.establishment_type_id)
        
        if filters.category_id:
            query = query.filter(Establishment.category_id == filters.category_id)
        
        if filters.country_id:
            query = query.filter(Establishment.country_id == filters.country_id)
        
        if filters.city:
            query = query.filter(Establishment.city.ilike(f"%{filters.city}%"))
        
        if filters.min_rating is not None:
            query = query.filter(Establishment.rating >= filters.min_rating)
        
        if filters.max_rating is not None:
            query = query.filter(Establishment.rating <= filters.max_rating)
        
        if filters.tag_ids:
            for tag_id in filters.tag_ids:
                query = query.filter(Establishment.tags.any(Tag.id == tag_id))
        
        sort_column = getattr(Establishment, filters.sort_by, Establishment.rating)
        if filters.sort_order == "desc":
            query = query.order_by(sort_column.desc())
        else:
            query = query.order_by(sort_column.asc())
        
        total = query.count()
        pages = math.ceil(total / filters.page_size) if total > 0 else 1
        
        establishments = query.offset((filters.page - 1) * filters.page_size).limit(filters.page_size).all()
        
        return {
            "establishments": establishments,
            "total": total,
            "page": filters.page,
            "pages": pages
        }
    
    @staticmethod
    def get_establishment_by_id(db: Session, establishment_id: str):
        return db.query(Establishment).filter(
            Establishment.id == establishment_id,
            Establishment.is_published == True
        ).first()
    
    @staticmethod
    def get_filter_options(db: Session):
        establishment_types = db.query(EstablishmentType).filter(EstablishmentType.is_active == True).all()
        categories = db.query(Category).filter(Category.is_active == True).all()
        countries = db.query(Country).filter(Country.is_active == True).all()
        tags = db.query(Tag).filter(Tag.is_active == True).all()
        
        return {
            "establishment_types": establishment_types,
            "categories": categories,
            "countries": countries,
            "tags": tags
        }

class ReferenceDataCRUD:
    @staticmethod
    def get_establishment_types(db: Session):
        return db.query(EstablishmentType).filter(EstablishmentType.is_active == True).all()
    
    @staticmethod
    def get_categories(db: Session):
        return db.query(Category).filter(Category.is_active == True).all()
    
    @staticmethod
    def get_countries(db: Session):
        return db.query(Country).filter(Country.is_active == True).all()
    
    @staticmethod
    def get_tags(db: Session):
        return db.query(Tag).filter(Tag.is_active == True).all()