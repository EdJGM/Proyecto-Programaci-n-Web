import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import { useForm } from 'react-hook-form';

const PaymentForm = ({ onSuccessfulSale }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        fetch('http://localhost:5000/api/venta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nrTarjeta: data.number,
                nombre: data.name,
                fechaExp: data.expiry,
                cvc: data.cvc,
            }),
        })
            .then(response => {
                // Verificar el tipo de contenido de la respuesta
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    // Si la respuesta es JSON, analizarla como tal
                    return response.json();
                } else {
                    // Si no es JSON, tratarla como texto
                    return response.text();
                }
            })
            .then(data => {
                alert('Venta exitosa')
                console.log('Success:', data);
                // Vaciar todos los campos del formulario
                reset();
                setState({
                    number: "",
                    name: "",
                    expiry: "",
                    cvc: "",
                    focus: ""
                });
                // Establecer el valor del localStorage en 0
                localStorage.clear();
                onSuccessfulSale();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const [state, setState] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: ""
    })

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleFocusChange = (e) => {
        setState({
            ...state,
            focus: e.target.name
        })
    }

    return (
        <div className='card'>
            <div className='card-body'>
                <Cards
                    number={state.number}
                    name={state.name}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    focused={state.focus}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="number">Número de la tarjeta</label>
                        <input
                            type="text"
                            name="number"
                            id="number"
                            maxLength="16"
                            className="form-control"
                            {...register("number", {
                                required: {
                                    value: true,
                                    message: "Este campo es requerido"
                                },
                                minLength: {
                                    value: 16,
                                    message: "Debe contener 16 caracteres"
                                },
                                maxLength: {
                                    value: 16,
                                    message: "Debe contener 16 caracteres"
                                },
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "Debe contener solo números"
                                }
                            })}
                            onChange={handleInputChange}
                            onFocus={handleFocusChange}
                        />
                        {errors.number && <span className='erros'>{errors.number.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            maxLength="30"
                            className="form-control"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Este campo es requerido"
                                },
                                minLength: {
                                    value: 2,
                                    message: "Debe contener al menos 2 caracteres"
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Debe contener menos de 30 caracteres"
                                },
                                pattern: {
                                    value: /^[a-zA-Z\s]*$/,
                                    message: "Debe contener solo letras"
                                }
                            })}
                            onChange={handleInputChange}
                            onFocus={handleFocusChange}
                        />
                        {errors.name && <span className='erros'>{errors.name.message}</span>}
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="expiry">Fecha de expiración</label>
                            <input
                                type="text"
                                name="expiry"
                                id="expiry"
                                maxLength="4"
                                className="form-control"
                                {...register("expiry", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                    minLength: {
                                        value: 4,
                                        message: "Debe contener 4 caracteres"
                                    },
                                    maxLength: {
                                        value: 4,
                                        message: "Debe contener 4 caracteres"
                                    },
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "Debe contener solo números"
                                    }
                                })}
                                onChange={handleInputChange}
                                onFocus={handleFocusChange}
                            />
                            {errors.expiry && <span className='erros'>{errors.expiry.message}</span>}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="cvc">CVC</label>
                            <input
                                type="text"
                                name="cvc"
                                id="cvc"
                                maxLength="4"
                                className="form-control"
                                {...register("cvc", {
                                    required: {
                                        value: true,
                                        message: "Este campo es requerido"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Debe contener 3 caracteres"
                                    },
                                    maxLength: {
                                        value: 4,
                                        message: "Debe contener 4 caracteres"
                                    },
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: "Debe contener solo números"
                                    }
                                })}
                                onChange={handleInputChange}
                                onFocus={handleFocusChange}
                            />
                            {errors.cvc && <span className='erros'>{errors.cvc.message}</span>}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success btn-block btn-lg">Pagar</button>
                </form>
            </div>
        </div>
    );
};

export default PaymentForm;