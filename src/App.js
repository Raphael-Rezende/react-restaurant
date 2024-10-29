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
//import CartSideBar from './components/CartSideBar';
import SideBar from './components/SideBar';
import { CartContext } from './context/CardContext';
import { CSSTransition } from 'react-transition-group';
import { NavbarToggle } from 'react-bootstrap';
import CardFade from './components/CardFade';

function App() {
  const { cartItems, isSidebarOpen, toggleSidebar, controlToggleSidebar, openAlert, screenWidth} = useContext(CartContext);



  // State e função para abrir e fecha o side bar do APP 
  const [isNav, setIsNav] = useState(false);
  const toggleSidebarMenu = () => {
    if (isSidebarOpen && cartItems.length > 0) {
      controlToggleSidebar()
    }
    setIsNav(!isNav);

  };


  // Função de ciclo do componente, nesse caso, ele atualiza toda vez que o carrinho estiver cheio 
  useEffect(() => {
    if (isSidebarOpen && cartItems.length > 0) {
      setIsNav(false);

    }
  }, [isSidebarOpen && cartItems.length]);


  // Escondendo o Sidebar (Menu), quando a largura da tela for maior que 992 (mesma configuração na estilização CSS)
  if (isNav && screenWidth > 992) {
    setIsNav(false)
  }
  console.log('isNAV', isNav, 'SideOpen',isSidebarOpen)
  // Calcular o total de itens no carrinho
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="App">
      <Navbar expand="lg" className='navbar'>
        <Container style={{ flexWrap: 'nowrap' }}>
          <Navbar.Brand>
            <Link to="/" className='navbar-brand text-success fw-semibold'>
              Pizzas Delivery
            </Link>
          </Navbar.Brand>
          <Container className="container-toggle">
            <div className="order-icon d-lg-none me-3">
              <PiNotepadLight size={24} onClick={toggleSidebar} />
              <span className="badge">{cartItems.length}</span>
            </div>
            <Navbar.Collapse id="basic-navbar-nav" className='navbar-collapse'>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Início</Nav.Link>
                <Nav.Link as={Link} to="/menu">Cardápio</Nav.Link>
                <Nav.Link as={Link} to="/about">Sobre Nós</Nav.Link>
                <Nav.Link href="https://instagram.com" target="_blank">
                  Siga-nos no Instagram <FaInstagram />
                </Nav.Link>
                <Nav.Link href="https://wa.me/5531999999999" target="_blank">
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

      <CardFade open={openAlert}><CiCircleAlert size={25} color='#198754' /><span style={{marginLeft: '10px', color: '#198754', fontWeight:'bold'}}>Item Adicionado no carrinho</span></CardFade>

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
