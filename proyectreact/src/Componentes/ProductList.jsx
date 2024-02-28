import React, { useEffect } from "react";
import { data } from "../Data";

function ProductList({allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal}){

    function onAllProduct(product){
        if(allProducts.find(item => item.id === product.id)){
            const products = allProducts.map(item => 
                item.id == product.id 
                    ? {...item, quatify: item.quatify + 1} 
                    : item
            ); 

            setTotal(total + product.price * product.quatify)
            setCountProducts(countProducts + product.quatify);
            return setAllProducts([...products]);
        }

        setTotal(total + product.price * product.quatify)
        setCountProducts(countProducts + product.quatify);
        setAllProducts([...allProducts, product]);
    }

    useEffect(() => {
        // Agregar clase active al primer item
        document.querySelectorAll('.hot-deals-list .category_item[category="all"]').forEach(function(item) {
            item.classList.add('ct_item_active');
        });   

        // Filtrar productos
        document.querySelectorAll('.category_item').forEach(function(item) {
            item.addEventListener('click', function() {
                var catProduct = this.getAttribute('category');

                // Agregar clase active al item seleccionado y removerla del anterior
                document.querySelectorAll('.category_item').forEach(function(item) {
                    item.classList.remove('ct_item_active');
                });
                this.classList.add('ct_item_active');

                // Ocultar todos los productos
                function hideProducts(){    
                    document.querySelectorAll('.product-info').forEach(function(item) {
                        item.style.position = 'fixed';
                        item.style.transform = 'scale(0)';
                    });
                } 

                hideProducts();

                // Mostrar productos correspondientes a la categoría seleccionada
                function showProducts(){
                    document.querySelectorAll('.product-info[category="'+catProduct+'"]').forEach(function(item) {
                        item.style.position = 'static'; // Vuelve a la posición estática
                        item.style.transform = 'scale(1)';
                    });
                }
                setTimeout(showProducts, 100); // Mostrar productos después de ocultarlos
            });
        });

        // Cuando se selecciona la categoría "all", muestra todos los productos
        document.querySelector('.category_item[category="all"]').addEventListener('click', function() {
            function showAllProducts(){
                document.querySelectorAll('.product-info').forEach(function(item) {
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
                    <a className="category_item" category="celulares">Celulares</a>
                    <a className="category_item" category="computadores">Computadores</a>
                    <a className="category_item" category="laptops">Laptops</a>
                    <a className="category_item" category="tvs">TVs</a>
                </div>
                <div className="hot-deals-products">
                    {data.map(product => (
                        <div className="product-info" category={product.category} key={product.id}>
                            <img src={product.img}/>
                            <div className="hot-deals-text">
                                <h3>{product.title}]</h3>
                                <p>Precio Anterior: ${product.priceBefore}</p>
                                <p>Precio Actual: <span className="price">${product.price}</span></p>
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