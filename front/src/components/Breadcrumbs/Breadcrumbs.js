import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
    return (
        <div className="breadcrumbs">
            <div className="breadcrumbs-container">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        {item.path ? (
                            <Link to={item.path} className="breadcrumb-link">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="breadcrumb-current">{item.label}</span>
                        )}
                        {index < items.length - 1 && (
                            <span className="breadcrumb-separator">→</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Breadcrumbs;