// src/components/InstagramContact.js
import React from 'react';
import './InstagramContact.css'; // Importar o CSS para estilização

const InstagramContact = () => {
  const instagramUrl = 'https://www.instagram.com/phael_rezende/#'; // Substitua pelo seu perfil do Instagram

  return (
    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="instagram-button">
      <i className="fab fa-instagram"></i>
      Siga-nos no Instagram
    </a>
  );
};

export default InstagramContact;