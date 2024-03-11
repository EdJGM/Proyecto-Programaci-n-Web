import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styleServicios.css';
import Header from '../Componentes/Header';
import SecondaryNav from '../Componentes/SecondaryNav';
import Subscription from '../Componentes/Subscription';
import Footer from '../Componentes/Footer';
import Info from '../Componentes/Info';


const Servicios = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {


    const contador1 = useRef();
    const contador2 = useRef();
    const contador3 = useRef();
    const contador4 = useRef();

    const iniciarContador = (contadorRef, max) => {
        let cantidad = 0;
        const intervalo = setInterval(() => {
            if (contadorRef.current) {
                contadorRef.current.textContent = cantidad += 1;
                if (cantidad === max) {
                    clearInterval(intervalo);
                }
            }
        }, 20);
    };

    useEffect(() => {
        iniciarContador(contador1, 350);
        iniciarContador(contador2, 100);
        iniciarContador(contador3, 230);
        iniciarContador(contador4, 320);
    }, []);

    return (
        <div>
            <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
            />
            <SecondaryNav />
            <section id="mapaC">
                <div className="categoria-celulares1C"><a href="/">Home</a></div>
                <div className="categoria-celulares2C"><p>|</p></div>
                <div className="categoria-celulares3C"><p>Servicios</p></div>
            </section>
            <section id="product-categories-container">
                <div id="product-categories">
                    <aside>
                        <div>
                            <Link to="/categoria/celulares"><span><h2>Celulares</h2></span></Link>
                        </div>
                        <div>
                            <Link to="/categoria/accesorios"><span><h2>Accesorios</h2></span></Link>
                        </div>
                        <div>
                            <Link to="/categoria/laptops"><span><h2>Laptops</h2></span></Link>
                        </div>
                        <div>
                            <Link to="/categoria/televisores"><span><h2>Televisores</h2></span></Link>
                        </div>
                        <div>
                            <Link to="/categoria/tablets"><span><h2>Tablets</h2></span></Link>
                        </div>
                        <div>
                            <Link to="/categoria/computadores"><span><h2>Computadores</h2></span></Link>
                        </div>
                    </aside>
                </div>
                <div className="Servicios">
                    <h1 className='tituloS'>Servicios</h1>
                    <div className='gridS'>
                        <div className='textoS'>
                            <h2>Obten los mejores servicios</h2>
                            <p>En nuestra tienda encontrarás los mejores servicios para tus dispositivos, no te preocupes por nada, nosotros nos encargamos de todo.</p>
                        </div>
                        <img src="./Img/s1.jpg" />
                        <img src="./img/s2.jpg" />
                        <img src="./Img/s3.jpg" />
                    </div>
                    <div className='flexS'>
                        <img src="./Img/s4.jpg" />
                        <div className='textoSe'>
                            <p>Los mejores celulares</p>
                            <p>Las mejores laptops</p>
                            <p>Los mejores televisores</p>
                            <p>Las mejores tablets</p>
                            <p>Los mejores computadores</p>
                            <Link to='/'><button className='add-to-cart-button'>Ver mas...</button></Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className='cuerpoContador'>
                <div className='Contador'>
                    <div className="itemC">
                        <span className='fa fa-users'></span>
                        <span className='cantidadC' id='cont1' ref={contador1}>0</span>
                        <span className='seg'>Seguidores</span>
                    </div>
                    <div className="itemC">
                        <span className='fa fa-money'></span>
                        <span className='cantidadC' id='cont2' ref={contador2}>0</span>
                        <span className='aho'>Ahorros</span>
                    </div>
                    <div className="itemC">
                        <span className='fa fa-handshake-o'></span>
                        <span className='cantidadC' id='cont3' ref={contador3}>0</span>
                        <span className='apo'>Apoyo</span>
                    </div>
                    <div className="itemC">
                        <span className='fa fa-star'></span>
                        <span className='cantidadC' id='cont4' ref={contador4}>0</span>
                        <span className='pop'>Popularidad</span>
                    </div>
                </div>
            </section>
            <Info />
            <Subscription />
            <Footer />
        </div>
    );
};

export default Servicios;