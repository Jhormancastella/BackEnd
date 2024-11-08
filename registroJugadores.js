// Función para obtener los jugadores desde localStorage
function obtenerJugadores() {
    const jugadores = localStorage.getItem("jugadores");
    return jugadores ? JSON.parse(jugadores) : [];
}

// Función para guardar los jugadores en localStorage
function guardarJugadores(jugadores) {
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
}

// Función para mostrar los jugadores registrados
function mostrarJugadores() {
    const jugadores = obtenerJugadores();
    const listaJugadores = document.getElementById("listaJugadores");
    listaJugadores.innerHTML = "";
    jugadores.forEach(jugador => {
        listaJugadores.innerHTML += `
            <p>Nombre: ${jugador.nombre_completo}, Equipo: ${jugador.equipo}, Posición: ${jugador.posicion} 
                <button onclick="editarJugador(${jugador.jugador_id})">Editar</button>
                <button onclick="eliminarJugador(${jugador.jugador_id})">Eliminar</button>
            </p>
        `;
    });
}

// Función para registrar un nuevo jugador
function registrarJugador(e) {
    e.preventDefault();

    const jugadorId = document.getElementById("jugador_id").value;
    
    // Si existe un jugadorId, estamos editando, de lo contrario estamos registrando uno nuevo
    if (jugadorId) {
        actualizarJugador(jugadorId);
    } else {
        agregarNuevoJugador();
    }
}

// Función para agregar un nuevo jugador
function agregarNuevoJugador() {
    const nuevoJugador = {
        jugador_id: generarIdUnico(),
        nombre_completo: document.getElementById("nombre_completo").value,
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
        documento_identidad: document.getElementById("documento_identidad").value,
        telefono: document.getElementById("telefono").value,
        direccion_residencia: document.getElementById("direccion_residencia").value,
        equipo: document.getElementById("equipo").value,
        posicion: document.getElementById("posicion").value,
        representante: {
            nombre: document.getElementById("representante_nombre").value,
            telefono: document.getElementById("representante_telefono").value
        },
        foto: document.getElementById("foto").value
    };

    const jugadores = obtenerJugadores();
    jugadores.push(nuevoJugador);
    guardarJugadores(jugadores);
    mostrarJugadores();
    document.getElementById("formularioJugador").reset();
}

// Función para generar un ID único para cada jugador
function generarIdUnico() {
    const jugadores = obtenerJugadores();
    return jugadores.length ? jugadores[jugadores.length - 1].jugador_id + 1 : 1;
}

// Función para editar un jugador existente
function editarJugador(id) {
    const jugadores = obtenerJugadores();
    const jugador = jugadores.find(j => j.jugador_id === id);
    
    if (jugador) {
        // Rellenar el formulario con los datos del jugador a editar
        document.getElementById("jugador_id").value = jugador.jugador_id;
        document.getElementById("nombre_completo").value = jugador.nombre_completo;
        document.getElementById("fecha_nacimiento").value = jugador.fecha_nacimiento;
        document.getElementById("documento_identidad").value = jugador.documento_identidad;
        document.getElementById("telefono").value = jugador.telefono;
        document.getElementById("direccion_residencia").value = jugador.direccion_residencia;
        document.getElementById("equipo").value = jugador.equipo;
        document.getElementById("posicion").value = jugador.posicion;
        document.getElementById("representante_nombre").value = jugador.representante.nombre;
        document.getElementById("representante_telefono").value = jugador.representante.telefono;
        document.getElementById("foto").value = jugador.foto;
    }
}

// Función para actualizar los datos de un jugador
function actualizarJugador(id) {
    const jugadores = obtenerJugadores();
    const jugadorIndex = jugadores.findIndex(j => j.jugador_id === parseInt(id));

    if (jugadorIndex !== -1) {
        jugadores[jugadorIndex] = {
            jugador_id: parseInt(id),
            nombre_completo: document.getElementById("nombre_completo").value,
            fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
            documento_identidad: document.getElementById("documento_identidad").value,
            telefono: document.getElementById("telefono").value,
            direccion_residencia: document.getElementById("direccion_residencia").value,
            equipo: document.getElementById("equipo").value,
            posicion: document.getElementById("posicion").value,
            representante: {
                nombre: document.getElementById("representante_nombre").value,
                telefono: document.getElementById("representante_telefono").value
            },
            foto: document.getElementById("foto").value
        };
        guardarJugadores(jugadores);
        mostrarJugadores();
        document.getElementById("formularioJugador").reset();
    }
}

// Función para eliminar un jugador
function eliminarJugador(id) {
    const jugadores = obtenerJugadores();
    const jugadoresFiltrados = jugadores.filter(j => j.jugador_id !== id);
    guardarJugadores(jugadoresFiltrados);
    mostrarJugadores();
}

// Inicializar el formulario y mostrar los jugadores
document.getElementById("formularioJugador").addEventListener("submit", registrarJugador);
mostrarJugadores();

