import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import WhatsAppContact from './components/WhatsAppContact';
import InstagramContact from './components/InstagramContact';

function App() {
  return (
    <div>
      <Navbar expand="lg" className='fixed-top bg-body-tertiary shadow'>
        <Container>
          <Navbar.Brand>
            <Link to="/" className='navbar-brand text-success fw-semibold'>
              Pizzas Delivery
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto justify-content-end w-100'>
              <Nav className=' d-flex flex-row justify-content-around bg-light'>

                <Nav style={{marginRight:0}}>
                  <Nav.Link href='/' className='active text-uppercase'>Início</Nav.Link>
                  <Nav.Link href='/menu' className='text-uppercase'>Cardápio</Nav.Link>
                  <Nav.Link href='/about' className='text-uppercase'>Sobre Nós</Nav.Link>
                </Nav>
                <Nav className='d-flex flex-row'>
                  <Nav style={{paddingInline:20}}>
                    <WhatsAppContact />
                  </Nav>
                  <Nav style={{paddingInline:20}}>
                    <InstagramContact />
                  </Nav>
                </Nav>
                {/*<Nav.Link href='/contact' className='text-uppercase'>Contato</Nav.Link>*/}
              </Nav>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>

      <footer className='bg-body-tertiary'>
        <p className='p-3 m-0 text-center'>copyright @ made by Sanbashi Systems</p>
      </footer>
    </div>
  );
}

export default App;
