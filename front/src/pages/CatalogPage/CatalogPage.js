import React, { useState } from "react";
import { RESTAURANTS } from "./../../data/restaurants";
import { Filter } from "./../../components/Filter/Filter";
import { RestaurantCard } from "./../../components/Card/RestaurantCard";
import { Pagination } from "./../../components/Pagination/Pagination";
import "./../CatalogPage/CatalogPage.css";

const PAGE_SIZE = 4;

const filtersData = {
  Рейтинг: [5, 4, 3, 2, 1],
  "Тип заведения": [
    "Ресторан",
    "Винный бар",
    "Авторские коктейльные",
    "Другое",
  ],
  Страна: Array.from(new Set(RESTAURANTS.map((r) => r.country))),
  Тэги: [],
  Кухня: [
    "Французская",
    "Японская",
    "Итальянская",
    "Авторская",
    "Азиатская",
    "Русская",
  ],
  Атмосфера: ["Деловая", "Романтическая", "Камерная", "Классическая"],
  Особенности: ["Вид на город", "Веганское меню", "Парковка"],
};

const CatalogPage = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const applyFilters = (items) => {
    return items.filter((r) => {
      if (
        filters["Рейтинг"] &&
        filters["Рейтинг"].size &&
        !filters["Рейтинг"].has(r.stars)
      )
        return false;

      if (
        filters["Страна"] &&
        filters["Страна"].size &&
        !filters["Страна"].has(r.country)
      )
        return false;

      if (
        filters["Кухня"] &&
        filters["Кухня"].size &&
        !r.cuisine.some((c) => filters["Кухня"].has(c))
      )
        return false;

      if (
        filters["Атмосфера"] &&
        filters["Атмосфера"].size &&
        !r.atmosphere.some((a) => filters["Атмосфера"].has(a))
      )
        return false;

      if (
        filters["Особенности"] &&
        filters["Особенности"].size &&
        !r.features.some((f) => filters["Особенности"].has(f))
      )
        return false;

      return true;
    });
  };

  const filteredItems = applyFilters(RESTAURANTS);
  const totalPages = Math.ceil(filteredItems.length / PAGE_SIZE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="layout-catalog">
      <Filter filters={filtersData} onChange={setFilters} />
      <main className="content-catalog">
        {paginatedItems.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
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
