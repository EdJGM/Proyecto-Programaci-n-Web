import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SecondaryNav() {
    const [showSubMenu, setShowSubMenu] = useState(false);

    function handleMenuClick() {
        setShowSubMenu(!showSubMenu);
    };

    return (
        <div id="secondary-nav">
            <img id="logo" src="/Img/l.png" alt="Logo" width="230px" height="174px" />
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li></li>
                <li><i>|</i></li>
                <li></li>
                <li><a id="categories-link" style={{ cursor: 'pointer' }} onClick={handleMenuClick}>Categorías ▼</a>
                    <ul className={`menu-vertical ${showSubMenu ? 'show' : ''}`}>
                        <li><Link to="/categoria/celulares">Celulares</Link></li>
                        <li><Link to="/categoria/accesorios">Accesorios</Link></li>
                        <li><Link to="/categoria/laptops">Laptops</Link></li>
                        <li><Link to="/categoria/televisores">Televisores</Link></li>
                        <li><Link to="/categoria/tablets">Tablets</Link></li>
                        <li><Link to="/categoria/computadores">Computadores</Link></li>
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