import React, { useState } from 'react';
import './Gallery.css';

const Gallery = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="gallery">
            <div className="gallery-main">
                <button className="nav-btn prev-btn" onClick={prevImage}>
                    <img src="/assets/svg/arrow.svg" alt="Предыдущее" className="nav-arrow" />
                </button>

                <div className="gallery-image">
                    <img
                        src={images[currentImageIndex]}
                        alt="Ресторан скоро добавит фото"
                        onError={(e) => {
                            e.target.src = '/assets/images/venue.jpg'; 
                            e.target.onerror = null;
                        }}
                    />
                </div>

                <button className="nav-btn next-btn" onClick={nextImage}>
                    <img src="/assets/svg/arrow2.svg" alt="Предыдущее" className="nav-arrow" />
                </button>
            </div>

            <div className="gallery-indicators">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Gallery;