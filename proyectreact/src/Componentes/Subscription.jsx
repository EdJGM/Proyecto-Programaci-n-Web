import React from "react";

function Subscription () {
    return (
        <section id="subscription-section">
            <h2>Suscríbete a Nuestro Sitio</h2>
            <form id="subscription-form" action="./Recursos/formRegister.html">
                <input type="email" id="email-input" placeholder="Ingresa tu correo electrónico" required/>
                <button type="submit" id="subscribe-button">Suscribirse</button>
            </form>
        </section>
    );
};

export default Subscription;