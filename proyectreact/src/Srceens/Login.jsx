import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from './AuthContext';
import '../styles/styleLogin.css';

const Login = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {

    const { setUsuario } = useContext(AuthContext);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (username) => {
        // Aquí es donde autenticarías al usuario.
        // Una vez que el usuario esté autenticado, puedes establecer el estado del usuario:
        setUsuario({ username: username });
    };

    const onSubmit = handleSubmit(async (data) => {
        const response = await fetch('http://localhost:5000/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const userData = await response.json();
        if (response.status === 200) {
            alert('Login exitoso');
            if (userData.isAdmin) {
                console.log('Es admin');
                window.location.href = 'http://localhost/proyecto-programacion-web/admin/admin_page.php';
            } else {
                handleLogin(data.username);
                navigate('/');
            }
        } else {
            alert('Usuario No Existe');
        }
    });

    return (
        <div className='bodylogin'>
            <center>
                <img id="logo" src="./Img/Logo.png" alt="Logo" width="130px" height="150px" />
            </center>
            <h1>Iniciar sesión</h1>
            <form className='formlogin' onSubmit={onSubmit}>
                <label htmlFor="username">Nombre de usuario:</label>
                <input type="text" id="username" name="username" placeholder="Ingrese su usuario"
                    {...register("username", {
                        required: {
                            value: true,
                            message: "El usuario es requerido"
                        },
                        minLength: {
                            value: 4,
                            message: "El usuario debe tener al menos 4 caracteres"
                        },
                        maxLength: {
                            value: 15,
                            message: "El usuario debe tener menos de 15 caracteres"
                        }
                    })}
                /><br />
                {errors.username && <span className='erros'>{errors.username.message}</span>}

                <label htmlFor="pass">Contraseña:</label>
                <div style={{ position: 'relative' }}>
                    <input type={showPassword ? "text" : "password"} id="pass" name="password" placeholder="Ingrese su contraseña"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "La contraseña es requerida"
                            },
                            minLength: {
                                value: 4,
                                message: "La contraseña debe tener al menos 4 caracteres"
                            },
                            maxLength: {
                                value: 15,
                                message: "La contraseña debe tener menos de 15 caracteres"
                            }
                        })}
                        className="inputPassword"  // Añade esta clase
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="botonOjo">
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                <br />
                {errors.password && <span className='erros'>{errors.password.message}</span>}

                <input type="submit" className='login' value="Iniciar sesión" />
            </form>
            <div className="register-link">
                <p>¿Aún no tienes cuenta? <Link to="/register">¡Regístrate!</Link></p>
            </div>
            <div className='volver'>
                <Link to="/" style={{ 'color': 'black' }}>Volver</Link>
            </div>

        </div>
    );
};

export default Login;