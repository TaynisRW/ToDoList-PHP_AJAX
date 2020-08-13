<?php
    // Llamamos nuestro archivo de conexión a la base de datos
    include('database.php');
    // Comprobamos si nos mandan un ID
    if (isset($_POST['id'])) {
        // Almacenamos el id que nos manden en una variable
        $id = $_POST['id'];
        $name = $_POST['name'];
        $description = $_POST['description'];
        // Hacemos la consulta que va a actualizar el dato que le pasemos
        $query = "UPDATE tasks SET task_name = '$name', task_description = '$description' WHERE id_task = '$id'";
        // Ejecutamos la consulta
        $result = mysqli_query($connect, $query);  
        // En caso de que no se ejecute la consulta detenemos la conexión con die() y mandamos un mensaje
        if (!$result) {
            die('La consulta falló. '.mysqli_error($connect));
        }
        // Si se ejecuta correctamente
        echo 'Tarea editada exitosamente';   
    }
?>