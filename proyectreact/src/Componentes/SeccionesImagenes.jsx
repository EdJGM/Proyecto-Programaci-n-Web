import React from 'react';

function SeccionesImagenes(){
    function handleButtonClick(url){
        window.location.href = url;
    };    

    return (
        <section className="image-section-container">
            <div className="image-container">
                <img src="./Img/retrato-joven-alegre-ordenador-portatil.jpg" alt="Imagen 1"/>
                <div className="texto-container">
                    <p className="texto1-descuento">40% <br/> VENTA</p>
                    <p className="texto2-nombre">Laptop</p>
                    <p className="texto3-categoria">Laptops</p>
                    <button id="irLaptops" className="add-to-cart-button" onClick={() => handleButtonClick('./Categorias/PaginaLaptops.html')}>Ir Ya!</button>
                </div>
            </div>
            <div className="image-container">
                <img src="./Img/exhibicion-auriculares-musica-levitando.jpg" alt="Imagen 1"/>
                <div className="texto-container">
                    <p className="texto1-descuento">60% <br/> VENTA</p>
                    <p className="texto2-nombre">Audifonos</p>
                    <p className="texto3-categoria">Accesorios</p>
                    <button id="irAccesorios" className="add-to-cart-button" onClick={() => handleButtonClick('./Categorias/PaginaAccesorios.html')}>Ir Ya!</button>
                </div>
            </div>
            <div className="image-container">
                <img src="./Img/retrato-atractiva-mujer-moda-complacida-gafas-blusa-mostrando-pantalla-telefono-apuntando-al-dispositivo-dedo-indice-sonriendo-ampliamente.jpg" alt="Imagen 1"/>
                <div className="texto-container">
                    <p className="texto1-descuento">10% <br/> VENTA</p>
                    <p className="texto2-nombre">Celulares</p>
                    <p className="texto3-categoria">Telefonía</p>
                    <button id="irCelulalres" className="add-to-cart-button" onClick={() => handleButtonClick('./Categorias/PaginaCelulares.html')}>Ir Ya!</button>
                </div>
            </div>
        </section>
    )
};

export default SeccionesImagenes;