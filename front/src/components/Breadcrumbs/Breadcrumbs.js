import React from 'react';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
    return (
        <div className="breadcrumbs">
            <div className="breadcrumbs-container">
                <a href="/catalog" className="breadcrumb-link">Каталог</a>
                <span className="breadcrumb-separator">→</span>
                <span className="breadcrumb-current">Ресторан Claude Monet</span>
            </div>
        </div>
    );
};

export default Breadcrumbs;