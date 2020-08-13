<?php
    // Llamamos nuestro archivo de conexión a la base de datos
    include('database.php');
    // Comprobamos si nos mandan un ID
    if (isset($_POST['id'])) {
        // Almacenamos el id que nos manden en una variable
        $id = $_POST['id'];
        // Hacemos la consulta que va a mostrar el dato que le pasemos
        $query = "SELECT * FROM tasks WHERE id_task= $id";
        // Ejecutamos la consulta
        $result = mysqli_query($connect, $query);  
        // En caso de que no se ejecute la consulta detenemos la conexión con die() y mandamos un mensaje
        if (!$result) {
            die('La consulta falló. '.mysqli_error($connect));
        }  
    }
    // Creamos una variable de tipo arreglo para poder almacenar nustros datos en ella
    $json = array();
    // Transformamos los datos en un arreglo para poder recorrerlo 
    while ($row = mysqli_fetch_array($result)) {
        // Generamos multiples objetos a partir de nustra tabla en MySQL
        $json[] = array(
            'id' => $row['id_task'],
            'name' => $row['task_name'],
            'description' => $row['task_description']
        );
    }
    // Codificamos a string nuestra variable a JSON
    $jsonString = json_encode($json[0]);
    echo $jsonString;
?>