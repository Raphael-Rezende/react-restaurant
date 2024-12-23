import { useContext, useState, useEffect } from 'react';

import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';

import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { PiNotepadLight } from "react-icons/pi";
import { CiCircleAlert } from "react-icons/ci";


// Side bar do pedidos 
import SideBar from './components/SideBar';
// Modal de formulario para enviar pedido do cliente
import OrderModal from './components/OrderModal';
import { CartContext } from './context/CardContext';
import { CSSTransition } from 'react-transition-group';
import { NavbarToggle } from 'react-bootstrap';
import CardFade from './components/CardFade';

function App() {
  const { cartItems,
    isSidebarOpen,
    toggleSidebar,
    controlToggleSidebar,
    openAlert,
    screenWidth, 
    openModal } = useContext(CartContext);



  // State e função para abrir e fecha o side bar do APP 
  const [isNav, setIsNav] = useState(false);
  const toggleSidebarMenu = () => {
    if (isSidebarOpen && cartItems.length > 0) {
      controlToggleSidebar()
    }
    setIsNav(!isNav);

  };


  // Função de ciclo do componente, nesse caso, ele atualiza toda vez que o carrinho estiver cheio 
  // eslint-disable-next-line
  useEffect(() => {
    if (isSidebarOpen) {
      setIsNav(false);

    }else if(isNav){
      toggleSidebar()
    }
    // eslint-disable-next-line
  }, [isSidebarOpen && cartItems.length]);


  // Escondendo o Sidebar (Menu), quando a largura da tela for maior que 992 (mesma configuração na estilização CSS)
  if (isNav && screenWidth > 992) {
    setIsNav(false)
  }

  return (
    <div className="App" translate='no'>
      <OrderModal isOpen={openModal} />
      <Navbar expand="lg" className='navbar'>
        <Container style={{ flexWrap: 'nowrap' }}>
          <Navbar.Brand>
            <Link to="/" className='navbar-brand text-success fw-semibold'>
              Pizzas Delivery
            </Link>
          </Navbar.Brand>
          <Container className="container-toggle">
            <div className="order-icon d-lg-none me-3">
              <PiNotepadLight size={24} onClick={() => toggleSidebar()} />
              <span className="badge">{cartItems.length}</span>
            </div>
            <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Início</Nav.Link>
                <Nav.Link as={Link} to="/menu">Cardápio</Nav.Link>
                <Nav.Link as={Link} onClick={toggleSidebar}>Seus Pedidos</Nav.Link>
                <Nav.Link as={Link} to="/about">Sobre Nós</Nav.Link>
                <Nav.Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Siga-nos no Instagram <FaInstagram />
                </Nav.Link>
                <Nav.Link href="https://wa.me/5537999865444" target="_blank" rel="noopener noreferrer">
                  Fale Conosco <FaWhatsapp />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>

            <NavbarToggle className='btn-Menu' onClick={toggleSidebarMenu} />
          </Container>
        </Container>
      </Navbar>


      {/* Renderizar o Sidebar somente quando houver itens no carrinho */}
      <CSSTransition
        in={isNav || isSidebarOpen}
        timeout={300}
        classNames="sidebar"
        unmountOnExit
      >
        <SideBar
          onClick={isSidebarOpen ? toggleSidebar : toggleSidebarMenu}
          isNavProps={isNav}
          isOrderProps={isSidebarOpen}
          cartItemsProps={cartItems.length} />


      </CSSTransition>

      <CardFade open={openAlert} type={'sucess'}><CiCircleAlert size={25} color='#198754' /><span style={{ marginLeft: '10px', color: '#198754', fontWeight: 'bold' }}>Item Adicionado no carrinho</span></CardFade>

      <main className={`content ${isNav || isSidebarOpen ? 'withSidebar' : ''}`}>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>
      <footer className='bg-body-tertiary'>
        <p className='p-3 m-0 text-center'>made by Sanbashi Systems</p>
      </footer>
    </div>
  );
}

export default App;
