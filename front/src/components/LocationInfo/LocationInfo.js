import React from 'react';
import './LocationInfo.css';

const LocationInfo = ({ address, city, phone, hours, website }) => {
    const parseHours = (hoursString) => {
        if (!hoursString || !hoursString.includes('-')) {
            return {
                weekday: '12:00 – 23:00',
                weekend: '12:00 – 02:00'
            };
        }

        const [open, close] = hoursString.split('-');
        return {
            weekday: `${open} – ${close}`,
            weekend: `${open} – 02:00`
        };
    };

    const hoursData = parseHours(hours);

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
                                <p className="hours">{hoursData.weekday}</p>
                            </div>
                            <div className="time-row">
                                <p className="days">Пятница - Воскресенье</p>
                                <div className="time-separator"></div>
                                <p className="hours">{hoursData.weekend}</p>
                            </div>
                        </div>

                        <div className="contacts-block">
                            <div className="contact-item">
                                <img src="/assets/svg/map.svg" alt="Адрес" className="contact-icon" />
                                <div>
                                    <p className="address">{city || 'Москва'}</p>
                                    <p className="address">{address || 'ул. Петровка, 28'}</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <img src="/assets/svg/phone.svg" alt="Телефон" className="contact-icon" />
                                <p className="phone">{phone || '+7 (495) 694-09-30'}</p>
                            </div>
                        </div>
                    </div>

                    {website && website !== 'https://example.com' && (
                        <div className="website-block">
                            <a
                                href={website}
                                className="website"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {website}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationInfo;