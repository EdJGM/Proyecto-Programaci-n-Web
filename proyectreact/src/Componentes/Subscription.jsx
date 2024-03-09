import React from "react";
import { Link } from "react-router-dom";

function Subscription() {
    return (
        <section id="subscription-section">
            <h2>Suscríbete a Nuestro Sitio</h2>
            <form id="subscription-form">
                <input type="email" id="email-input" placeholder="Ingresa tu correo electrónico" required />
                <Link to="/register"><button type="submit" id="subscribe-button">Suscribirse</button></Link>
            </form>
        </section>
    );
};

export default Subscription;