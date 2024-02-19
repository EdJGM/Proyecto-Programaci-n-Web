import React, { useState } from 'react';

function SecondaryNav(){
    const [showSubMenu, setShowSubMenu] = useState(false);

    function handleMenuClick(){
      setShowSubMenu(!showSubMenu);
    };

    return (
        <div id="secondary-nav">
        <img id="logo" src="./Img/l.png" alt="Logo" width="230px" height="174px"/>
        <ul>
            <li><a href="#product-categories">Inicio</a></li>
            <li></li>
            <li><i>|</i></li>
            <li></li>
            <li><a id="categories-link" style={{cursor: 'pointer'}} onClick={handleMenuClick}>Categorías ▼</a>
                <ul className={`menu-vertical ${showSubMenu ? 'show' : ''}`}>
                    <li><a href="./Categorias/PaginaCelulares.html">Celulares</a></li>
                    <li><a href="./Categorias/PaginaAccesorios.html">Accesorios</a></li>
                    <li><a href="./Categorias/PaginaLaptops.html">Laptops</a></li>
                    <li><a href="./Categorias/PaginaTelevisores.html">Televisores</a></li>
                    <li><a href="./Categorias/PaginaTablets.html">Tablets</a></li>
                    <li><a href="./Categorias/PaginaComputadores.html">Computadores</a></li>
                </ul>
            </li>
            <li></li>
            <li><i>|</i></li>
            <li></li>
            <li><a href="./Recursos/Soporte.html">Soporte</a></li>
            <li></li>
            <li><i>|</i></li>
            <li></li>
            <li><a href="./Recursos/Blog.html">Blog</a></li>
        </ul>
        <div id="phone-icon">&#128222;<span>123-456-7890</span>
            <p> &#9993;<span>globalstore@gmail.com</span></p>
        </div>
        </div>
    )
};

export default SecondaryNav;