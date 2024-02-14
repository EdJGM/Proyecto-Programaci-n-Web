window.onscroll = function() {myFunction()};

var header = document.getElementById('myHeader');

var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function mostrarHora() {
  const fecha = new Date();
  let horas = String(fecha.getHours()).padStart(2, '0');
  let minutos = String(fecha.getMinutes()).padStart(2, '0');
  let segundos = String(fecha.getSeconds()).padStart(2, '0');
  let reloj = document.getElementById('reloj');
  reloj.textContent = `${horas}:${minutos}:${segundos}`;
}

setInterval(mostrarHora, 1000);



