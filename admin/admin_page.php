<?php

@include 'config.php';

function deleteFolder($folderPath) {
    if (is_dir($folderPath)) {
        $files = array_diff(scandir($folderPath), array('.','..'));
        foreach ($files as $file) {
            (is_dir("$folderPath/$file")) ? deleteFolder("$folderPath/$file") : unlink("$folderPath/$file");
        }
        return rmdir($folderPath);
    }
    return false;
}

if(isset($_POST['add_product'])){

   $producto_nombre = $_POST['producto_nombre'];
   $producto_descripcion = $_POST['producto_descripcion'];
   $producto_precio = $_POST['producto_precio'];
   $producto_categoria = $_POST['producto_categoria'];
   $producto_activo = $_POST['producto_activo'];
   $producto_imagen = $_FILES['producto_imagen']['name'];
   $producto_imagen_tmp_nombre = $_FILES['producto_imagen']['tmp_name'];
   $producto_imagen_folder = '../proyectreact/public/Img/productos/'.$producto_imagen;

   if(empty($producto_nombre) || empty($producto_precio) || empty($producto_descripcion) || empty($producto_imagen) || empty($producto_categoria) || empty($producto_activo)){
      $message[] = 'Porfavor llena todos los campos!';
   }else if (!is_numeric($producto_precio) || $producto_precio < 0) {
   $message[] = 'El precio del producto debe ser un número positivo!';
   } else if (strlen($producto_descripcion) > 500) {
      $message[] = 'La descripción del producto no puede tener más de 500 caracteres!';
   } else if (!in_array($producto_categoria, [1, 2, 3, 4, 5])) { // Reemplaza [1, 2, 3, 4, 5] con las categorías válidas
      $message[] = 'La categoría del producto no es válida!';
   } else if (!in_array($producto_activo, [0, 1])) {
      $message[] = 'El estado del producto debe ser 0 (inactivo) o 1 (activo)!';
   } else{
      $stmt = $conn->prepare("INSERT INTO productos(nombreP, descripcionP, precioP, idCategoria, activo) VALUES(?, ?, ?, ?, ?)");
      $stmt->bind_param("ssdis", $producto_nombre, $producto_descripcion, $producto_precio, $producto_categoria, $producto_activo);

      if ($stmt->execute()) {
         $producto_id = $stmt->insert_id;

         $producto_folder = '../proyectreact/public/Img/productos/' . $producto_id;
         if(!file_exists($producto_folder)){
            mkdir($producto_folder, 0777, true);
         }

         $producto_imagen_folder = $producto_folder . '/principal.png';
         if (move_uploaded_file($producto_imagen_tmp_nombre, $producto_imagen_folder)) {
            $message[] = 'Producto agregado exitosamente!';
         } else {
            $message[] = 'No se pudo subir la imagen del producto!';
         }
      } else {
         $message[] = 'No se pudo agregar el producto!';
      }

      $stmt->close();
   }

};

if(isset($_GET['delete'])){
   $id = $_GET['delete'];
   mysqli_query($conn, "DELETE FROM productos WHERE idProducto = $id");
   
   $producto_folder = '../proyectreact/public/Img/productos/' . $id;
   deleteFolder($producto_folder);

   header('location:admin_page.php');
};

?>


<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Admin Global Store </title>

   <!-- font awesome cdn link  -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

   <!-- custom css file link  -->
   <link rel="stylesheet" href="./css/style.css">

</head>
<body>

<?php

if(isset($message)){
   foreach($message as $message){
      echo '<span class="message">'.$message.'</span>';
   }
}

?>
   
<div class="container">

   <div class="admin-product-form-container">

      <form action="<?php $_SERVER['PHP_SELF'] ?>" method="post" enctype="multipart/form-data">
         <h3>PRODUCTOS</h3>
         <input type="text" placeholder="Ingresa el nombre del producto" name="producto_nombre" class="box">
         <input type="text" placeholder="Ingresa la descripcion del producto" name="producto_descripcion" class="box">
         <input type="number" placeholder="Ingresa el precio del producto" name="producto_precio" class="box">
         <input type="number" placeholder="Ingresa la categoria del producto" name="producto_categoria" class="box">
         <input type="number" placeholder="Ingresa el estado del producto" name="producto_activo" class="box">
         <input type="file" accept="image/png, image/jpeg, image/jpg" name="producto_imagen" class="box">
         <input type="submit" class="btn" name="add_product" value="add product">
      </form>

   </div>

   <?php

   $select = mysqli_query($conn, "SELECT * FROM productos");
   
   ?>
   <div class="product-display">
      <table class="product-display-table">
         <thead>
         <tr>
            <th>Imagen Producto</th>
            <th>Nombre Producto</th>
            <th>Descripcion  Producto</th>
            <th>Precio Producto</th>
            <th>Categoria Producto</th>
            <th>Activo Producto</th>
            <th>accion</th>
         </tr>
         </thead>
         <?php while($row = mysqli_fetch_assoc($select)){ ?>
         <tr>
            <td>
               <?php
               $producto_imagen_folder = '../proyectreact/public/Img/productos/' . $row['idProducto'] . '/' . 'principal.png';
               $producto_imagen_url = '../proyectreact/public/Img/productos/' . $row['idProducto'] . '/' . 'principal.png';
               if (file_exists($producto_imagen_folder)) {
                  echo '<img src="'.$producto_imagen_url.'" alt="imagen producto" style=height:100px;>' ;
               } else {
                  echo 'Image not found';
               }
               ?>
            </td>
            <td><?= $row["nombreP"] ?></td>
            <td><?= $row["descripcionP"] ?></td>
            <td>$<?= number_format($row["precioP"], 2) ?></td>
            <td><?= $row["idCategoria"] ?></td>
            <!-- Mostrar si esta activo o no -->
            <?php if ($row["activo"] == 1) { ?>
               <td>Activo</td>
            <?php } else{ ?>
               <td>Inactivo</td>
            <?php }?>
            <td>
               <a href="admin_update.php?edit=<?php echo $row['idProducto']; ?>" class="btn"> <i class="fas fa-edit"></i> editar </a>
               <a href="admin_page.php?delete=<?php echo $row['idProducto']; ?>" class="btn"> <i class="fas fa-trash"></i> eliminar </a>
            </td>
         </tr>
      <?php } ?>
      </table>
   </div>

</div>


</body>
</html>