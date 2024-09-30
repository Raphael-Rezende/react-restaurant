
import React, { useEffect, useState } from 'react';
import './Menu.css';
//import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import CardMenu from '../components/CardMenu';


function Menu() {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch('/data.json')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    if (!data) {
      return <div>Loading...</div>;
    }
    return (
        <div className='menu-page'>
            <header className='mt-5'>
                <div className='container h-100 d-flex align-items-center justify-content-center'>
                    <h1 className='text-light'>Menu</h1>
                </div>
            </header>

            <div className='breakfast my-5'>
                <div className='container'>
                    <h2 className='text-center fs-1 mb-4 mb-lg-5 text-uppercase fw-bold text-success'>Pizzas</h2>
                    <div className='row'>
                        <div className='d-sm-flex flex-row flex-wrap'>
                            {data.PizzasMenu.map(item => (
                                <CardMenu key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='lunch bg-dark  py-5'>
                <div className='container'>
                    <h2 className='text-center fs-1 mb-4 mb-lg-5 text-uppercase fw-bold text-success'>Promoções + Combos</h2>
                    <div className='row'>
                        <div className='d-flex flex-row flex-wrap'>
                            {data.PromoCombos.map(item => (
                                <CardMenu key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <div className='dinner my-5'>
                <div className='container'>
                    <h2 className='text-center fs-1 mb-4 mb-lg-5 text-uppercase fw-bold text-success'>Combos</h2>
                    <div className='row'>
                        <div className='d-flex flex-row flex-wrap'>
                            {data.PromoCombos.map(item => (
                                <CardMenu key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;