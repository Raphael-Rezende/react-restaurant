import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import styles from './OrderModal.module.css';
import CardFade from './CardFade';
import { CiCircleAlert } from "react-icons/ci";

// Validação de erros no Formulária
import { useForm } from "react-hook-form";

import ReCAPTCHA from "react-google-recaptcha";

import { CartContext } from '../context/CardContext';

Modal.setAppElement('#root');



const OrderModal = ({ isOpen }) => {

  const {
    setOpenModal,
    cartItems,
    total,
    clearCart,
    toggleSidebar,
    screenWidth
  } = useContext(CartContext);

  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();
  const [select, setSelect] = useState('dinheiro')



  const [captcha, setCaptcha] = useState("");
  const [openAlert, setOpenAlert] = useState(false);







  const onSubmit = (data) => {

    if (captcha) {

      setOpenAlert(false)

      let orders = []
      cartItems.map((item) => (
        orders.push(item.name + ' (' + item.quantity.toString() + ') ')
      ))
      // Formatação da mensagem para WhatsApp
      const message = `*Pedido para ${data.name}*\n\n` +
        `📑 *Pedidos:* ${orders}\n` +
        `📍 *Endereço:* ${data.address}, *Número:* ${data.number}\n` +
        `🔖 *Referência:* ${data.reference}\n` +
        `⏰ *Hora do Pedido:* ${new Date().toLocaleString()}\n` +
        `💰 *Valor Total:* R$ ${total}\n` +
        `💳 *Forma de Pagamento:* ${data.gender}` +
        (data.gender === 'dinheiro' ? `\n💵 *Troco para:* R$ ${data.change}` : '');

      // Abrir WhatsApp com a mensagem formatada
      const phoneNumber = "5537999865444"; // Substitua pelo número do restaurante
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      reset({
        name: "",
        address: "",
        number: "",
        reference: "",
        change: ""

      })
      clearCart();
      toggleSidebar(); // Fechar o sidebar após enviar o pedido
      setOpenModal(false);


    } else
      setOpenAlert(true)


  };
  const isEven = () => {
    if (parseInt(getValues("change")) < total) return false
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setOpenModal(false)}
      className={styles.modal}
      overlayClassName={styles.overlay}
      style={{ overlay: { zIndex: 9999 } }} // Configuração inline

    >

      <div className={styles.modalContent} translate='no'>
        <CardFade open={openAlert} type={'warning'}><CiCircleAlert size={25} color='rgba(182,150,65,0.84)' /><span style={{ marginLeft: '10px', color: 'rgba(182,150,65,0.84)', fontWeight: 'bold' }}>Por favor, Resolva o CAPTCHA</span></CardFade>
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputRow}>

            <div className={`${styles.formField} ${errors.name? styles.errorField : ''}`}>
              <label>Nome:</label>
              <input {...register("name", { required: true, maxLength: 50 })} aria-invalid={errors.name ? "true" : "false"} />
              {errors.name?.type === "required" && (
                <span className={styles.errorMessage}>⚠️ Este campo é obrigatório</span>
              )}
              {errors.name?.type === 'maxLength' && (
                <span className={styles.errorMessage}>Máximo 50 caracteres</span>
              )}
            </div>

            <div className={`${styles.formField} ${errors.address ? styles.errorField : ''}`}>
              <label>Endereço:</label>
              <input {...register("address", { required: true })}
                aria-invalid={errors.address ? "true" : "false"} />
              {errors.address?.type === "required" && (
                <span className={styles.errorMessage}>⚠️ Este campo é obrigatório</span>
              )}
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.formField}>
              <label>Número da Rua:</label>
              <input {...register("number", { maxLength: 10 })} />
              {errors.number?.type === 'maxLength' && (
                <span className={styles.errorMessage}>Máximo 10 caracteres</span>
              )}
            </div>
            <div className={styles.formField}>
              <label>Referência:</label>
              <input {...register("reference")} />
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

              <select {...register("gender")} onChange={e => setSelect(e.target.value)}>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao">Cartão</option>
                <option value="pix">Pix</option>
              </select>
            </div>
            {select === 'dinheiro' && (
              <div className={`${styles.formField} ${errors.change ? styles.errorField : ''}`}>
                <label>Troco para:</label>
                <input type="number" placeholder="Informe o valor"
                  {...register("change", {
                    required: true,
                    validate: isEven
                  })} aria-invalid={errors.change ? "true" : "false"} />
                {errors.change?.type === 'required' && (
                  <span className={styles.errorMessage}>⚠️ Este campo é obrigatório</span>
                )}
                {errors.change?.type === 'validate' && (
                  <span className={styles.errorMessage}>⚠️ Valor deve ser maior que o total</span>
                )}
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <button type="submit" className={styles.button}>Confirmar Pedido</button>

            <ReCAPTCHA
              sitekey={"6LcopXsqAAAAAEO4laLVeegPhFH7t6kR9y0GYchx"}
              onChange={setCaptcha} size={screenWidth > 992 ? 'normal' : 'compact'} />

          </div>

        </form>
      </div>
    </Modal>
  );
};

export default OrderModal;
