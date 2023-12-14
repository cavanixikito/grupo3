function ValidateForm() {
    let codigo = document.getElementById("inputCodigo").value;
    let nombre = document.getElementById("inputProducto").value;
    let categoria = document.getElementById("inputCategoria").value;
    let cantidad = document.getElementById("inputCantidad").value;
    let fecha = document.getElementById("inputFecha").value;
    let imagen = document.getElementById("inputImagen").value;

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

function ReadData() {
    let listProduct;

    if (localStorage.getItem('listProduct') === null) {
        listProduct = [];
    } else {
        listProduct = JSON.parse(localStorage.getItem('listProduct'));
    }
    var html = "";
    listProduct.forEach(function (element, index) {
        html += "<tr>";
          // Agregar la imagen en una celda de la tabla
        html += "<td><img src='" + element.imagen + "' width='100' height='100'></td>";
        html += "<td>" + element.codigo + "</td>";
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.categoria + "</td>";
        html += "<td>" + element.cantidad + "</td>";
        html += "<td>" + element.fecha + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Eliminar datos</button><button onclick="editData(' + index + ')" class="btn btn-warning">Editar datos</button></td>';
        html += "</tr>";
    });
    document.querySelector('#tableData tbody').innerHTML = html;
}

function AddData() {
    if (ValidateForm() === true) {
        let codigo = document.getElementById("inputCodigo").value;
        let nombre = document.getElementById("inputProducto").value;
        let categoria = document.getElementById("inputCategoria").value;
        let cantidad = document.getElementById("inputCantidad").value;
        let fecha = document.getElementById("inputFecha").value;
          // Obtener la imagen cargada
        let imagenInput = document.getElementById("inputImagen");
        let imagenUrl = "";
        if (imagenInput.files.length > 0) {
              let imagenFile = imagenInput.files[0];
              // Generar una URL local para la imagen
              imagenUrl = URL.createObjectURL(imagenFile);
        }


        var listProduct;
        if (localStorage.getItem('listProduct') === null) {
            listProduct = [];
        } else {
            listProduct = JSON.parse(localStorage.getItem('listProduct'));
        }
        listProduct.push({
            codigo:codigo,
            nombre: nombre,
            categoria: categoria,
            cantidad: cantidad,
            fecha:fecha,
            imagen:imagenUrl
        });
        localStorage.setItem('listProduct', JSON.stringify(listProduct));
        ReadData();
        document.getElementById('inputCodigo').value = "";
        document.getElementById('inputProducto').value = "";
        document.getElementById('inputCategoria').value = "";
        document.getElementById('inputCantidad').value = "";
        document.getElementById('inputFecha').value = "";
        document.getElementById('inputImagen').value = "";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    ReadData();
});

function deleteData(index) {
    let listProduct = [];

    // Obtenemos la lista de productos del almacenamiento local si existe
    if (localStorage.getItem('listProduct')) {
        listProduct = JSON.parse(localStorage.getItem('listProduct'));
    }

    // Verificamos si el índice es válido
    if (index >= 0 && index < listProduct.length) {
        // Eliminamos el elemento en el índice especificado
        listProduct.splice(index, 1);

        // Actualizamos la lista de productos en el almacenamiento local
        localStorage.setItem('listProduct', JSON.stringify(listProduct));

        // Volvemos a cargar los datos en la tabla
        ReadData();
    }
}
function editData(index) {
    // Ocultar el botón de añadir y mostrar el botón de actualizar
    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';

    let listProduct;
    if (localStorage.getItem('listProduct') === null) {
        listProduct = [];
    } else {
        listProduct = JSON.parse(localStorage.getItem('listProduct'));
    }
    document.getElementById('inputCodigo').value = listProduct[index].codigo;
    document.getElementById('inputProducto').value = listProduct[index].nombre;
    document.getElementById('inputCategoria').value = listProduct[index].categoria;
    document.getElementById('inputCantidad').value = listProduct[index].cantidad;
    document.getElementById('inputFecha').value = listProduct[index].fecha;

    // No establezcas el valor del campo de imagen aquí

    document.querySelector('#btnUpdate').onclick = function () {
        if (ValidateForm() === true) {
            listProduct[index].codigo = document.getElementById('inputCodigo').value;
            listProduct[index].nombre = document.getElementById('inputProducto').value;
            listProduct[index].categoria = document.getElementById('inputCategoria').value;
            listProduct[index].cantidad = document.getElementById('inputCantidad').value;
            listProduct[index].fecha = document.getElementById('inputFecha').value;

            // Mantén la lógica existente para cargar una nueva imagen si es necesario
            let imagenInput = document.getElementById("inputImagen");
            if (imagenInput.files.length > 0) {
                let imagenFile = imagenInput.files[0];
                listProduct[index].imagen = URL.createObjectURL(imagenFile);
            }

            localStorage.setItem('listProduct', JSON.stringify(listProduct));
            ReadData();
            document.getElementById('inputCodigo').value = "";
            document.getElementById('inputProducto').value = "";
            document.getElementById('inputCategoria').value = "";
            document.getElementById('inputCantidad').value = "";
            document.getElementById('inputFecha').value = "";
            // No es necesario establecer el valor del campo de imagen aquí

            // Ocultar el botón de actualizar y mostrar el botón de añadir nuevamente
            document.getElementById('btnAdd').style.display = 'block';
            document.getElementById('btnUpdate').style.display = 'none';
        }
    }
}

