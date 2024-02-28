document.addEventListener('DOMContentLoaded', function() {
    // Agregar clase active al primer item
    document.querySelectorAll('.hot-deals-list .category_item[category="all"]').forEach(function(item) {
        item.classList.add('ct_item_active');
    });   

    // Filtrar productos
    document.querySelectorAll('.category_item').forEach(function(item) {
        item.addEventListener('click', function() {
            var catProduct = this.getAttribute('category');

            // Agregar clase active al item seleccionado y removerla del anterior
            document.querySelectorAll('.category_item').forEach(function(item) {
                item.classList.remove('ct_item_active');
            });
            this.classList.add('ct_item_active');

            // Ocultar todos los productos
            function hideProducts(){    
                document.querySelectorAll('.product-info').forEach(function(item) {
                    item.style.position = 'fixed';
                    item.style.transform = 'scale(0)';
                });
            } 

            hideProducts();

            // Mostrar productos correspondientes a la categoría seleccionada
            function showProducts(){
                document.querySelectorAll('.product-info[category="'+catProduct+'"]').forEach(function(item) {
                    item.style.position = 'static'; // Vuelve a la posición estática
                    item.style.transform = 'scale(1)';
                });
            }
            setTimeout(showProducts, 100); // Mostrar productos después de ocultarlos
        });
    });

    // Cuando se selecciona la categoría "all", muestra todos los productos
    document.querySelector('.category_item[category="all"]').addEventListener('click', function() {
        function showAllProducts(){
            document.querySelectorAll('.product-info').forEach(function(item) {
                item.style.position = 'static'; // Vuelve a la posición estática
                item.style.transform = 'scale(1)';
            });
        }
        setTimeout(showAllProducts, 100);
    });
});
