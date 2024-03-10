import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../styles/styleContact.css';
import Header from '../Componentes/Header';
import SecondaryNav from '../Componentes/SecondaryNav';
import Subscription from '../Componentes/Subscription';
import Footer from '../Componentes/Footer';


const Contacto = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {

    });

    return (
        <div>
            <Header
                allProducts={allProducts}
                setAllProducts={setAllProducts}
                total={total}
                setTotal={setTotal}
                countProducts={countProducts}
                setCountProducts={setCountProducts}
            />
            <SecondaryNav />
            <section id="mapaC">

                <div className="categoria-celulares1C"><Link to="/">&#x1F3DA; Home</Link></div>
                <div className="categoria-celulares2C"><p>|</p></div>
                <div className="categoria-celulares3C"><p>Contacto</p></div>
            </section>
            <article>
                <section id="product-categories-container">
                    <div id="product-categories">
                        <aside>
                            <div>
                                <Link to="/categoria/celulares"><span><h2>Celulares</h2></span></Link>
                            </div>
                            <div>
                                <Link to="/categoria/accesorios"><span><h2>Accesorios</h2></span></Link>
                            </div>
                            <div>
                                <Link to="/categoria/laptops"><span><h2>Laptops</h2></span></Link>
                            </div>
                            <div>
                                <Link to="/categoria/televisores"><span><h2>Televisores</h2></span></Link>
                            </div>
                            <div>
                                <Link to="/categoria/tablets"><span><h2>Tablets</h2></span></Link>
                            </div>
                            <div>
                                <Link to="/categoria/computadores"><span><h2>Computadores</h2></span></Link>
                            </div>
                        </aside>
                    </div>
                    <div className="form-contacto">
                        <center><h2>Contáctanos</h2></center>
                        <div className="contact-info">
                            <div className="adress-cont">
                                <div className="icon1-cont"></div>
                                <h3>DIRECCIÓN</h3>
                                <p>QUITO, ECUADOR</p>
                            </div>
                            <div className="email-cont">
                                <div className="icon2-cont"></div>
                                <h3>EMAIL</h3>
                                <p>GLOBALSTORE@GMAIL.COM</p>
                            </div>
                            <div className="phone-cont">
                                <div className="icon3-cont"></div>
                                <h3>TELÉFONO</h3>
                                <p>(+593) 123 456 7890</p>
                            </div>
                        </div>
                        <form className="form" onSubmit={onSubmit}>
                            <input type="text" id="name-input" placeholder="Nombre*"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Campo requerido'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Mínimo 3 caracteres'
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'Máximo 30 caracteres'
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: 'Solo letras'
                                    }
                                }
                                )}
                            />
                            {errors.name && <span className='errosC'>{errors.name.message}</span>}

                            <input type="email" id="email-input1" placeholder="Correo Electrónico*"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Campo requerido'
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'Correo inválido'
                                    }
                                }
                                )}
                            />
                            {errors.email && <span className='errosC'>{errors.email.message}</span>}

                            <input type="tel" id="phone-input" placeholder="Teléfono*"
                                {...register("phone", {
                                    required: {
                                        value: true,
                                        message: 'Campo requerido'
                                    },
                                    minLength: {
                                        value: 10,
                                        message: 'Mínimo 10 caracteres'
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Máximo 10 caracteres'
                                    },
                                    pattern: {
                                        value: /^[0-9]+$/i,
                                        message: 'Solo números'
                                    },
                                    validate: value => {
                                        return value < 0 ? 'No se aceptan números negativos' : true
                                    }
                                }
                                )}
                            />
                            {errors.phone && <span className='errosC'>{errors.phone.message}</span>}

                            <input type="text" id="subject-input" placeholder="Asunto*"
                                {...register("subject", {
                                    required: {
                                        value: true,
                                        message: 'Campo requerido'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Mínimo 3 caracteres'
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'Máximo 30 caracteres'
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        message: 'Solo letras'
                                    }
                                }
                                )}
                            />
                            {errors.subject && <span className='errosC'>{errors.subject.message}</span>}

                            <textarea id="message-input" placeholder="Mensaje..."
                                {...register("message", {
                                    required: {
                                        value: true,
                                        message: 'Campo requerido'
                                    },
                                    minLength: {
                                        value: 10,
                                        message: 'Mínimo 10 caracteres'
                                    },
                                    maxLength: {
                                        value: 300,
                                        message: 'Máximo 300 caracteres'
                                    }
                                }
                                )}
                            ></textarea>
                            {errors.message && <span className='errosC'>{errors.message.message}</span>}

                            <button type="clear" id="delete-button" >Borrar Campos</button>
                            <button type="submit" id="send-button">Enviar</button>
                        </form>
                    </div>
                </section>
                <br />
                <br />
                <div style={{ overflow: 'auto' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096036!2d144.95373531531592!3d-37.817209979751795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1631233126323!5m2!1sen!2sus"
                        width="100%"
                        height="400px"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy">
                    </iframe>
                </div>
            </article>
            <Subscription />
            <Footer />
        </div>
    );
};

export default Contacto;