import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../Componentes/Header';
import SecondaryNav from '../Componentes/SecondaryNav';
import Subscription from '../Componentes/Subscription';
import Footer from '../Componentes/Footer';
import '../styles/stylesPhone.css';

function Categoria({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) {
    const { categoriaId } = useParams();
    const [productos, setProductos] = useState([]);

    const categorias = ['celulares', 'accesorios', 'laptops', 'televisores', 'tablets', 'computadores'];

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

    function onAllProduct(product) {
        let newProducts;
        let newTotal = total + product.precioP;
        let newCount = countProducts + 1;

        if (allProducts.find(item => item.idProducto === product.idProducto)) {
            newProducts = allProducts.map(item =>
                item.idProducto == product.idProducto
                    ? { ...item, quatify: item.quatify + 1 }
                    : item
            );
        } else {
            product.quatify = 1;
            newProducts = [...allProducts, product];
        }

        setTotal(newTotal);
        setCountProducts(newCount);
        setAllProducts(newProducts);

        // Almacena el estado en el almacenamiento local
        localStorage.setItem('allProducts', JSON.stringify(newProducts));
        localStorage.setItem('total', JSON.stringify(newTotal));
        localStorage.setItem('countProducts', JSON.stringify(newCount));
    }

    useEffect(() => {
        const savedTotal = localStorage.getItem('total');
        const savedCount = localStorage.getItem('countProducts');
        const savedProducts = localStorage.getItem('allProducts');

        if (savedTotal) {
            setTotal(JSON.parse(savedTotal));
        }

        if (savedCount) {
            setCountProducts(JSON.parse(savedCount));
        }

        if (savedProducts) {
            setAllProducts(JSON.parse(savedProducts));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('total', JSON.stringify(total));
        localStorage.setItem('countProducts', JSON.stringify(countProducts));
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
    }, [total, countProducts, allProducts]);


    return (
        <div className='bodyCat'>
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
                                    <h2>LOS MEJORES EN EL MERCADO</h2>
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
                                    <button id="add-to-cart-button-1" className="add-to-cart-button" onClick={() => onAllProduct(product)}>Añadir al Carrito</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Subscription />
            <Footer />
        </div>
    );
};

export default Categoria;