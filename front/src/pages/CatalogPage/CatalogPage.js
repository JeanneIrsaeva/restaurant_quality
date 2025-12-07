import React, { useState, useEffect } from "react";
import { Filter } from "./../../components/Filter/Filter";
import { RestaurantCard } from "./../../components/Card/RestaurantCard";
import { Pagination } from "./../../components/Pagination/Pagination";
import "./../CatalogPage/CatalogPage.css";

const PAGE_SIZE = 4;

const filtersData = {
  Рейтинг: [5, 4, 3, 2, 1],
  "Тип заведения": [],
  Страна: [],
  Тэги: [],
  Кухня: [],
  Атмосфера: [],
  Особенности: [],
};

const CatalogPage = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState(filtersData);

  useEffect(() => {
    loadRestaurants();
    loadFilterOptions();
  }, []);

  const loadRestaurants = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/establishments');
      if (response.ok) {
        const data = await response.json();
        setRestaurants(data.establishments || []);
        console.log("✅ Рестораны загружены:", data.establishments?.length || 0);
      } else {
        console.error("❌ Ошибка загрузки:", response.status);
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки ресторанов:', error);
    }
    setLoading(false);
  };

  const loadFilterOptions = async () => {
    try {
      const response = await fetch('http://localhost:8000/filters/options');
      if (response.ok) {
        const data = await response.json();

        setFilterOptions({
          Рейтинг: [5, 4, 3, 2, 1],
          "Тип заведения": data.establishment_types?.map(t => t.name) || [],
          Страна: data.countries?.map(c => c.name) || [],
          Тэги: data.tags?.map(t => t.name) || [],
          Кухня: data.categories?.map(c => c.name) || [],
          Атмосфера: [],
          Особенности: [],
        });
        console.log("✅ Фильтры загружены");
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки фильтров:', error);
    }
  };


  const getSafeImage = (images) => {
    if (!images) return '/assets/images/venue.jpg';

    try {
      let imageUrl = '';

      if (Array.isArray(images)) {
        imageUrl = images[0] || '/assets/images/venue.jpg';
      } else if (typeof images === 'string') {
        try {
          const parsed = JSON.parse(images);
          if (Array.isArray(parsed)) {
            imageUrl = parsed[0] || '/assets/images/venue.jpg';
          } else {
            imageUrl = parsed || '/assets/images/venue.jpg';
          }
        } catch (parseError) {
          imageUrl = images;
        }
      }


      if (imageUrl && imageUrl !== '/assets/images/venue.jpg') {

        imageUrl = imageUrl.replace(/\/assets\/+/g, '/assets/');

        if (imageUrl.startsWith('/images/')) {
          imageUrl = '/assets' + imageUrl;
        } else if (!imageUrl.startsWith('/assets/') && !imageUrl.startsWith('http')) {
          if (!imageUrl.startsWith('/')) {
            imageUrl = '/assets/images/' + imageUrl;
          } else {
            imageUrl = '/assets' + imageUrl;
          }
        }

        if (imageUrl.includes('/assets/assets/')) {
          imageUrl = imageUrl.replace('/assets/assets/', '/assets/');
        }
      }

      return imageUrl || '/assets/images/venue.jpg';
    } catch {
      return '/assets/images/venue.jpg';
    }
  };

  const applyFilters = (items) => {
    return items.filter((r) => {
      if (
        filters["Рейтинг"] &&
        filters["Рейтинг"].size &&
        !filters["Рейтинг"].has(Math.floor(r.rating))
      )
        return false;

      if (
        filters["Страна"] &&
        filters["Страна"].size &&
        !filters["Страна"].has(r.country?.name || r.country)
      )
        return false;

      return true;
    });
  };

  const filteredItems = applyFilters(restaurants);
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  if (loading) {
    return <div className="loading">Загрузка ресторанов...</div>;
  }

  return (
    <div className="layout-catalog">
      <Filter filters={filterOptions} onChange={setFilters} />
      <main className="content-catalog">
        {paginatedItems.map((r) => (
          <RestaurantCard
            key={r.id}
            restaurant={{
              id: r.id,
              name: r.name || 'Без названия',
              country: r.country?.name || r.country || 'Не указано',
              city: r.city || 'Не указано',
              image: getSafeImage(r.images)
            }}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default CatalogPage;