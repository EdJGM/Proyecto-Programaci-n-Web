const nombre = document.getElementById('name');
const resumen = document.getElementById('summary');
const review = document.getElementById('review');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let warnings = '';
    let entrar = false;
    let regex = /^[A-Za-z\s]+$/; // Expresión regular que solo permite letras y espacios
    errorElement.innerHTML = "";
    if(nombre.value.length < 3 || !regex.test(nombre.value)){
        warnings += `El nombre es muy corto o contiene caracteres no permitidos <br>`;
        entrar = true;
    }
    if (resumen.value.length < 6 || !regex.test(resumen.value)){
        warnings += `El resumen es muy corto o contiene caracteres no permitidos <br>`;
        entrar = true;
    }
    if (resumen.value.length > 100){
        warnings += `El resumen es demasiado largo <br>`;
        entrar = true;
    }
    if (review.value.length < 6 || !regex.test(review.value)){
        warnings += `La reseña es muy corta o contiene caracteres no permitidos <br>`;
        entrar = true;
    }
    if (review.value.length > 100){
        warnings += `La reseña es demasiado larga <br>`;
        entrar = true;
    }

    if(entrar){
        errorElement.innerHTML = warnings;
    } else{
        errorElement.innerHTML = 'Enviado';
    }
});