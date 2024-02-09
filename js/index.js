// Agregar evento scroll a la ventana
window.onscroll = function () { myFunction() };

// Referencias a los elementos del DOM
const header = document.getElementById('myHeader');
const btnCart = document.querySelector('.cart-icon');
const conatinerCartProducts = document.querySelector('.container-cart-products');
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productList = document.querySelectorAll('.hot-deals-table');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

// Variable para almacenar los productos
let allProducts = [];

// Función para agregar productos al carrito
function addProductToCart(product) {
  const exist = allProducts.some(p => p.title === product.title);
  if (exist) {
    const products = allProducts.map(p => {
      if (p.title === product.title) {
        p.quatify++;
        return p;
      } else {
        return p;
      }
    });
    allProducts = [...products];
  } else {
    allProducts = [...allProducts, product];
  }
}


// Función para mostrar los productos en el carrito
function showHtml() {
  if (!allProducts.length) {
    cartEmpty.classList.remove('hidden');
    rowProduct.classList.add('hidden');
    cartTotal.classList.add('hidden');
  } else {
    cartEmpty.classList.add('hidden');
    rowProduct.classList.remove('hidden');
    cartTotal.classList.remove('hidden');
  }

  // Limpiar HTML
  rowProduct.innerHTML = '';

  let total = 0;
  let totalOfProducts = 0;

  allProducts.forEach(product => {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add('cart-product');

    containerProduct.innerHTML = `
      <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.quatify}</span>
        <p class="titulo-producto-carrito">${product.title}</p>
        <span class="precio-producto-carrito">${product.price}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="icon-close"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    `;

    rowProduct.appendChild(containerProduct);

    total = total + parseInt(product.price.slice(1) * product.quatify);
    totalOfProducts = totalOfProducts + product.quatify;
  });

  valorTotal.innerText = `$${total}`;
  countProducts.innerText = totalOfProducts;
}

// Función para manejar el clic en los productos
function handleProductClick(e) {
  if (e.target.classList.contains('add-to-cart-button')) {
    const product = e.target.parentElement;

    const infoProduct = {
      quatify: 1,
      title: product.querySelector('h3').textContent,
      price: product.querySelector('.price').textContent
    };

    addProductToCart(infoProduct);
    showHtml();
  }
}

// Función para manejar el clic en el icono de cerrar de los productos en el carrito
function handleCloseIconClick(e) {
  if (e.target.classList.contains('icon-close')) {
    const product = e.target.parentElement;
    const title = product.querySelector('p').textContent;

    allProducts = allProducts.filter(product => product.title !== title);

    showHtml();
  }
}

// Agregar eventos a los elementos del DOM
header.offsetTop;
btnCart.addEventListener('click', () => {
  conatinerCartProducts.classList.toggle('hidden-cart');
});

productList.forEach(product => {
  product.addEventListener('click', handleProductClick);
});

rowProduct.addEventListener('click', handleCloseIconClick);

// Función para manejar el scroll de la ventana
function myFunction() {
  if (window.pageYOffset > header.offsetTop) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}