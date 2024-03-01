import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styleContacto.css';

const Contacto = () => {
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
            <section id="mapa">

                <div className="categoria-celulares1"><Link to="/">&#x1F3DA; Home</Link></div>
                <div className="categoria-celulares2"><p>|</p></div>
                <div className="categoria-celulares3"><p>{contacto}</p></div>
            </section>
            <article>
                <section id="product-categories-container">
                    <div id="product-categories">
                        <aside>
                            <div>
                                {categorias.map((categoria) => (
                                    <div key={categoria}>
                                        <Link to={`/categoria/${categoria}`}>
                                            <span><h2>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2></span>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                    <div id="best-sellers">
                        <ul>
                            <li>
                                <img src={`/Img/imgCategoria/${categoriaId}/principal.png`} />
                                <div className="texto">
                                    <h2>LOS MEJORES EN EL MERCADO</h2>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </article>
        </div>
    );
};

export default Contacto;