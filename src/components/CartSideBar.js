import React, { useContext } from 'react';
import { CartContext } from '../context/CardContext';
import styles from './CartSideBar.module.css';

const CartSidebar = () => {
  const { cartItems,
    removeFromCart,
    updateQuantity,
    setOpenModal,
    total
  } = useContext(CartContext);

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
            <button onClick={()=> {setOpenModal(true)}} className={styles.sendButton}>
              Enviar Pedido 📩
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default CartSidebar;
