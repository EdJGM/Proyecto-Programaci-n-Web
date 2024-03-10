import React, { useEffect, useState } from "react";

function ProductList({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const localProducts = localStorage.getItem('allProducts');
        const localCount = localStorage.getItem('countProducts');
        const localTotal = localStorage.getItem('total');

        if (localProducts) {
            setAllProducts(JSON.parse(localProducts));
        }

        if (localCount) {
            setCountProducts(JSON.parse(localCount));
        }

        if (localTotal) {
            setTotal(JSON.parse(localTotal));
        }
    }, []);

    // Agrega un efecto para actualizar el Local Storage cuando cambien los productos, el conteo o el total
    useEffect(() => {
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
        localStorage.setItem('countProducts', JSON.stringify(countProducts));
        localStorage.setItem('total', JSON.stringify(total));
    }, [allProducts, countProducts, total]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');

                if (response.ok) {
                    const productoData = await response.json();

                    let productosFiltrados = [];
                    let i = 0;

                    while (productosFiltrados.length < 8 && i < productoData.length) {
                        if (productoData[i].idCategoria === 2 && productosFiltrados.filter(product => product.idCategoria === 2).length < 2) {
                            productosFiltrados.push(productoData[i]);
                        } else if (productoData[i].idCategoria === 3 && productosFiltrados.filter(product => product.idCategoria === 3).length < 2) {
                            productosFiltrados.push(productoData[i]);
                        } else if (productoData[i].idCategoria === 4 && productosFiltrados.filter(product => product.idCategoria === 4).length < 2) {
                            productosFiltrados.push(productoData[i]);
                        } else if (productoData[i].idCategoria === 1 && productosFiltrados.filter(product => product.idCategoria === 1).length < 2) {
                            productosFiltrados.push(productoData[i]);
                        }
                        i++;
                    }

                    setProductos(productosFiltrados);
                } else {
                    const errorMessage = await response.text();
                    console.error('Error al obtener productos:', errorMessage);
                }
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();

    }, []);

    function onAllProduct(product) {
        if (allProducts.find(item => item.idProducto === product.idProducto)) {
            const products = allProducts.map(item =>
                item.idProducto == product.idProducto
                    ? { ...item, quatify: item.quatify + 1 }
                    : item
            );

            setTotal(total + product.precioP * product.quatify)
            setCountProducts(countProducts + product.quatify);
            return setAllProducts([...products]);
        }

        product.quatify = 1;
        setTotal(total + product.precioP * product.quatify)
        setCountProducts(countProducts + product.quatify);
        setAllProducts([...allProducts, product]);
    }

    useEffect(() => {
        // Agregar clase active al primer item
        document.querySelectorAll('.hot-deals-list .category_item[category="all"]').forEach(function (item) {
            item.classList.add('ct_item_active');
        });

        // Filtrar productos
        document.querySelectorAll('.category_item').forEach(function (item) {
            item.addEventListener('click', function () {
                var catProduct = this.getAttribute('category');

                // Agregar clase active al item seleccionado y removerla del anterior
                document.querySelectorAll('.category_item').forEach(function (item) {
                    item.classList.remove('ct_item_active');
                });
                this.classList.add('ct_item_active');

                // Ocultar todos los productos
                function hideProducts() {
                    document.querySelectorAll('.product-info').forEach(function (item) {
                        item.style.position = 'fixed';
                        item.style.transform = 'scale(0)';
                    });
                }

                hideProducts();

                // Mostrar productos correspondientes a la categoría seleccionada
                function showProducts() {
                    document.querySelectorAll('.product-info[category="' + catProduct + '"]').forEach(function (item) {
                        item.style.position = 'static'; // Vuelve a la posición estática
                        item.style.transform = 'scale(1)';
                    });
                }
                setTimeout(showProducts, 100); // Mostrar productos después de ocultarlos
            });
        });

        // Cuando se selecciona la categoría "all", muestra todos los productos
        document.querySelector('.category_item[category="all"]').addEventListener('click', function () {
            function showAllProducts() {
                document.querySelectorAll('.product-info').forEach(function (item) {
                    item.style.position = 'static'; // Vuelve a la posición estática
                    item.style.transform = 'scale(1)';
                });
            }
            setTimeout(showAllProducts, 100);
        });
    }, []);



    return (
        <section className="hot-deals-section">
            <center><h2>Ofertas Exclusivas</h2></center>
            <div className="hot-deals">
                <div className="hot-deals-list">
                    <a className="category_item" category="all">Todo</a>
                    <a className="category_item" category="2">Celulares</a>
                    <a className="category_item" category="3">Computadores</a>
                    <a className="category_item" category="4">Laptops</a>
                    <a className="category_item" category="1">Accesorios</a>
                </div>
                <div className="hot-deals-products">
                    {productos.map(product => (
                        <div className="product-info" category={product.idCategoria} key={product.idProducto}>
                            <img src={`./Img/productos/${product.idProducto}/principal.png`} />
                            <div className="hot-deals-text">
                                <h3>{product.nombreP}</h3>
                                <p>Precio: <span className="price">${product.precioP}</span></p>
                                <button id="add-to-cart-button-1" className="add-to-cart-button" onClick={() => onAllProduct(product)}>Añadir al Carrito</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};

export default ProductList;