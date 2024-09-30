// src/components/WhatsAppContact.js
import React from 'react';
import './WhatsAppContact.css'; // Importar o arquivo CSS para estilização

const WhatsAppContact = () => {
  const phoneNumber = '5537999865444'; // Substitua pelo número desejado
  const message = 'Olá, Venho através do site e gostaria de realizar meu pedido'; // Mensagem pré-definida
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
      <i className="fab fa-whatsapp"></i>
      Faça Seu Pedido
    </a>
  );
};

export default WhatsAppContact;