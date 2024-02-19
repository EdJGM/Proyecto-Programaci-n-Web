import React from "react";

function Footer(){
    return (
        <footer>
            <div id="footer-container">
                <div id="social-icons">
                    <p>Contactanos por: </p>
                    <a href="#" target="_blank"><img src="./Img/facebook.png" alt="Facebook"/></a>
                    <a href="#" target="_blank"><img src="./Img/twitter.png" alt="Twitter"/></a>
                    <a href="#" target="_blank"><img src="./Img/instagram.png" alt="Instagram"/></a>
                </div>
                <br/>
                <br/>
                <div>
                    <a href="#" style={{color: 'white'}}>Aviso legal</a> |
                    <a href="# "style={{color: 'white'}}>Política de privacidad</a> |
                    <a href="# "style={{color: 'white'}}>Términos de servicio</a>
                </div>    
                <br/>
                <br/>
                <p id="rights">© 2024 Global Store </p>
                <p> Todos los derechos reservados </p>
            </div>
        </footer>
    );
};

export default Footer;