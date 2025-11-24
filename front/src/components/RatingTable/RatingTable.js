import React from 'react';
import './RatingTable.css';

const RatingTable = () => {
    const ratings = [
        { criteria: 'Доступность информации', stars: 5, score: '4,8' },
        { criteria: 'Качество коммуникации', stars: 5, score: '4,8' },
        { criteria: 'Встреча гостя', stars: 5, score: '4,8' },
        { criteria: 'Атмосфера и интерьер', stars: 5, score: '4,8' },
        { criteria: 'Скорость обслуживания', stars: 4, score: '4,8' },
        { criteria: 'Компетентность персонала', stars: 5, score: '4,8' },
        { criteria: 'Подача', stars: 5, score: '4,8' },
        { criteria: 'Финал обслуживания', stars: 5, score: '4,8' },
        { criteria: 'Цена/качество', stars: 5, score: '4,8' },
        { criteria: 'Чистота', stars: 5, score: '4,8' },
        { criteria: 'Целостность опыта', stars: 5, score: '4,8' }
    ];

    const renderStars = (count) => {
        return Array.from({ length: 5 }, (_, index) => (
            <img
                key={index}
                src="/assets/svg/star.svg"
                alt="звезда"
                className={`star ${index < count ? 'filled' : 'empty'}`}
            />
        ));
    };

    return (
        <div className="rating-table-section">
            <h2 className="section-title">Итоговая оценка</h2>
            <div className="rating-table">
                {ratings.map((item, index) => (
                    <div key={index} className="table-row">
                        <span className="criteria">{item.criteria}</span>
                        <div className="stars">
                            {renderStars(item.stars)}
                        </div>
                        <span className="score">{item.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingTable;