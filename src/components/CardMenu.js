import React from 'react';
import './CardMenu.css';
import { BiSolidNotepad } from "react-icons/bi";



function CardMenu({ item, onClick, btnPedido = false }) {
    

    return (
        <div className="menu-container">
            <div className="menu-cards">
                <div className="menu-card" key={item.id}>
                    <img src={item.image} alt={item.name} className="menu-image" />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="menu-group">
                        <p className="menu-price">R${item.price}</p>
                        {
                            btnPedido ? 
                            <button
                            onClick={() => onClick()}
                            className="addButton"
                            >Add Pedido  
                                    <BiSolidNotepad  className="icon" style={{marginLeft:'5px'}} />
                            </button>
                            
                            :''
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardMenu;