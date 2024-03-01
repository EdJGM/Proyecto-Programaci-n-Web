import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styleLogin.css';

const Login = () => {
    const [user, setuser] = useState('');
    const [pass, setpass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, pass })
            });

            if (response.ok) {
                window.location.href = '/';
            } else {
                const errorMessage = await response.text();
                alert(errorMessage); // Mostrar mensaje de error        
            }
        } catch (error) {
            console.error('Error al enviar solicitud:', error);
        }
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
                    <Link to="/" style={{ 'color': 'black' }}>Volver</Link>
                </div>

            </body>
        </div>
    );
};

export default Login;