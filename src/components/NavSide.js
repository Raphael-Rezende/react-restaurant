import React from 'react';
import styles from './NavSide.module.css';
import { FaInstagram, FaWhatsapp, FaCode } from 'react-icons/fa';

const NavSide = (isOpen, toggleSidebar) => {
  return (
    <div>
      {/* Backdrop para fechar o sidebar ao clicar fora */}

      <div className={styles.sidebar}>
        <ul className={styles.sidebarLinks}>
          <li><a href="/">Início</a></li>
          <li><a href="/menu">Cardápio</a></li>
          <li><a href="/about">Sobre Nós</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Siga-nos no Instagram <FaInstagram /></a></li>
          <li><a href="https://wa.me/5537999865444" target="_blank" rel="noopener noreferrer">Fale Conosco <FaWhatsapp /> </a></li>
        </ul>
        <div className={styles.logo}>
          
          <span className={styles.logoText}> <FaCode  className={styles.icone} size={40}/>Sanbashi Systems</span>
        </div>
      </div>
    </div>

  );
}

export default NavSide;
