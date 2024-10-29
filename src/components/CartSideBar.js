import React, { useContext } from 'react';
import { CartContext } from '../context/CardContext';
import styles from './CartSideBar.module.css';
import { FaTimes } from 'react-icons/fa'; // Ícone de fechar

const CartSidebar = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, toggleSidebar, onClick } = useContext(CartContext);

  // Calcular o total
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Formatar a mensagem para o WhatsApp
  const formatMessage = () => {

    let message = `*Novo Pedido de Pizza:*\n\n*Itens:*\n`;
    cartItems.forEach((item) => {
      message += `• ${item.name} (${item.size}) x${item.quantity} - R$ ${item.price.toFixed(2)} cada\n`;
    });
    message += `\n*Total:* R$ ${total.toFixed(2)}`;
    return message;
  };

  const handleSendOrder = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    const whatsappNumber = '5511999999999'; // Substitua pelo número da pizzaria
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formatMessage())}`;
    window.open(whatsappLink, '_blank');
    clearCart();
    toggleSidebar(); // Fechar o sidebar após enviar o pedido
  };

  return (



    <div>
      <h2 className={styles.title}>📝 Seu Carrinho</h2>

      {cartItems.length === 0 ? (
        <p className={styles.empty}>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <div>
                  <span className={styles.itemName}>{item.name} ({item.size})</span>
                  <span className={styles.itemPrice}>R$ {item.price.toFixed(2)}</span>
                </div>
                <div className={styles.itemControls}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className={styles.quantityInput}
                  />
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeButton}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.footer}>
            <span className={styles.total}>Total: R$ {total.toFixed(2)}</span>
            <button onClick={handleSendOrder} className={styles.sendButton}>
              Enviar Pedido 📩
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default CartSidebar;
