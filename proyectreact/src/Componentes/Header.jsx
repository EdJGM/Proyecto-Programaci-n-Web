import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header({ allProducts, setAllProducts, total, countProducts, setTotal, setCountProducts }) {

    const [active, setActive] = useState(false);
    const [sticky, setSticky] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserFromDB = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/usuarios');

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData[0]);
                } else {
                    const errorMessage = await response.text();
                    console.error('Error al obtener usuarios:', errorMessage);
                }
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };
        fetchUserFromDB();//Llamando a la funcion
    }, []);

    function onDeleteProduct(product) {
        const results = allProducts.filter(
            item => item.idProducto !== product.idProducto
        );

        setTotal(total - product.precioP * product.quatify)
        setCountProducts(countProducts - product.quatify);
        setAllProducts(results);
    };

    function onClearAll() {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    };

    function handleButtonClick(url) {
        window.location.href = url;
    };

    useEffect(() => {
        const header = document.getElementById('myHeader');
        const sticky = header.offsetTop;

        const scrollCallBack = window.addEventListener('scroll', () => {
            if (window.pageYOffset > sticky) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        });

        return () => {
            window.removeEventListener('scroll', scrollCallBack);
        };
    }, []);


    return (
        <header id="myHeader" className={sticky ? 'sticky' : ''}>
            <nav>
                <ul>
                    <li><a href="#hot-deals-section" id="special-offers" style={{ color: 'white' }}>Ofertas Especiales del Día</a></li>
                    <li>
                        <div id="search-bar">
                            <input type="text" placeholder="Buscar productos" />
                            <button id="search-icon">&#128269;</button>
                        </div>
                    </li>
                    <li>
                        <div className="cart">
                            <div className="cart-icon" onClick={() => setActive(!active)}>
                                <a> &#128722;</a>
                            </div>
                            <div className="count-products">
                                <span id="contador-productos">{countProducts}</span>
                            </div>
                            <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
                                {
                                    allProducts.length ? (
                                        <>
                                            <div className="row-product">
                                                {allProducts.map(product => (
                                                    <div className="cart-product" key={product.id}>
                                                        <div className="info-cart-product">
                                                            <span className="cantidad-producto-carrito">
                                                                {product.quatify}
                                                            </span>
                                                            <p className="titulo-producto-carrito">
                                                                {product.nombreP}
                                                            </p>
                                                            <span className="precio-producto-carrito">
                                                                ${product.precioP}
                                                            </span>
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="icon-close" onClick={() => onDeleteProduct(product)}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="cart-total">
                                                <h3>Total:</h3>
                                                <span className="total-pagar">${total}</span>
                                            </div>
                                            <button className='btn-clear-all' onClick={onClearAll}>
                                                Vaciar Carrito
                                            </button>
                                        </>
                                    ) : (
                                        <p className="cart-empty">El carrito esta vacío</p>
                                    )
                                }
                            </div>
                        </div>
                    </li>
                    <li id="login-register">
                        {user ? (
                            <Link to="/login" style={{ color: 'white' }}>{user.username}</Link>

                        ) : (
                            <Link to="/login" style={{ color: 'white' }}>Login</Link>
                        )}
                    </li>
                    <li><button id="contact-button" onClick={() => handleButtonClick('/contacto')}>Contacto</button></li>
                </ul>
            </nav>
        </header >
    )
};

export default Header;