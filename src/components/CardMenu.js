import React from 'react';
import './CardMenu.css';

function CardMenu({ item }) {
    return (
        <div className="menu-container">
            <div className="menu-cards">
                <div className="menu-card" key={item.id}>
                    <img src={item.image} alt={item.name} className="menu-image" />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p className="menu-price">{item.price}</p>
                </div>
            </div>
        </div>
    );
}

export default CardMenu;