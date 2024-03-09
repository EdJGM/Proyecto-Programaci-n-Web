import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/styleContact.css';
import Header from '../Componentes/Header';
import SecondaryNav from '../Componentes/SecondaryNav';
import Subscription from '../Componentes/Subscription';
import Footer from '../Componentes/Footer';


const Contacto = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [countProducts, setCountProducts] = useState(0);

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
                        <form action="../Recursos/formContact.html" className="form">
                            <input type="text" id="name-input" placeholder="Nombre*" required />
                            <input type="email" id="email-input1" placeholder="Correo Electrónico*" required />
                            <input type="tel" id="phone-input" placeholder="Teléfono*" required />
                            <input type="text" id="subject-input" placeholder="Asunto*" required />
                            <textarea id="message-input" placeholder="Mensaje..." required></textarea>
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
                        allowfullscreen=""
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