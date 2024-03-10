<?php

@include 'config.php';

$id = $_GET['edit'];

if(isset($_POST['update_product'])){

   $producto_nombre = $_POST['producto_nombre'];
   $producto_descripcion = $_POST['producto_descripcion'];
   $producto_precio = $_POST['producto_precio'];
   $producto_categoria = $_POST['producto_categoria'];
   $producto_activo = $_POST['producto_activo'];
   $producto_imagen = $_FILES['producto_imagen']['name'];
   $producto_imagen_tmp_nombre = $_FILES['producto_imagen']['tmp_name'];
   $producto_imagen_folder = '../proyectreact/public/Img/productos/'.$id.'/';
   $producto_imagen_path = $producto_imagen_folder . 'principal.png';

   // Crear el directorio si no existe
   if (!file_exists($producto_imagen_folder)) {
      mkdir($producto_imagen_folder, 0777, true);
   }

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

      $stmt = $conn->prepare("UPDATE productos SET nombreP = ?, descripcionP = ?, precioP = ?, idCategoria = ?, activo = ? WHERE idProducto = ?");
      $stmt->bind_param("ssdiii", $producto_nombre, $producto_descripcion, $producto_precio, $producto_categoria, $producto_activo, $id);

      if (move_uploaded_file($producto_imagen_tmp_nombre, $producto_imagen_path)) {
         $stmt = $conn->prepare("UPDATE productos SET nombreP = ?, descripcionP = ?, precioP = ?, idCategoria = ?, activo = ? WHERE idProducto = ?");
         $stmt->bind_param("ssdiii", $producto_nombre, $producto_descripcion, $producto_precio, $producto_categoria, $producto_activo, $id);

         if ($stmt->execute()) {
            $message[] = 'Producto actualizado exitosamente!';
         } else {
            $message[] = 'No se pudo actualizar el producto!';
         }
      } else {
         $message[] = 'No se pudo subir la imagen del producto!';
      }

      $stmt->close();

   }
};

?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="stylesheet" href="css/style.css">
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


<div class="admin-product-form-container centered">

   <?php
      
      $select = mysqli_query($conn, "SELECT * FROM productos WHERE idProducto = '$id'");
      while($row = mysqli_fetch_assoc($select)){

   ?>
   
   <form action="" method="post" enctype="multipart/form-data">
      <h3 class="title">Actualizar Producto</h3>
         <input type="text" placeholder="Ingresa el nombre del producto" value="<?php echo $row['nombreP']; ?>" name="producto_nombre" class="box">
         <input type="text" placeholder="Ingresa la descripcion del producto" value="<?php echo $row['descripcionP']; ?>" name="producto_descripcion" class="box">
         <input type="number" placeholder="Ingresa el precio del producto" value="<?php echo $row['precioP']; ?>" name="producto_precio" class="box">
         <input type="number" placeholder="Ingresa la categoria del producto" value="<?php echo $row['idCategoria']; ?>" name="producto_categoria" class="box">
         <input type="number" placeholder="Ingresa el estado del producto" value="<?php echo $row['activo']; ?>" name="producto_activo" class="box">
         <input type="file" accept="image/png, image/jpeg, image/jpg" name="producto_imagen" class="box">
         <input type="submit" value="update product" name="update_product" class="btn">
         <a href="admin_page.php" class="btn">Atras!</a>
   </form>
   


   <?php }; ?>

   

</div>

</div>

</body>
</html>