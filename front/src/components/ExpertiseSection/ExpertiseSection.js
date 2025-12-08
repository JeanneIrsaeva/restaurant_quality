import React, { useState } from "react";
import "./ExpertiseSection.css";

const ExpertiseSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    contactPerson: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, city, contactPerson, phone, email } = formData;

    // Проверка на пустые поля
    if (!name || !city || !contactPerson || !phone || !email) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    // Проверка корректности Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Введите корректный Email");
      return;
    }

    // Здесь можно отправлять данные на сервер
    console.log("Данные заявки:", formData);
    alert("Заявка успешно отправлена");

    // Очистка формы
    setFormData({
      name: "",
      city: "",
      contactPerson: "",
      phone: "",
      email: "",
    });
  };

  return (
    <section className="expertise-section">
      <div className="expertise-container">
        <h2 className="expertise-title">Экспертиза для вашего заведения</h2>
        <p className="expertise-description">
          Мы проводим объективную оценку премиальных ресторанов, баров и
          гастрономических пространств. Получите профессиональное заключение и
          размещение в нашем каталоге.
        </p>

        <div className="expertise-form">
          <input
            type="text"
            name="name"
            placeholder="Название заведения"
            className="search-bar"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="Город"
            className="search-bar"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contactPerson"
            placeholder="Контактное лицо"
            className="search-bar"
            value={formData.contactPerson}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            className="search-bar"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Examplemail@mail.ru"
            className="search-bar"
            value={formData.email}
            onChange={handleChange}
          />
          <button className="promo-button" onClick={handleSubmit}>
            Подать заявку
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
