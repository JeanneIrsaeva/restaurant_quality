from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    VISITOR = "VISITOR"
    CUSTOMER = "CUSTOMER"
    OWNER = "OWNER"

class EstablishmentBase(BaseModel):
    id: str
    name: str
    type: str
    description: Optional[str] = None
    contact_phone: Optional[str] = None
    contact_email: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    open_hours: Optional[str] = None
    link_to: Optional[str] = None
    rating: float = 0.0
    is_published: bool = True

class CategoryBase(BaseModel):
    id: str
    name: str
    is_active: bool = True

class TagBase(BaseModel):
    id: str
    name: str
    is_active: bool = True

class CatalogFilterParams(BaseModel):
    name: Optional[str] = None           
    category_id: Optional[str] = None    
    tag_ids: Optional[List[str]] = None  
    min_rating: Optional[float] = None   
    max_rating: Optional[float] = None   
    city: Optional[str] = None
    sort_by: Optional[str] = "rating"    
    sort_order: Optional[str] = "desc"   

class EstablishmentResponse(EstablishmentBase):
    category: CategoryBase
    tags: List[TagBase] = []
    
    class Config:
        from_attributes = True

class EstablishmentListResponse(BaseModel):
    establishments: List[EstablishmentResponse]
    total: int

class CategoryResponse(CategoryBase):
    class Config:
        from_attributes = True

class TagResponse(TagBase):
    class Config:
        from_attributes = True

class FavoriteBase(BaseModel):
    id: str
    created_at: datetime

class FavoriteResponse(FavoriteBase):
    establishment: EstablishmentResponse
    
    class Config:
        from_attributes = True

class FavoriteListResponse(BaseModel):
    favorites: List[FavoriteResponse]
    total: int

class EstablishmentApplicationCreate(BaseModel):
    name: str
    type: str
    description: Optional[str] = None
    contact_phone: str
    contact_email: EmailStr
    address: str
    city: str
    open_hours: Optional[str] = None
    link_to: Optional[str] = None
    
    owner_name: str
    owner_email: EmailStr
    owner_phone: str
    
    category_id: str
    tag_ids: List[str] = []

class EstablishmentApplicationResponse(BaseModel):
    id: str
    status: str
    created_at: datetime
    establishment_data: EstablishmentApplicationCreate
    
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    id: str
    email: EmailStr
    role: UserRole
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: UserRole
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None

class UserResponse(UserBase):
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class OperationResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None