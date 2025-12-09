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

  const handleSubmit = async () => {
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

    // Проверка корректности телефона
    const phoneRegex =
      /^(\+7|8)?\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

    if (!phoneRegex.test(phone)) {
      alert("Введите корректный номер телефона");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          city,
          contact_person: contactPerson,
          contact_phone: phone,
          contact_email: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setFormData({
          name: "",
          city: "",
          contactPerson: "",
          phone: "",
          email: "",
        });
      } else {
        alert(data.detail || "Ошибка при отправке заявки");
      }
    } catch (error) {
      console.error("Ошибка при отправке заявки:", error);
      alert("Ошибка при отправке заявки. Попробуйте позже.");
    }
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
          <div className="expertise-button-wrapper ">
            <button className="promo-button" onClick={handleSubmit}>
              Подать заявку
            </button>
          </div>
          <p className="form-note">
            Нажимая кнопку «Подать заявку», вы соглашаетесь с политикой
            конфиденциальности и даете согласие на обработку персональных
            данных.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
