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

const btnCart = document.querySelector('.cart');
const containerCartProducts = document.querySelector('.container-cart-products');

console.log(btnCart);
console.log(containerCartProducts);

btnCart.addEventListener('click', () => {
    console.log('Botón del carrito clickeado');
    console.log('Clase actual de containerCartProducts:', containerCartProducts.classList);
    containerCartProducts.classList.toggle('hidden-cart');
    console.log('Clase actual de containerCartProducts después de toggle:', containerCartProducts.classList);
})