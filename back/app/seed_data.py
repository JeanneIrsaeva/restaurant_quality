from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from .models import Base, EstablishmentType, Category, Country, Tag, Establishment

def create_test_data():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    try:
        # Очищаем существующие данные
        db.query(Establishment).delete()
        db.query(EstablishmentType).delete()
        db.query(Category).delete()
        db.query(Country).delete()
        db.query(Tag).delete()
        db.commit()
        
        # Создаем типы заведений
        types = [
            EstablishmentType(name="Ресторан"),
            EstablishmentType(name="Винный бар"), 
            EstablishmentType(name="Авторские коктейльные"),
            EstablishmentType(name="Кафе"),
            EstablishmentType(name="Паб")
        ]
        
        # Создаем категории
        categories = [
            Category(name="Французская кухня"),
            Category(name="Итальянская кухня"),
            Category(name="Японская кухня"),
            Category(name="Авторская кухня"),
            Category(name="Русская кухня")
        ]
        
        # Создаем страны
        countries = [
            Country(name="Россия"),
            Country(name="Франция"),
            Country(name="Италия"), 
            Country(name="Япония"),
            Country(name="Испания")
        ]
        
        # Создаем теги
        tags = [
            Tag(name="Романтическая атмосфера"),
            Tag(name="Вид на город"),
            Tag(name="Живая музыка"),
            Tag(name="Веранда"),
            Tag(name="Премиум"),
            Tag(name="Семейный"),
            Tag(name="Бизнес-ланч"),
            Tag(name="Веганское меню")
        ]
        
        # Добавляем все в базу
        db.add_all(types)
        db.add_all(categories)
        db.add_all(countries)
        db.add_all(tags)
        db.commit()
        
        print("✅ Справочные данные созданы!")
        
        # Получаем созданные объекты с ID
        restaurant_type = db.query(EstablishmentType).filter_by(name="Ресторан").first()
        wine_bar_type = db.query(EstablishmentType).filter_by(name="Винный бар").first()
        
        french_category = db.query(Category).filter_by(name="Французская кухня").first()
        italian_category = db.query(Category).filter_by(name="Итальянская кухня").first()
        japanese_category = db.query(Category).filter_by(name="Японская кухня").first()
        
        russia_country = db.query(Country).filter_by(name="Россия").first()
        france_country = db.query(Country).filter_by(name="Франция").first()
        
        romantic_tag = db.query(Tag).filter_by(name="Романтическая атмосфера").first()
        city_view_tag = db.query(Tag).filter_by(name="Вид на город").first()
        premium_tag = db.query(Tag).filter_by(name="Премиум").first()
        family_tag = db.query(Tag).filter_by(name="Семейный").first()
        
        # Создаем тестовые заведения
        establishments = [
            Establishment(
                name="La Belle Étoile",
                description="Элегантный французский ресторан с панорамным видом на город",
                contact_phone="+7 (495) 123-45-67",
                contact_email="info@labelleetoile.ru",
                address="ул. Тверская, 15",
                city="Москва",
                open_hours="12:00-23:00",
                link_to="https://labelleetoile.ru",
                rating=4.8,
                is_published=True,
                images='["/images/restaurant1.jpg", "/images/restaurant2.jpg"]',
                establishment_type_id=restaurant_type.id,
                category_id=french_category.id,
                country_id=russia_country.id,
                tags=[romantic_tag, city_view_tag, premium_tag]
            ),
            Establishment(
                name="Golden Dragon",
                description="Аутентичный китайский ресторан с авторскими коктейлями",
                contact_phone="+7 (495) 234-56-78", 
                contact_email="reservations@goldendragon.ru",
                address="ул. Арбат, 25",
                city="Москва",
                open_hours="11:00-02:00",
                link_to="https://goldendragon.ru",
                rating=4.5,
                is_published=True,
                images='["/images/dragon1.jpg", "/images/dragon2.jpg"]',
                establishment_type_id=restaurant_type.id,
                category_id=japanese_category.id,
                country_id=russia_country.id,
                tags=[city_view_tag, family_tag]
            ),
            Establishment(
                name="Vinoteca",
                description="Уютный винный бар с европейской кухней",
                contact_phone="+7 (495) 345-67-89",
                contact_email="hello@vinoteca.ru", 
                address="ул. Пятницкая, 42",
                city="Москва",
                open_hours="14:00-00:00", 
                link_to="https://vinoteca.ru",
                rating=4.3,
                is_published=True,
                images='["/images/vinoteca1.jpg"]',
                establishment_type_id=wine_bar_type.id,
                category_id=italian_category.id,
                country_id=russia_country.id,
                tags=[romantic_tag]
            )
        ]
        
        db.add_all(establishments)
        db.commit()
        
        print("✅ Тестовые заведения созданы!")
        print(f"📊 Создано: {len(establishments)} заведений")
        
    except Exception as e:
        print(f"❌ Ошибка при создании тестовых данных: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_test_data()