<?php
    // Llamamos nuestro archivo de conexión a la base de datos
    include('database.php');
    // Capturamos la variable que nos manda el método AJAX en una variable
    $search = $_POST['taskSearch'];
    // Validamos la variable
    if (!empty($search)) {
        // Creamos la consulta de mysql para buscar el dato dentro de nuestra tabla tasks
        $query = "SELECT * FROM tasks WHERE task_name LIKE '$search%'";
        //  En una variable guardamos la ejecucion de nuestra consulta que nos da la fucnión mysqli_query()pasando como argumento nuestra variable de conexión y la variable de nuestra consulta
        $result = mysqli_query($connect, $query);
        // Validamos si no obtenemos una respuesta de nuestra base de datos
        if (!$result) {
            // Con la función die() cerramos la conexión a nuestra base de datos y concatenamos el error que nos haya podido salir con mysqli_error()
            die('Query Error'.mysqli_error($connect));
        }
        // Si obtenemos un resultado empezamos a recorrerlo transformando la información a JSON
        $json = array();
        // mysqli_fetch_array() transforma el resultado en un arreglo para poder recorrerlo
        while ($row = mysqli_fetch_array($result)) {
            // Empezamos a llenar el arreglo json con los datos de nuestra tabla indicando a cada dato su respectiva fila (row) y la posición que esta ocupa agrendando el nombre que tiene en nuestra base de datos
            $json[] = array(
                'id' => $row['id_task'],
                'name' => $row['task_name'],
                'description' => $row['task_description']
            );
        }
        // El arreglo obtenido lo guardamos en formato de string
        $jsString = json_encode($json);
        echo($jsString);
    }
    
?>