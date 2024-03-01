import React from "react";
import { Link } from "react-router-dom";

function Article() {
    return (
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
                <div className="best-sellers">
                    <ul>
                        <li>
                            <img src="./Img/1.png" alt="Tienda online" />
                            <div className="texto1">
                                <h3>¡Lo Mejor en Tecnología!</h3>
                                <p>¡No te quedes sin el tuyo!</p>
                            </div>
                        </li>
                        <li><img src="./Img/2.png" alt="Tienda online" />
                            <div className="texto1">
                                <h3>¡Descubre la revolución tecnológica!</h3>
                                <p>Encuentra lo mejor en nuestra tienda</p>
                            </div>
                        </li>
                        <li><img src="./Img/3.png" alt="Tienda online" />
                            <div className="texto2">
                                <h3>¡Los Accesorios y Dispostivos!</h3>
                                <p>Todo tu equipo de trabajo en un solo lugar.</p>
                            </div>
                        </li>
                        <li><img src="./Img/4.png" alt="Tienda online" />
                            <div className="texto3">
                                <h3>¡Tu mundo Apple a tus manos!</h3>
                                <p>iPhone's, Mac's y mucho más.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </article>
    )
};

export default Article;