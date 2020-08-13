<?php
    // Llamamos nuestro archivo de conexión a la base de datos
    include('database.php');
    // Comprobamos si nos mandan un ID
    if (isset($_POST['id'])) {
        // Almacenamos el id que nos manden en una variable
        $id = $_POST['id'];
        // Hacemos la consulta que va a eliminar el dato que le pasemos
        $query = "DELETE FROM tasks WHERE id_task= $id";
        // Ejecutamos la consulta
        $result = mysqli_query($connect, $query);  
        // En caso de que no se ejecute la consulta detenemos la conexión con die() y mandamos un mensaje
        if (!$result) {
            die('La consulta falló. '.mysqli_error($connect));
        }
        // Si se ejecuta correctamente
        echo 'Tarea eliminada exitosamente';  
    }
?>