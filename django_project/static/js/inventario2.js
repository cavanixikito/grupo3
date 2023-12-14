function ValidateForm() {
    let codigo = document.getElementById("inputCodigo2").value;
    let nombre = document.getElementById("inputProducto2").value;
    let categoria = document.getElementById("inputCategoria2").value;
    let cantidad = document.getElementById("inputCantidad2").value;
    let fecha = document.getElementById("inputFecha2").value;
    let imagen = document.getElementById("inputImagen2").value;

    if (codigo === "") {
        alert("El campo codigo del producto es requerido");
        return false;
    }
    if (nombre === "") {
        alert("El campo nombre del producto es requerido");
        return false;
    }
    if (categoria === "") {
        alert("El campo categoría es requerido");
        return false;
    }
    if (cantidad === "") {
        alert("El campo cantidad es requerido");
        return false;
    }
    if (fecha === "") {
        alert("El campo fecha es requerido");
        return false;
    }
 
    return true;
}

function ReadData2() {
    let listProduct2;

    if (localStorage.getItem('listProduct2') === null) {
        listProduct2 = [];
    } else {
        listProduct2 = JSON.parse(localStorage.getItem('listProduct2'));
    }
    var html = "";
    listProduct2.forEach(function (element, index) {
        html += "<tr>";
          // Agregar la imagen en una celda de la tabla
        html += "<td><img src='" + element.imagen + "' width='100' height='100'></td>";
        html += "<td>" + element.codigo + "</td>";
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.categoria + "</td>";
        html += "<td>" + element.cantidad + "</td>";
        html += "<td>" + element.fecha + "</td>";
        html += '<td><button onclick="deleteData2(' + index + ')" class="btn btn-danger">Eliminar datos</button><button onclick="editData(' + index + ')" class="btn btn-warning">Editar datos</button></td>';
        html += "</tr>";
    });
    document.querySelector('#tableData2 tbody').innerHTML = html;
}

function AddData2() {
    if (ValidateForm() === true) {
        let codigo = document.getElementById("inputCodigo2").value;
        let nombre = document.getElementById("inputProducto2").value;
        let categoria = document.getElementById("inputCategoria2").value;
        let cantidad = document.getElementById("inputCantidad2").value;
        let fecha = document.getElementById("inputFecha2").value;
          // Obtener la imagen cargada
        let imagenInput = document.getElementById("inputImagen2");
        let imagenUrl = "";
        if (imagenInput.files.length > 0) {
              let imagenFile = imagenInput.files[0];
              // Generar una URL local para la imagen
              imagenUrl = URL.createObjectURL(imagenFile);
        }


        var listProduct2;
        if (localStorage.getItem('listProduct2') === null) {
            listProduct2 = [];
        } else {
            listProduct2 = JSON.parse(localStorage.getItem('listProduct2'));
        }
        listProduct2.push({
            codigo:codigo,
            nombre: nombre,
            categoria: categoria,
            cantidad: cantidad,
            fecha:fecha,
            imagen:imagenUrl
        });
        localStorage.setItem('listProduct2', JSON.stringify(listProduct2));
        ReadData2();
        document.getElementById('inputCodigo2').value = "";
        document.getElementById('inputProducto2').value = "";
        document.getElementById('inputCategoria2').value = "";
        document.getElementById('inputCantidad2').value = "";
        document.getElementById('inputFecha2').value = "";
        document.getElementById('inputImagen2').value = "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    ReadData2();
});

function deleteData2(index) {
    let listProduct2 = [];

    // Obtenemos la lista de productos del almacenamiento local si existe
    if (localStorage.getItem('listProduct2')) {
        listProduct2 = JSON.parse(localStorage.getItem('listProduct2'));
    }

    // Verificamos si el índice es válido
    if (index >= 0 && index < listProduct2.length) {
        // Eliminamos el elemento en el índice especificado
        listProduct2.splice(index, 1);

        // Actualizamos la lista de productos en el almacenamiento local
        localStorage.setItem('listProduct2', JSON.stringify(listProduct2));

        // Volvemos a cargar los datos en la tabla
        ReadData2();
    }
}

function editData(index) {
    // Ocultar el botón de añadir y mostrar el botón de actualizar
    document.getElementById('btnAdd2').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';
    
    let listProduct2;
    if (localStorage.getItem('listProduct2') === null) {
        listProduct2 = [];
    } else {
        listProduct2 = JSON.parse(localStorage.getItem('listProduct2'));
    }
    document.getElementById('inputCodigo2').value = listProduct2[index].codigo;
    document.getElementById('inputProducto2').value = listProduct2[index].nombre;
    document.getElementById('inputCategoria2').value = listProduct2[index].categoria;
    document.getElementById('inputCantidad2').value = listProduct2[index].cantidad;
    document.getElementById('inputFecha2').value = listProduct2[index].fecha;

    // No establezcas el valor del campo de imagen aquí

    document.querySelector('#btnUpdate').onclick = function () {
        if (ValidateForm() === true) {
            listProduct2[index].codigo = document.getElementById('inputCodigo2').value;
            listProduct2[index].nombre = document.getElementById('inputProducto2').value;
            listProduct2[index].categoria = document.getElementById('inputCategoria2').value;
            listProduct2[index].cantidad = document.getElementById('inputCantidad2').value;
            listProduct2[index].fecha = document.getElementById('inputFecha2').value;

            // Mantén la lógica existente para cargar una nueva imagen si es necesario
            let imagenInput = document.getElementById("inputImagen2");
            if (imagenInput.files.length > 0) {
                let imagenFile = imagenInput.files[0];
                listProduct2[index].imagen = URL.createObjectURL(imagenFile);
            }

            localStorage.setItem('listProduct2', JSON.stringify(listProduct2));
            ReadData2();
            document.getElementById('inputCodigo2').value = "";
            document.getElementById('inputProducto2').value = "";
            document.getElementById('inputCategoria2').value = "";
            document.getElementById('inputCantidad2').value = "";
            document.getElementById('inputFecha2').value = "";
            // No es necesario establecer el valor del campo de imagen aquí

            // Ocultar el botón de actualizar y mostrar el botón de añadir nuevamente
            document.getElementById('btnAdd2').style.display = 'block';
            document.getElementById('btnUpdate').style.display = 'none';
        }
    }
}


