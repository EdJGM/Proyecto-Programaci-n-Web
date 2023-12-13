<?php session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
// Formulario de Registro
    if (isset($_POST['name']) && isset($_POST['lastname']) && 
        isset($_POST['date']) && isset($_POST['email']) && 
        isset($_POST['password'])) {
        $nombre = $_POST['name'];
        $apellido = $_POST['lastname'];
        $fechaNacimiento = $_POST['date'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        echo '<h2>Datos recibidos del Registro</h2>';
        echo '<table border="1">';
            echo '<tr>';
                echo '<th>Nombre</th>';
                echo '<th>Apellido</th>';
                echo '<th>Fecha de Nacimiento</th>';
                echo '<th>Email</th>';
                echo '<th>Contraseña</th>';
            echo '</tr>';
            echo '<tr>';
                echo '<td>'.$nombre.'</td>';
                echo '<td>'.$apellido.'</td>';
                echo '<td>'.$fechaNacimiento.'</td>';
                echo '<td>'.$email.'</td>';
                echo '<td>'.$password.'</td>';
            echo '</tr>';
        echo '</table>';

    }

    // Formulario de Inicio de Sesión
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $nombreUsuario = $_POST['username'];
        $contrasena = $_POST['password'];
        echo '<h2>Datos recibidos del LogIn</h2>';
        echo '<table border="1">';
            echo '<tr>';
                echo '<th>Nombre de Usuario</th>';
                echo '<th>Contraseña</th>';
            echo '</tr>';
            echo '<tr>';
                echo '<td>'.$nombreUsuario.'</td>';
                echo '<td>'.$contrasena.'</td>';
            echo '</tr>';
        echo '</table>';
        echo '<br>';
        // Verificar las credenciales (¡NO usar en producción!)
        if ($nombreUsuario === 'usuario' && $contrasena === 'contrasena') {
            // Redirigir o realizar acciones después del inicio de sesión exitoso
            header('Location: PaginaLogin.html');
            exit();
        } else {
            echo "Login failed. Please check your credentials.";
        }        
    }
}
?>
