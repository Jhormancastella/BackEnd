// Función para obtener los Arbitros desde localStorage
function obtenerArbitros() {
    const arbitros = localStorage.getItem("arbitros");
    return arbitros ? JSON.parse(arbitros) : [];
}

// Función para guardar los arbitros en localStorage
function guardarArbitros(arbitros) {
    localStorage.setItem("arbitros", JSON.stringify(arbitros));
}

// Función para mostrar los arbitros registrados
function mostrarArbitros() {
    const arbitros = obtenerArbitros();
    const listaArbitros = document.getElementById("listaArbitros");
    listaArbitros.innerHTML = "";
    arbitros.forEach(arbitro => {
        listaArbitros.innerHTML += `
            <p>Nombre: ${arbitro.nombre_completo}, Fecha de Nacimiento: ${arbitro.fecha_nacimiento}, Documento: ${arbitro.documento_identidad}
                <button onclick="editarArbitro(${arbitro.arbitro_id})">Editar</button>
                <button onclick="eliminarArbitro(${arbitro.arbitro_id})">Eliminar</button>
            </p>
        `;
    });
}

// Función para registrar un nuevo arbitro
function registrarArbitro(e) {
    e.preventDefault();

    const arbitroId = document.getElementById("arbitro_id").value;

    // Si existe un arbitroId, estamos editando, de lo contrario estamos registrando uno nuevo
    if (arbitroId) {
        actualizarArbitro(arbitroId);
    } else {
        agregarNuevoArbitro();
    }
}

// Función para agregar un nuevo arbitro
function agregarNuevoArbitro() {
    const nuevoArbitro = {
        arbitro_id: generarIdUnico(),
        nombre_completo: document.getElementById("nombre_completo").value,
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
        documento_identidad: document.getElementById("documento_identidad").value,
        telefono: document.getElementById("telefono").value,
        direccion_residencia: document.getElementById("direccion_residencia").value,
        categoria: document.getElementById("categoria").value,
        foto: document.getElementById("foto").value
    };

    const arbitros = obtenerArbitros();
    arbitros.push(nuevoArbitro);
    guardarArbitros(arbitros);
    mostrarArbitros();
    document.getElementById("formularioArbitros").reset();
}

// Función para generar un ID único para cada arbitro
function generarIdUnico() {
    const arbitros = obtenerArbitros();
    return arbitros.length ? arbitros[arbitros.length - 1].arbitro_id + 1 : 1;
}

// Función para editar un arbitro existente
function editarArbitro(id) {
    const arbitros = obtenerArbitros();
    const arbitro = arbitros.find(a => a.arbitro_id === id);

    if (arbitro) {
        // Rellenar el formulario con los datos del arbitro a editar
        document.getElementById("arbitro_id").value = arbitro.arbitro_id;
        document.getElementById("nombre_completo").value = arbitro.nombre_completo;
        document.getElementById("fecha_nacimiento").value = arbitro.fecha_nacimiento;
        document.getElementById("documento_identidad").value = arbitro.documento_identidad;
        document.getElementById("telefono").value = arbitro.telefono;
        document.getElementById("direccion_residencia").value = arbitro.direccion_residencia;
        document.getElementById("categoria").value = arbitro.categoria;
        document.getElementById("foto").value = arbitro.foto;
    }
}

// Función para actualizar los datos de un arbitro
function actualizarArbitro(id) {
    const arbitros = obtenerArbitros();
    const arbitroIndex = arbitros.findIndex(a => a.arbitro_id === parseInt(id));

    if (arbitroIndex !== -1) {
        arbitros[arbitroIndex] = {
            arbitro_id: parseInt(id),
            nombre_completo: document.getElementById("nombre_completo").value,
            fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
            documento_identidad: document.getElementById("documento_identidad").value,
            telefono: document.getElementById("telefono").value,
            direccion_residencia: document.getElementById("direccion_residencia").value,
            categoria: document.getElementById("categoria").value,
            foto: document.getElementById("foto").value
        };
        guardarArbitros(arbitros);
        mostrarArbitros();
        document.getElementById("formularioArbitros").reset();
    }
}

// Función para eliminar un arbitro
function eliminarArbitro(id) {
    const arbitros = obtenerArbitros();
    const arbitrosFiltrados = arbitros.filter(a => a.arbitro_id !== id);
    guardarArbitros(arbitrosFiltrados);
    mostrarArbitros();
}

// Inicializar el formulario y mostrar los arbitros
document.getElementById("formularioArbitros").addEventListener("submit", registrarArbitro);
mostrarArbitros();
