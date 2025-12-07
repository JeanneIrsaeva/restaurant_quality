from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from .database import get_db, Base, engine 
from .models import Establishment, EstablishmentType, Category, Country, Tag, EstablishmentApplication
from .schemas import (  
    EstablishmentResponse, EstablishmentListResponse, CatalogFilterParams,
    FilterOptionsResponse, EstablishmentTypeResponse, CategoryResponse,
    CountryResponse, TagResponse, OperationResponse, ApplicationCreate
)
from .crud import EstablishmentCRUD, ReferenceDataCRUD  

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Establishments Catalog API",
    description="API для каталога заведений с фильтрацией",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Establishments Catalog API"}

@app.get("/establishments", response_model=EstablishmentListResponse)
async def get_establishments(
    name: Optional[str] = Query(None, description="Фильтр по названию"),
    establishment_type_id: Optional[str] = Query(None, description="Фильтр по типу заведения"),
    category_id: Optional[str] = Query(None, description="Фильтр по категории"),
    country_id: Optional[str] = Query(None, description="Фильтр по стране"),
    city: Optional[str] = Query(None, description="Фильтр по городу"),
    tag_ids: Optional[List[str]] = Query(None, description="Фильтр по тегам"),
    min_rating: Optional[float] = Query(None, ge=0, le=5, description="Минимальный рейтинг"),
    max_rating: Optional[float] = Query(None, ge=0, le=5, description="Максимальный рейтинг"),
    sort_by: str = Query("rating", description="Поле для сортировки"),
    sort_order: str = Query("desc", description="Порядок сортировки (asc/desc)"),
    page: int = Query(1, ge=1, description="Номер страницы"),
    page_size: int = Query(10, ge=1, le=100, description="Размер страницы"),
    db: Session = Depends(get_db)
):
    filter_params = CatalogFilterParams(
        name=name,
        establishment_type_id=establishment_type_id,
        category_id=category_id,
        country_id=country_id,
        city=city,
        tag_ids=tag_ids,
        min_rating=min_rating,
        max_rating=max_rating,
        sort_by=sort_by,
        sort_order=sort_order,
        page=page,
        page_size=page_size
    )
    
    result = EstablishmentCRUD.get_establishments(db, filter_params)
    return EstablishmentListResponse(
        establishments=result["establishments"],
        total=result["total"],
        page=result["page"],
        pages=result["pages"]
    )

@app.get("/establishments/search", response_model=EstablishmentListResponse)
async def search_establishments(
    q: str = Query(..., min_length=2, description="Поисковый запрос (минимум 2 символа)"),
    limit: int = Query(10, ge=1, le=50, description="Лимит результатов (1-50)"),
    db: Session = Depends(get_db)
):
    if len(q.strip()) < 2:
        raise HTTPException(
            status_code=400, 
            detail="Поисковый запрос должен содержать минимум 2 символа"
        )
    
    query = db.query(Establishment).filter(
        Establishment.is_published == True,
        Establishment.name.ilike(f"%{q}%") 
    ).order_by(Establishment.rating.desc()).limit(limit)
    
    establishments = query.all()
    
    return EstablishmentListResponse(
        establishments=establishments,
        total=len(establishments),
        page=1,
        pages=1
    )

@app.get("/establishments/{establishment_id}", response_model=EstablishmentResponse)
async def get_establishment(establishment_id: str, db: Session = Depends(get_db)):
    establishment = EstablishmentCRUD.get_establishment_by_id(db, establishment_id)
    if not establishment:
        raise HTTPException(status_code=404, detail="Establishment not found")
    return establishment

@app.get("/filters/options", response_model=FilterOptionsResponse)
async def get_filter_options(db: Session = Depends(get_db)):
    options = EstablishmentCRUD.get_filter_options(db)
    return FilterOptionsResponse(
        establishment_types=options["establishment_types"],
        categories=options["categories"],
        countries=options["countries"],
        tags=options["tags"]
    )

@app.get("/establishment-types", response_model=List[EstablishmentTypeResponse])
async def get_establishment_types(db: Session = Depends(get_db)):
    return ReferenceDataCRUD.get_establishment_types(db)

@app.get("/categories", response_model=List[CategoryResponse])
async def get_categories(db: Session = Depends(get_db)):
    return ReferenceDataCRUD.get_categories(db)

@app.get("/countries", response_model=List[CountryResponse])
async def get_countries(db: Session = Depends(get_db)):
    return ReferenceDataCRUD.get_countries(db)

@app.get("/tags", response_model=List[TagResponse])
async def get_tags(db: Session = Depends(get_db)):
    return ReferenceDataCRUD.get_tags(db)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}



@app.post("/applications")
async def create_application(
    application: ApplicationCreate,
    db: Session = Depends(get_db)
):
    try:
        db_application = EstablishmentApplication(**application.dict())
        db.add(db_application)
        db.commit()
        
        return {
            "success": True,
            "message": "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail="Ошибка при отправке заявки. Пожалуйста, попробуйте позже."
        )
    
@app.get("/establishments/by-ids", response_model=List[EstablishmentResponse])
async def get_establishments_by_ids(
    ids: str = Query(..., description="Список ID через запятую"),
    db: Session = Depends(get_db)
):
   
    if not ids:
        return []
    
    id_list = [id.strip() for id in ids.split(',') if id.strip()]
    
    if not id_list:
        return []
    
    if len(id_list) > 100:
        raise HTTPException(
            status_code=400,
            detail="Максимально 100 ID за один запрос"
        )
    
    establishments = db.query(Establishment)\
        .filter(Establishment.id.in_(id_list))\
        .filter(Establishment.is_published == True)\
        .all()
    
    establishment_dict = {e.id: e for e in establishments}
    ordered_establishments = [
        establishment_dict[id] for id in id_list 
        if id in establishment_dict
    ]
    
    return ordered_establishments

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)