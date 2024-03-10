import React, { useState } from 'react';
import '../styles/styleRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = ({ allProducts, setAllProducts, countProducts, setCountProducts, total, setTotal }) => {

    const navegate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = handleSubmit(async (data) => {
        //normalizar nombre y apellido con minusculas
        data.name = data.name.toLowerCase();
        data.lastname = data.lastname.toLowerCase();
        //verificar que el usuario que quiera registrarse no tenga los mismos datos que otro usuario ya existente en la base de datos
        const response = await fetch('http://localhost:5000/api/usuarios')
        const dataUsers = await response.json();

        if (dataUsers.find(user => user.username && user.username.toLowerCase() === data.user.toLowerCase()) || dataUsers.find(user => user.email && user.email.toLowerCase() === data.email.toLowerCase())) {
            alert("El usuario ya existe");
        }
        else {
            let newUser = { ...data, id: dataUsers.length + 1 };
            console.log(newUser);
            //enviar datos al servidor para registrarse
            fetch('http://localhost:5000/api/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            }).then(() => {
                alert('Usuario registrado');
                navegate('/login');
            }).catch((error) => {
                console.log(error);
            });
        }
    });

    return (
        <div className="bodyRegister">
            <div className="container">
                <center>
                    <img id="logo" src="./Img/Logo.png" alt="Logo" width="130px" height="150px" />
                </center>
                <h1>Registro</h1>
                <form className="formRegister" onSubmit={onSubmit}>
                    <label htmlFor="user">Usuario</label>
                    <input type="text" id="user" name="user" placeholder="Ingresa tu usuario"
                        {...register("user", {
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
                    />
                    {errors.user && <span className='erros'>{errors.user.message}</span>}

                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" placeholder="Ingresa tu nombre"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "El nombre es requerido"
                            },
                            minLength: {
                                value: 4,
                                message: "El nombre debe tener al menos 4 caracteres"
                            },
                            maxLength: {
                                value: 15,
                                message: "El nombre debe tener menos de 15 caracteres"
                            }
                        })}
                    />
                    {errors.name && <span className='erros'>{errors.name.message}</span>}

                    <label htmlFor="lastname">Apellido:</label>
                    <input type="text" id="lastname" name="lastname" placeholder="Ingresa tu apellido"
                        {...register("lastname", {
                            required: {
                                value: true,
                                message: "El apellido es requerido"
                            },
                            minLength: {
                                value: 4,
                                message: "El apellido debe tener al menos 4 caracteres"
                            },
                            maxLength: {
                                value: 15,
                                message: "El apellido debe tener menos de 15 caracteres"
                            }
                        })}
                    />
                    {errors.lastname && <span className='erros'>{errors.lastname.message}</span>}

                    <label htmlFor="date">Año de nacimiento:</label>
                    <input type="date" name="date" id="date" required
                        {...register("date", {
                            required: {
                                value: true,
                                message: "La fecha de nacimiento es requerida"
                            },
                            validate: value => {
                                const date = new Date(value);
                                const currentDate = new Date();
                                const age =
                                    currentDate.getFullYear() - date.getFullYear();

                                if (age < 18) {
                                    return "Debes ser mayor de edad para registrarte";
                                } else if (age >= 100) {
                                    return "Debes ser menor de 100 años para registrarte";
                                } else if (age <= 0) {
                                    return "Debes ser mayor de 0 años para registrarte";
                                }

                                return true;
                            }
                        })}
                    />
                    {errors.date && <span className='erros'>{errors.date.message}</span>}

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" className='email' placeholder="Ingresa un email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "El email es requerido"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "El email no es válido"
                            }
                        })}
                    />
                    {errors.email && <span className='erros'>{errors.email.message}</span>}

                    <label htmlFor="password">Contraseña:</label>
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
                    {errors.password && <span className='erros'>{errors.password.message}</span>}

                    <input type="submit" className='register' value="Registrarse" />
                </form>

                <div className="message">
                    <p>¿Ya tienes cuenta? <Link to="/login" style={{ 'color': 'black' }}>¡Inicia sesión!</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;