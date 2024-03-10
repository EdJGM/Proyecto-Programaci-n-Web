import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Subscription() {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        navigate('/register');
    }

    return (
        <section id="subscription-section">
            <h2>Suscríbete a Nuestro Sitio</h2>
            <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="input-container">
                    <input type="email" id="email-input" placeholder="Ingresa tu correo electrónico"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "El correo electrónico es requerido"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                message: "El correo electrónico no es válido"
                            }
                        })}
                    />
                    <button type="submit" id="subscribe-button">Suscribirse</button>
                </div>
                {errors.email && <span className='errosS'>{errors.email.message}</span>}

            </form>
        </section>
    );
};

export default Subscription;