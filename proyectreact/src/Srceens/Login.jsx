import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styleLogin.css';
import axios from 'axios';

const Login = () => {
    const [user, setuser] = useState('');
    const [pass, setpass] = useState('');
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:80/login', { user, pass })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div >
            <body className='bodylogin'>
                <center>
                    <img id="logo" src="./Img/Logo.png" alt="Logo" width="130px" height="150px" />
                </center>
                <h1>Iniciar sesión</h1>
                <form action="./datos.php" method="post" className='formlogin' onSubmit={handleSubmit}>
                    <label for="username">Nombre de usuario:</label>
                    <input type="text" id="username" name="username" placeholder="Ingrese su usuario" required className='usuarioLogin' onChange={e => setuser(e.target.value)} /><br />

                    <label for="pass">Contraseña:</label>
                    <input type="password" id="pass" name="password" placeholder="Ingrese su contraseña" required className='contrasenaLogin' onChange={e => setpass(e.target.value)} /><br /><br />

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