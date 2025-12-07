import React, { useEffect, useRef } from 'react';
import './YandexMap.css';

let yandexMapsScriptLoaded = false;

const YandexMap = ({ address, center = [55.7649, 37.6190], zoom = 15 }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        const loadYandexMap = () => {
            if (window.ymaps) {
                initMap();
                return;
            }

            if (yandexMapsScriptLoaded) {
                const checkYmaps = () => {
                    if (window.ymaps) {
                        initMap();
                    } else {
                        setTimeout(checkYmaps, 100);
                    }
                };
                checkYmaps();
                return;
            }

            yandexMapsScriptLoaded = true;
            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=dcef0736-c22b-400d-8f06-1443501ff583&lang=ru_RU';
            script.async = true;

            script.onload = () => {
                window.ymaps.ready(initMap);
            };

            document.head.appendChild(script);
        };

        const initMap = () => {
            if (!mapRef.current) return;

            if (mapInstance.current) {
                mapInstance.current.destroy();
                mapInstance.current = null;
            }

            window.ymaps.ready(() => {
                try {
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
                    mapInstance.current = map;
                } catch (error) {
                    console.error('Ошибка создания карты:', error);
                }
            });
        };

        loadYandexMap();

        return () => {
            if (mapInstance.current) {
                mapInstance.current.destroy();
                mapInstance.current = null;
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