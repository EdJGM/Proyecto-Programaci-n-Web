import React from 'react';
import '../styles/styleRegister.css';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <body>
                <div class="container">
                    <center>
                        <img id="logo" src="./Img/Logo.png" alt="Logo" width="130px" height="150px" />
                    </center>
                    <h1>Registro</h1>
                    <form action="./datos.php" method="post">
                        <label htmlFor="user">Usuario</label>
                        <input type="text" id="user" name="user" placeholder="Ingresa tu usuario" required />

                        <label htmlFor="name">Nombre:</label>
                        <input type="text" id="name" name="name" placeholder="Ingresa tu nombre" required />

                        <label htmlFor="lastname">Apellido:</label>
                        <input type="text" id="lastname" name="lastname" placeholder="Ingresa tu apellido" required />

                        <label htmlFor="date">Año de nacimiento:</label>
                        <input type="date" name="date" id="date" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Ingresa un email" required />

                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" placeholder="Ingresa una contraseña" required />

                        <input type="submit" value="Registrarse" />
                    </form>

                    <div class="message">
                        <p>¿Ya tienes cuenta? <Link to="/login">¡Regístrate!</Link></p>
                    </div>

                </div>
            </body>
        </div>
    );
};

export default Register;