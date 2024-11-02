import React, { createContext, useState, useEffect } from 'react';

// Criação do contexto
export const CartContext = createContext();

// Provedor do contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Novo estado para controlar a visibilidade do sidebar

  // Para abrir o modal (State setado quando o clico no 'Enviar Pedidos')
  const [openModal, setOpenModal] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [auxCardItens, setAuxCardItens] = useState(false);

  // Pegando dimensões da tela, para controle do sidebar
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {

    if (cartItems.length != 0) {
      if (auxCardItens <= cartItems.length) {
        setOpenAlert(true)
        setTimeout(() => setOpenAlert(false), 5000)
      }
      setAuxCardItens(cartItems.length)
    }



    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Atualiza o screenWidth(state que guarda a largura da tela), e para melhor performance a função AddEventListener é cancelada devido a re-renderizações frequentes.
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, [cartItems], []);

  // Adicionar item ao carrinho
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    if (screenWidth < 992) {
      setIsSidebarOpen(false)
    } else {

      setIsSidebarOpen(true); // Abrir sidebar ao adicionar item
    }


  };

  // Remover item do carrinho
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== id)
    );
    if (cartItems.length === 1) {
      setIsSidebarOpen(false); // Fechar sidebar se último item for removido
    }
  };

  // Atualizar quantidade de um item
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      )
    );
  };

  // Limpar o carrinho
  const clearCart = () => {
    setCartItems([]);
    setIsSidebarOpen(false); // Fechar sidebar ao limpar o carrinho
  };

  // Toggle sidebar
  const toggleSidebar = () => {

    setIsSidebarOpen((prev) => !prev);

  };


  const controlToggleSidebar = () => {
    setIsSidebarOpen(false);
  }

   // Calcular o total
   const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isSidebarOpen, // Novo valor
        toggleSidebar, // Nova função
        controlToggleSidebar,
        openAlert,
        screenWidth,
        setOpenModal,
        openModal,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
