import React, { useEffect, useRef } from 'react';
import './YandexMap.css';

const YandexMap = ({ address, center = [55.7649, 37.6190], zoom = 15 }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const loadYandexMap = () => {
            if (window.ymaps) {
                initMap();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU';
            script.onload = () => {
                window.ymaps.ready(initMap);
            };
            document.head.appendChild(script);
        };

        const initMap = () => {
            window.ymaps.ready(() => {
                const map = new window.ymaps.Map(mapRef.current, {
                    center: center,
                    zoom: zoom,
                    controls: ['zoomControl']
                });

                const placemark = new window.ymaps.Placemark(center, {
                    balloonContent: address
                }, {
                    preset: 'islands#icon',
                    iconColor: '#C0B193'
                });

                map.geoObjects.add(placemark);
            });
        };

        loadYandexMap();

        return () => {
            if (mapRef.current) {
                mapRef.current.innerHTML = '';
            }
        };
    }, [address, center, zoom]);

    return (
        <div className="yandex-map">
            <div ref={mapRef} className="map-container"></div>
        </div>
    );
};

export default YandexMap;