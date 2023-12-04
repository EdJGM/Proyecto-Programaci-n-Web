<?php
    if($_SERVER['REQUEST_METHOD'] == 'GET') {
        echo "<hr>";
        echo "<h2>METODO GET </h2>";
        echo "<strong>Nombre registrado: </strong>".$_GET['name']."<br>";
        echo "<strong>Apellido registrado: </strong>".$_GET["lastname"]."<br>";
        echo "<strong>Fecha registrada: </strong>".$_GET["date"]."<br>";
        echo "<strong>Email registrado: </strong>".$_GET["email"]."<br>";
        echo "<strong>Contrasena registrada: </strong>".$_GET["password"]."<br>";
    }
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        echo "<hr>";
        echo "<h2>METODO POST </h2>";
        $numero1 = $_POST['number1'];
        $numero2 = $_POST['number2'];        
        echo "<strong>Numero 1: </strong>".$_POST['number1']."<br>";
        echo "<strong>Numero 2: </strong>".$_POST["number2"]."<br>";
        echo "Numeros aleatorios entre [".$numero1." , ".$numero2. "]: <br>";
        for ($i = 0; $i < 10; $i++) {
            echo rand($numero1,$numero2)."<br>";
        }
    }
    else {
        echo "<hr>";
        echo "<h2>METODO NO VALIDO </h2>";
    }
?>