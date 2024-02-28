import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styleLogin.css';

const Login = () => {
    return (
        <div >
            <body>
                <center>
                    <img id="logo" src="./Img/Logo.png" alt="Logo" width="130px" height="150px" />
                </center>
                <h1>Iniciar sesión</h1>
                <form action="./datos.php" method="post">
                    <label for="username">Nombre de usuario:</label>
                    <input type="text" id="username" name="username" placeholder="Ingrese su usuario" required /><br />

                    <label for="pass">Contraseña:</label>
                    <input type="password" id="pass" name="password" placeholder="Ingrese su contraseña" required /><br /><br />

                    <input type="submit" value="Iniciar sesión" />
                </form>
                <div class="register-link">
                    <p>¿Aún no tienes cuenta? <Link to="/register">¡Regístrate!</Link></p>
                </div>
                <div className='volver'>
                    <Link to="/">Volver</Link>
                </div>

            </body>
        </div>
    );
};

export default Login;