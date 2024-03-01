import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../Componentes/Header';
import SecondaryNav from '../Componentes/SecondaryNav';
import Subscription from '../Componentes/Subscription';
import Footer from '../Componentes/Footer';
import '../styles/stylesPhone.css';

function Categoria() {
    const { categoriaId } = useParams();
    const [productos, setProductos] = useState([]);

    const categorias = ['celulares', 'accesorios', 'laptops', 'televisores', 'tablets', 'computadores'];

    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);

    // Traer los productos de la categoria seleccionada.
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/join/${categoriaId}`);

                if (response.ok) {
                    const productoData = await response.json();
                    setProductos(productoData);
                } else {
                    const errorMessage = await response.text();
                    console.error('Error al obtener productos:', errorMessage);
                }
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, [categoriaId]);

    return (
        <div>
            <body className='bodyCat'>
                <Header
                    allProducts={allProducts}
                    setAllProducts={setAllProducts}
                    total={total}
                    setTotal={setTotal}
                    countProducts={countProducts}
                    setCountProducts={setCountProducts}
                />
                <SecondaryNav />
                <section id="mapa">

                    <div className="categoria-celulares1"><Link to="/">&#x1F3DA; Home</Link></div>
                    <div className="categoria-celulares2"><p>|</p></div>
                    <div className="categoria-celulares3"><p>{categoriaId}</p></div>
                </section>
                <article>
                    <section id="product-categories-container">
                        <div id="product-categories">
                            <aside>
                                <div>
                                    {categorias.map((categoria) => (
                                        <div key={categoria}>
                                            <Link to={`/categoria/${categoria}`}>
                                                <span><h2>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2></span>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </aside>
                        </div>
                        <div id="best-sellers">
                            <ul>
                                <li>
                                    <img src={`/Img/imgCategoria/${categoriaId}/principal.png`} />
                                    <div className="texto">
                                        <h2>Variedad en Accesorios</h2>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>
                </article>
                <section className="hot-deals-section">
                    <div className="hot-deals">
                        <div className="hot-deals-products">
                            {productos.map(product => (
                                <div className="product-info" category={product.idCategoria} key={product.idProducto}>
                                    <img src={`/Img/productos/${product.idProducto}/principal.png`} />
                                    <div className="hot-deals-text">
                                        <h3>{product.nombreP}</h3>
                                        <p>{product.descripcionP}</p>
                                        <p>Precio: <span className="price">${product.precioP}</span></p>
                                        <button id="add-to-cart-button-1" className="add-to-cart-button" >Añadir al Carrito</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <Subscription />
                <Footer />
            </body>
        </div>
    );
};

export default Categoria;