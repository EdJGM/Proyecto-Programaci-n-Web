import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Srceens/AuthContext';

function Header({ allProducts, setAllProducts, total, countProducts, setTotal, setCountProducts }) {

    const { usuario } = useContext(AuthContext);

    const navegate = useNavigate();

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [categorySearchResults, setCategorySearchResults] = useState([]);

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

    const handleSearchChange = async (event) => {
        setSearchText(event.target.value);

        if (event.target.value.trim() !== '') {
            try {
                const response = await fetch(`http://localhost:5000/api/productos/search/${event.target.value}`);

                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data);
                } else {
                    const errorMessage = await response.text();
                    console.error('Error al buscar productos:', errorMessage);
                }
            } catch (error) {
                console.error('Error al buscar productos:', error);
            }
        } else {
            setSearchResults([]);
            setCategorySearchResults([]); // Agrega esta línea
        }
    };

    const handleSearchClick = async () => {
        if (searchText.trim() !== '') {
            try {
                const categoryResponse = await fetch(`http://localhost:5000/api/categorias/${searchText}/productos`);

                if (categoryResponse.ok) {
                    const categoryData = await categoryResponse.json();

                    setCategorySearchResults(categoryData);
                    if (categoryData.length === 0) {
                        alert('No se encontraron productos en la categoria');
                    }
                } else {
                    const errorMessage = await categoryResponse.text();
                    console.error('Error al buscar categoria:', errorMessage);
                }
            } catch (error) {
                console.error('Error al buscar categoria:', error);
            }
        } else {
            setCategorySearchResults([]);
        }
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
                    <li><Link to='/' id="special-offers" style={{ color: 'white' }}>Ofertas Especiales del Día</Link></li>
                    <li>
                        <div id="search-bar">
                            <input type="text" placeholder="Buscar productos" value={searchText} onChange={handleSearchChange} />
                            {searchResults.length > 0 && (
                                <div id="search-results" style={{ display: searchResults.length > 0 ? 'block' : 'none' }}>
                                    {searchResults.map(product => (
                                        <div key={product.idProducto}>
                                            <img src={`/Img/productos/${product.idProducto}/principal.png`} alt={product.nombreP} />
                                            <h3>{product.nombreP}</h3>
                                            {/* Aquí puedes agregar más detalles del producto como desees */}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <button id="search-icon" onClick={handleSearchClick}>&#128269;</button>
                            {categorySearchResults.length > 0 && (
                                <div id="category-search-results" style={{ display: categorySearchResults.length > 0 ? 'block' : 'none' }}>
                                    {categorySearchResults.map(product => (
                                        <div key={product.idProducto}>
                                            <div className='cat-select'>
                                                <img src={`/Img/productos/${product.idProducto}/principal.png`} alt={product.nombreP} />
                                                <h3>{product.nombreP}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                            <div className='botonesContainer'>
                                                <Link to='/confirmarcarro'><button className='btn-shop-all'>
                                                    Pagar
                                                </button></Link>
                                                <button className='btn-clear-all' onClick={onClearAll}>
                                                    Vaciar Carrito
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="cart-empty">El carrito esta vacío</p>
                                    )
                                }
                            </div>
                        </div>
                    </li>
                    <li id="login-register">
                        {usuario ? (
                            <div className="dropdown">
                                <Link to="/" className="dropbtn" style={{ color: 'white' }}>{usuario.username}</Link>
                                <div className="dropdown-content">
                                    <Link to="/logout">Cerrar Sesión</Link>
                                </div>
                            </div>
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