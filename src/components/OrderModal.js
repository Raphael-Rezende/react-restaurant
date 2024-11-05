import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import styles from './OrderModal.module.css';

import { CartContext } from '../context/CardContext';

Modal.setAppElement('#root');



const OrderModal = ({ isOpen }) => {

  const {
    setOpenModal,
    cartItems,
    total,
    clearCart,
    toggleSidebar
  } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [changeValue, setChangeValue] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const [errorAdress, setErrorAdress] = useState(false);
  const [errorChangeValue, setErrorChangeValue] = useState(false);
  const [errorPaymentMethod, setErrorPaymentMethod] = useState(false);




  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setErrorPaymentMethod(false)
  };

  const handleChangeValue = (event) => {
    setChangeValue(event.target.value);
    setErrorChangeValue(false)
  };
  const handleName = (event) => {
    setName(event.target.value);
    setIsFormValid(false)
  };
  const handleNumber = (event) => {
    setNumber(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
    setErrorAdress(false)
  };
  const handleReference = (event) => {
    setReference(event.target.value);
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();

    let orders = []
    cartItems.map((item) => (
      orders.push(item.name + ' (' + item.quantity.toString() + ') ')
    ))

    // Verifica se todos os campos obrigatórios estão preenchidos
    const isValid = name && address &&
      paymentMethod && (paymentMethod !== 'dinheiro' || changeValue);

    if (name === '') setIsFormValid(true)
    if (address === '') setErrorAdress(true)
    if (changeValue === '') setErrorChangeValue(true)
    if (paymentMethod !== 'dinheiro') setErrorPaymentMethod(true)


    if (isValid) {

      // Formatação da mensagem para WhatsApp
      const message = `*Pedido para ${name}*\n\n` +
        `📑 *Pedidos:* ${orders}\n` +
        `📍 *Endereço:* ${address}, *Número:* ${number}\n` +
        `🔖 *Referência:* ${reference}\n` +
        `⏰ *Hora do Pedido:* ${new Date().toLocaleString()}\n` +
        `💰 *Valor Total:* R$ ${total}\n` +
        `💳 *Forma de Pagamento:* ${paymentMethod}` +
        (paymentMethod === 'dinheiro' ? `\n💵 *Troco para:* R$ ${changeValue}` : '');

      // Abrir WhatsApp com a mensagem formatada
      const phoneNumber = "5537999865444"; // Substitua pelo número do restaurante
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      clearCart();
      toggleSidebar(); // Fechar o sidebar após enviar o pedido
      setName('')
      setAddress('')
      setChangeValue('')
      setNumber('')
      setReference('')
      setPaymentMethod('')
      setOpenModal(false);
    }


  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpenModal(false)}
      className={styles.modal}
      overlayClassName={styles.overlay}
      style={{ overlay: { zIndex: 1000 } }} // Configuração inline

    >
      <div className={styles.modalContent} translate='no'>

        {/* Botão de Fechar */}
        <button onClick={() => setOpenModal(false)} className={styles.closeButton}>
          &times;
        </button>
        <h2 className={styles.title}>Informe seus Dados</h2>
        <div className={styles.warningMessage}>
          ⚠️ Você será redirecionado para a tela do WhatsApp. Por favor, verifique se o mesmo está funcionando.
        </div>
        {/* Exibir tags dos itens */}
        <div style={{ flex: 'display', flexDirection: 'row' }}>
          <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>Seus Pedidos: </span>
          <div className={styles.itemTagsContainer}>
            {
              cartItems.map((item) => (
                <div key={item.id} className={styles.itemTag}>
                  {item.name + ' (' + item.quantity + ')'}
                </div>
              ))}

          </div>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className={styles.inputRow}>

            <div className={`${styles.formField} ${isFormValid ? styles.errorField : ''}`}>
              <label>Nome:</label>
              <input type="text" value={name} onChange={handleName} />
              {isFormValid && (
                <span className={styles.errorMessage}>⚠️ Este campo é obrigatório</span>
              )}
            </div>

            <div className={`${styles.formField} ${errorAdress ? styles.errorField : ''}`}>
              <label>Endereço:</label>
              <input type="text" value={address} onChange={handleAddress} />
              {errorAdress && (
                <span className={styles.errorMessage}>⚠️ Este campo é obrigatório</span>
              )}
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.formField}>
              <label>Número da Rua:</label>
              <input type="text" value={number} onChange={handleNumber} />
            </div>
            <div className={styles.formField}>
              <label>Referência:</label>
              <input type="text" value={reference} onChange={handleReference} />
            </div>
          </div>


          <div className={styles.inputRow}>
            <div className={styles.formField}>
              <label>Hora:</label>
              <input type="text" value={new Date().toLocaleString()} readOnly />
            </div>
            <div className={styles.formField}>
              <label>Valor Total:</label>
              <input type="text" value={`R$ ${total.toFixed(2)}`} readOnly />
            </div>
          </div>
          <div className={styles.inputRow}>


            <div className={styles.paymentOption}>
              <label>Forma de Pagamento:</label>
              <label>
                <input type="radio" value="dinheiro" checked={paymentMethod === 'dinheiro'} onChange={handlePaymentChange} />
                Dinheiro
              </label>
              <label>
                <input type="radio" value="cartão" checked={paymentMethod === 'cartão'} onChange={handlePaymentChange} />
                Cartão
              </label>
              <label>
                <input type="radio" value="pix" checked={paymentMethod === 'pix'} onChange={handlePaymentChange} />
                Pix
              </label>
              {errorPaymentMethod && (
                <span className={styles.errorMessage}>⚠️ Este campo é obrigatório</span>
              )}
            </div>
            {paymentMethod === 'dinheiro' && (
              <div className={`${styles.formField} ${errorChangeValue ? styles.errorField : ''}`}>
                <label>Troco para:</label>
                <input type="number" placeholder="Informe o valor" value={changeValue} onChange={handleChangeValue} />
                {errorChangeValue && (
                  <span className={styles.errorMessage}>⚠️ Este campo é obrigatório</span>
                )}
              </div>
            )}
          </div>
          <button type="submit" className={styles.button}>Confirmar Pedido</button>
        </form>
      </div>
    </Modal>
  );
};

export default OrderModal;
