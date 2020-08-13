$(document).ready(function(){
    // Esta variable ayudará al programa a saber cuando tiene que editar y cuando tiene que agregar datos
    let edit = false;
    // Ocultamos por defecto nuestro elemento HTML para mostrar la búsqueda
    $('#task-result').hide();
    // Mandamos a llamar a la función para obtener las tareas
    obtenerTareas();
    // Capturamos con una función lo que el usuario escriba en el input search con el método .keyup()
    $('#search').keyup(function (e) { 
        // Validamos si el input search no está vacio
        if ($('#search').val()) {
            // Obtenemos el valor del input con .val() y lo almacenamos en una variable
            let taskSearch = $('#search').val();
            // Hacemos la peticion de envio al servidor por medio de AJAX
            $.ajax({
                type: "POST",
                url: "php/task-search.php",
                data: {taskSearch},
                // En caso de que haga la peticion con exito ejecutamos success
                success: function (response) {
                    // Convertimos a JSON el string obtenido de la búsqueda
                    let tasksJSON = JSON.parse(response);
                    console.log(tasksJSON);
                    // Creamos una plantilla para poder mostrarla en pantalla
                    let template = '';
                    // Recorremos el objeto para poder llenar nuestra plantilla con un elemento HTML que tenga como valor la tarea buscada
                    tasksJSON.forEach(task => {
                        // Hacemos uso de un backtick(comillas invertidas) para poder escribir en multiples lineas nuestra plantilla HTML que queremos llenar
                        template += `<li>
                            ${task.name}
                        </li>`
                    });
                    $('#task-container').html(template);
                    $('#task-result').show();
                }
            });
        }
        else{
            $('#task-result').hide();
        }
    });
    // Seleccionamos el formulario de envio por medio de su ID y capturamos su evento submit()
    $('#task-form').submit(function (e) { 
        // preventDefault() Cancela el evento por defecto de un formulario, lo que evita que la página se recargue automátcamente, lo que nos da el control para decidir que hacer con el evento 
        e.preventDefault();
        // Creamos una variable que almacene en un objeto los valores de los input
        const postData = {
            id: $('#taskID').val(),
            name: $('#taskName').val(),
            description: $('#taskDescription').val()
        };
        // Con esta variable hacemos que la URL a la que accede el form sea dinámica
        let url = edit === false ? 'php/task-add.php' : 'php/task-edit.php';
        // Enviamos los datos del objeto por medio del método post("URL", "DATA", function)
        $.post(url, postData, function (response) {
            // Mostramos el resultado por consola
            console.log(response);
            // Mandamos a llamar a la funcion obtenerTareas() para que nos muestre las nuevas tareas agregadas sin necesidad de recargar la página
            obtenerTareas();
            // Una vez ejecutado el proceso debemos limpiar el formulario para agregar una nueva tarea
            $('#task-form').trigger('reset');
        });
    });
    function obtenerTareas(){
        // Vamos a pedir los datos de nuestra base de datos para que se muestren en nuestra tabla de HTML
        $.ajax({
            type: "GET",
            url: "php/task-list.php",
            success: function (response) {
                // Convertimos el string a objeto JSON
                let taskList = JSON.parse(response);
                // Creamos nuestra variable para almacenar nuestro template
                let template = '';
                // Creamos una variable para agregar un contador a nuesta tabla
                let i = 1;
                // Recorremos cada dato del objeto JSON para llenar nustra plantilla
                taskList.forEach(task =>{
                    template +=`
                        <tr taskID="${task.id}">
                            <td>${i++}</td>
                            <td>
                                <a href="#" class="task-item">${task.name}</a>
                            </td>
                            <td>${task.description}</td>
                            <td>
                                <button class="btn btn-sm btn-danger task-delete">X</button>
                            </td>
                        </tr>
                    `
                });
                // Seleccionamos nuestro elemneto de HTML donde queremos pintar nustra plantilla
                $('#tableTasks').html(template);
            }
        });
    }
    // Preparamos al documento para poder escuchar un evento click y podamos eliminar el elemento seleccionado con la clase task-delete
    $(document).on('click','.task-delete',function () {
        if (confirm('¿Estás seguro que deseas eliminar esta tarea?')) {
            // Obtenemos el elemento en el que hayamos desatado el evento click con el método parentElement
            let element = $(this)[0].parentElement.parentElement;
            // Seleccionamos el ID del elemento buscando un atributo en especial
            let id = $(element).attr('taskID');
            // Mandamos el ID obtenido a nuestro servidor para que lo elimine
            $.post("php/task-delete.php", {id},function (response) {
                console.log(response);
                // Mandamos a llamar a nuesta funcion obtenerTareas() para que actualice nuestra tabla de forma automática
                obtenerTareas();
            });
        }
    });
    // Preparamos al documento para poder escuchar un evento click y podamos editar el elemento seleccionado con la clase task-item
    $(document).on('click','.task-item',function () {
        // Obtenemos el elemento en el que hayamos desatado el evento click con el método parentElement
        let element = $(this)[0].parentElement.parentElement;
        // Seleccionamos el ID del elemento buscando un atributo en especial
        let id = $(element).attr('taskID');
        // Mandamos el ID obtenido a nuestro servidor para poder obtener el dato seleccionado
        $.post("php/task-single.php", {id},function (response) {
            const taskUpdate = JSON.parse(response);
            $('#taskID').val(taskUpdate.id);
            $('#taskName').val(taskUpdate.name);
            $('#taskDescription').val(taskUpdate.description);
            edit = true;
        });
    });
});

