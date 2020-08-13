<?php
    // Llamamos nuestro archivo de conexión a la base de datos
    include ('database.php');
    // Comprobamos si el form nos manda una tarea 
    if (isset($_POST['name'])) {
        // Creamos 2 variables para guardar los valores de los input del form
        $name = $_POST['name'];
        $description = $_POST['description'];
        // Construimos la consluta de mysql para poder insertar los datos en nuestra tabla
        $query = "INSERT INTO tasks (task_name, task_description) VALUES ('$name','$description')";
        // Ejecutamos la consulta y la guardamos en una variable
        $result = mysqli_query($connect, $query);
        // En caso de que no se ejecute la consulta detenemos la conexión con die() y mandamos un mensaje
        if (!$result) {
            die('La consulta falló. '.mysqli_error($connect));
        }
        // Si se ejecuta correctamente
        echo 'Tarea agregada exitosamente'; 
    }
?>