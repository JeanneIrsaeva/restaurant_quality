import React from 'react';
import './LocationInfo.css';

const LocationInfo = () => {
    return (
        <div className="location-section">
            <div className="location-container">
                <div className="location-info">
                    <h2 className="section-title">Место и время</h2>

                    <div className="info-blocks-row">
                        <div className="time-block">
                            <div className="time-row">
                                <p className="days">Понедельник - Четверг</p>
                                <div className="time-separator"></div>
                                <p className="hours">10:00 – 23:00</p>
                            </div>
                            <div className="time-row">
                                <p className="days">Пятница - Воскресенье</p>
                                <div className="time-separator"></div>
                                <p className="hours">10:00 – 02:00</p>
                            </div>
                        </div>

                        <div className="contacts-block">
                            <div className="contact-item">
                                <img src="/assets/svg/map.svg" alt="Адрес" className="contact-icon" />
                                <div>
                                    <p className="address">Россия, Москва</p>
                                    <p className="address">ул. Петровка, 28</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <img src="/assets/svg/phone.svg" alt="Телефон" className="contact-icon" />
                                <p className="phone">+7 (495) 694-09-30</p>
                            </div>
                        </div>

                    </div>

                    <div className="website-block">
                        <a href="https://claude-monet.ru/" className="website">https://claude-monet.ru/</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LocationInfo;