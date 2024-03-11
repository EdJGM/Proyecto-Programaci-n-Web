import React, { useState, useEffect } from 'react';
import Header from '../Componentes/Header';
import SecondaryNav from '../Componentes/SecondaryNav';
import '../styles/styleConfirmarCarro.css'
import Subscription from '../Componentes/Subscription';
import Footer from '../Componentes/Footer';
import PaymentForm from '../Componentes/PaymentForm';

const ConfirmarCarro = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {

    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const handleSuccessfulSale = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    };

    useEffect(() => {
        const allProductsLocalStorage = JSON.parse(localStorage.getItem('allProducts'));

        if (allProductsLocalStorage) {

            Promise.all(allProductsLocalStorage.map((product) =>
                fetch(`http://localhost:5000/api/products/${product.idProducto}`)
                    .then(response => response.json())
            ))

                .then(productDetails => {
                    const productsWithQuantity = productDetails.map(([product], index) => {
                        return {
                            ...product,
                            quatify: allProductsLocalStorage[index].quatify
                        };
                    });
                    setAllProducts(productsWithQuantity);
                })
                .catch((error) => {
                    console.error('Error obteniendo los datos de los productos:', error);
                });
        } else {
            setAllProducts([]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('allProducts', JSON.stringify(allProducts));
        const newTotal = allProducts.reduce((total, producto) => total + producto.precioP * producto.quatify, 0);
        setTotal(newTotal);
        const newCountProducts = allProducts.reduce((total, producto) => total + producto.quatify, 0);
        setCountProducts(newCountProducts);
    }, [allProducts]);

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

    const handleIncrement = (index) => {
        const newAllProducts = [...allProducts];
        newAllProducts[index].quatify++;
        setAllProducts(newAllProducts);
        setTotal(prevTotal => prevTotal + newAllProducts[index].precioP);
        setCountProducts(prevCount => prevCount + 1);
    };

    const handleDecrement = (index) => {
        const newAllProducts = [...allProducts];
        if (newAllProducts[index].quatify > 1) {
            newAllProducts[index].quatify--;
            setAllProducts(newAllProducts);
            setTotal(prevTotal => prevTotal - newAllProducts[index].precioP);
            setCountProducts(prevCount => prevCount - 1);
        }
    };

    const handleRemove = (index) => {
        const newAllProducts = allProducts.filter((_, i) => i !== index);
        setAllProducts(newAllProducts);
        const removedProduct = allProducts[index];
        setTotal(prevTotal => prevTotal - (removedProduct.precioP * removedProduct.quatify));
        setCountProducts(prevCount => prevCount - removedProduct.quatify);
    };

    const handleConfirmarCompra = () => {
        //si se presiona el boton de confirmar confirmar coompra se muestra los campos para ingresar los datos de la tarjeta
        setShowPaymentForm(true);
    };

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
            <div className="Appbody">

                <table className="tablaCarrito">
                    <thead >
                        <tr className='filaCabecera'>
                            <th className='celda'>Imagen</th>
                            <th className='celda'>Nombre</th>
                            <th className='celda'>Cantidad</th>
                            <th className='celda'>Precio</th>
                            <th className='celda'>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map((producto, index) => (
                            <tr key={index}>
                                <td className='celda'><img src={`/Img/productos/${producto.idProducto}/principal.png`} alt={producto.nombreP} /></td>
                                <td className='celda'>{producto.nombreP}</td>
                                <td className='celda'>
                                    <button className="increment-decrement-button" onClick={() => handleDecrement(index)}>-</button>
                                    {producto.quatify}
                                    <button className="increment-decrement-button" onClick={() => handleIncrement(index)}>+</button>
                                </td>
                                <td className='celda'>{producto.precioP * producto.quatify}</td>
                                <td className='celda'><button className="remove-button" onClick={() => handleRemove(index)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='totalC'>Total: {total}</div>
                <button className="confirm-button" onClick={handleConfirmarCompra}>Confirmar compra</button>
            </div>
            <br />
            <div className='layout'>
                {showPaymentForm ? <PaymentForm onSuccessfulSale={handleSuccessfulSale} /> : null}
            </div>
            <Subscription />
            <Footer />
        </div>

    );
};

export default ConfirmarCarro;