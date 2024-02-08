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

/*==========================*/

const btnCart = document.querySelector('.cart-icon');
const conatinerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
  conatinerCartProducts.classList.toggle('hidden-cart');
})

/*==============================*/

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

//Lista de todos los contenedores de productos
const productList = document.querySelectorAll('.hot-deals-table');

//variable de arreglo de productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');//valor total a pagar

const countProducts = document.querySelector('#contador-productos');//contador de productos seleccionados

const cartEmpty = document.querySelector('.cart-empty');//mensaje de carrito vacio
const cartTotal = document.querySelector('.cart-total');//total a pagar


productList.forEach((product) => {
  product.addEventListener('click', e => {
    if(e.target.classList.contains('add-to-cart-button')){
      const product = e.target.parentElement;

      const infoProduct = {
        quatify: 1,
        title: product.querySelector('h3').textContent,
        price: product.querySelector('.price').textContent
      }

      const exist = allProducts.some(product => product.title === infoProduct.title);//verificar si el producto ya esta en el carrito
      if(exist){
        const products = allProducts.map(product => {//si el producto ya esta en el carrito, aumentar la cantidad
          if(product.title === infoProduct.title){
            product.quatify++; 
            return product;
          }else{
            return product;
          }
        });
        allProducts = [...products];
      }else{
        allProducts = [...allProducts, infoProduct];//agregar productos al arreglo de productos seleccionados en el carrito
      }

      showHtml();//llamar a la funcion para mostrar los productos seleccionados en el carrito
    }
  });
});

rowProduct.addEventListener('click', e => {
  if(e.target.classList.contains('icon-close')){
    const product = e.target.parentElement;
    const title = product.querySelector('p').textContent;

    allProducts = allProducts.filter(product => product.title !== title);

    showHtml();
  }
})


// Funcion para mostrar HTML de productos seleccionados
const showHtml = () => {

  if(!allProducts.length){
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

  //limpiar Html
  rowProduct.innerHTML = '';

  let total= 0;//total a pagar
  let totalOfProducts = 0;//cantidad de productos seleccionados

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
          class="icon-close">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    `

    rowProduct.appendChild(containerProduct);

    total  = total + parseInt(product.price.slice(1) * product.quatify);
    totalOfProducts = totalOfProducts + product.quatify;
  });

  valorTotal.innerText = `$${total}`
  countProducts.innerText = totalOfProducts;
}