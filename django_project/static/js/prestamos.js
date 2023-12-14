function buscarTabla() {
    const input = document.getElementById("busqueda");
    const filtro = input.value.toUpperCase();
    const tabla = document.getElementById("tabla-maquinaria");
    const filas = tabla.getElementsByTagName("tr");

    // Comienza desde la segunda fila (índice 1) para omitir la cabecera
    for (let i = 1; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName("td");
        let mostrarFila = false;

        for (let j = 0; j < celdas.length; j++) {
            const textoCelda = celdas[j].textContent || celdas[j].innerText;

            if (textoCelda.toUpperCase().indexOf(filtro) > -1) {
                mostrarFila = true;
                break;
            }
        }

        filas[i].style.display = mostrarFila ? "" : "none";
    }
}
function filtrarPorTipo() {
    const tipoSeleccionado = document.getElementById("tipo").value;
    const tablaMaquinaria = document.querySelector("table");
    const filas = tablaMaquinaria.querySelectorAll("tbody tr");

    filas.forEach((fila) => {
        const estadoFila = fila.getAttribute("data-estado"); // Cambiar "data-tipo" a "data-estado"
        if (tipoSeleccionado === "todos" || tipoSeleccionado === estadoFila) {
            fila.style.display = "table-row";
        } else {
            fila.style.display = "none";
        }
    });
}