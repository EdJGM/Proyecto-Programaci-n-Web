import React from "react";

function Comentarios(){
    return(
        <section id="blog-section">
            <h2>Comentarios del Blog</h2>
            <div className="blog-container">
                <div className="blog-post">
                    <figure><img src="./Img/collage-creativo-experiencia-cliente.jpg" alt="Imagen 1"/></figure>
                    <h3>Atención al Cliente Inigualable</h3>
                    <div className="content-container">
                        <div className="icon-container">                    
                            <div className="icon1"></div>
                            <div className="icon2"></div>
                            <div className="icon3"></div>
                        </div>
                        <p>No solo encontré el producto perfecto aquí, sino que también recibí un servicio al cliente 
                            excepcional. El equipo fue muy amable y servicial, respondiendo todas mis preguntas y 
                            asegurándose de que tuviera una experiencia de compra perfecta. ¡Altamente recomendado!</p>
                    </div>
                </div>
                <div className="blog-post">
                    <figure><img src="./Img/hombre-usando-tableta-trabajar-conectarse-otros.jpg" alt="Imagen 2"/></figure>
                    <h3>Increíble Tecnología Futurista</h3>
                    <div className="content-container">
                        <div className="icon-container">
                            <div className="icon1"></div>
                            <div className="icon2"></div>
                            <div className="icon3"></div>
                        </div>
                        <p>Me encanta cómo esta tienda siempre tiene los últimos gadgets. Compré un dispositivo inteligente 
                            aquí y ha cambiado por completo la forma en que interactúo con la tecnología. ¡Definitivamente 
                            volveré por más!</p>
                    </div>
                </div>
                <div className="blog-post">
                    <figure><img src="./Img/representacion-experiencia-usuario-diseno-interfaz.jpg" alt="Imagen 3"/></figure>
                    <h3>Productos de Calidad Superior</h3>
                    <div className="content-container">
                        <div className="icon-container">
                            <div className="icon1"></div>
                            <div className="icon2"></div>
                            <div className="icon3"></div>
                        </div>
                        <p>No solo encontré el producto perfecto aquí, sino que también recibí un servicio al cliente excepcional.
                            El equipo fue muy amable y servicial, respondiendo todas mis preguntas y asegurándose de que tuviera 
                            una experiencia de compra perfecta. ¡Altamente recomendado!</p>
                    </div>
                </div>
            </div>    
        </section>        
    );
};

export default Comentarios;