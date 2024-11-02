
import React from 'react';


import styles from './SideBar.module.css';
import { FaTimes } from 'react-icons/fa'; // Ícone de fechar

import CartSidebar from './CartSideBar';
import NavSide from './NavSide';
import { CSSTransition } from 'react-transition-group';


const SideBar = ({ onClick, isOrderProps, cartItemsProps, isNavProps }) => {
  return (
    <div>

      {/* Backdrop para fechar o sidebar ao clicar fora */}
      {/* Botão de fechar */}
      
      {(isOrderProps) ?
        
        <div>

          <div className={styles.backdrop} onClick={onClick}></div>
          <div className={styles.cartSidebar}>
            <button className={styles.closeButton} onClick={onClick}>
              <FaTimes size={20} />
            </button>  
            <CSSTransition
            in={isOrderProps}
            timeout={300}
            classNames="sidebar"
            unmountOnExit
            >
              <CartSidebar onClick={onClick} />
              </CSSTransition>
          </div>
        </div> : null}

          {isNavProps ?
            <div>

              <div className={styles.backdrop} onClick={onClick}></div>
              <div className={styles.sidebar}>
                <button className={styles.closeButton} onClick={onClick}>
                  <FaTimes size={20} />
                </button>  
                <CSSTransition
                in={isNavProps}
                timeout={300}
                classNames="sidebar"
                unmountOnExit
                >

                  <NavSide onClick={onClick} />
                </CSSTransition>
              </div>
            </div> : null
          }

        
      
    </div>
  );
}

export default SideBar;
