from pydantic import BaseModel, EmailStr
from typing import List, Optional, Union
from datetime import datetime
from enum import Enum

class EstablishmentTypeBase(BaseModel):
    id: str
    name: str
    is_active: bool = True

class EstablishmentTypeResponse(EstablishmentTypeBase):
    class Config:
        from_attributes = True

class CountryBase(BaseModel):
    id: str
    name: str
    is_active: bool = True

class CountryResponse(CountryBase):
    class Config:
        from_attributes = True

class CategoryBase(BaseModel):
    id: str
    name: str
    is_active: bool = True

class CategoryResponse(CategoryBase):
    class Config:
        from_attributes = True

class TagBase(BaseModel):
    id: str
    name: str
    is_active: bool = True

class TagResponse(TagBase):
    class Config:
        from_attributes = True

class EstablishmentBase(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    contact_phone: Optional[str] = None
    contact_email: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    open_hours: Optional[str] = None
    link_to: Optional[str] = None
    rating: float = 0.0
    is_published: bool = True
    images: Optional[str] = None

class EstablishmentResponse(EstablishmentBase):
    establishment_type: EstablishmentTypeResponse
    category: CategoryResponse
    country: CountryResponse
    tags: List[TagResponse] = []
    
    class Config:
        from_attributes = True

class EstablishmentListResponse(BaseModel):
    establishments: List[EstablishmentResponse]
    total: int
    page: int
    pages: int

class CatalogFilterParams(BaseModel):
    name: Optional[str] = None
    establishment_type_id: Optional[str] = None
    category_id: Optional[str] = None
    country_id: Optional[str] = None
    tag_ids: Optional[List[str]] = None
    min_rating: Optional[float] = None
    max_rating: Optional[float] = None
    city: Optional[str] = None
    sort_by: Optional[str] = "rating"
    sort_order: Optional[str] = "desc"
    page: int = 1
    page_size: int = 10

class FilterOptionsResponse(BaseModel):
    establishment_types: List[EstablishmentTypeResponse]
    categories: List[CategoryResponse]
    countries: List[CountryResponse]
    tags: List[TagResponse]

class OperationResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None