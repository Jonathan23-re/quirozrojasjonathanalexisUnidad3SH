let bibliotecaPersonal = JSON.parse(localStorage.getItem('misJuegos')) || [
    { id: 1, titulo: "Resident Evil 4 Remake", plataforma: "Xbox Series S", estado: "Completado" },
    { id: 2, titulo: "Genshin Impact", plataforma: "PC", estado: "Jugando" }
];

// READ: Muestra la lista actualizada en el HTML
function renderizarCRUD() {
    const lista = document.getElementById('crud-lista');
    if (!lista) return;

    lista.innerHTML = '';
    
    if (bibliotecaPersonal.length === 0) {
        lista.innerHTML = `<p class="text-xs text-slate-500 text-center py-6">No hay juegos registrados en tu biblioteca personal.</p>`;
        return;
    }

    bibliotecaPersonal.forEach((juego) => {
        lista.innerHTML += `
            <div class="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs">
                <div>
                    <strong class="text-white text-sm block">${juego.titulo}</strong>
                    <div class="text-slate-400 mt-1 flex gap-3">
                        <span><i class="fa-solid fa-gamepad text-indigo-400 mr-1"></i> ${juego.plataforma}</span>
                        <span><i class="fa-solid fa-circle-info text-emerald-400 mr-1"></i> ${juego.estado}</span>
                    </div>
                </div>
                <button onclick="eliminarJuego(${juego.id})" class="text-red-400 hover:text-red-300 p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg border border-red-500/30 transition">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });
}

// CREATE: Agrega un nuevo registro sanitizado
function agregarJuego(event) {
    event.preventDefault();
    
    const tituloInput = document.getElementById('input-titulo');
    const plataformaInput = document.getElementById('input-plataforma');
    const estadoInput = document.getElementById('input-estado');

    if (!tituloInput.value.trim() || !plataformaInput.value.trim()) {
        alert("Por favor completa los campos del juego.");
        return;
    }

    // Usamos la función de sanitización del Commit 4 antes de guardar
    const nuevoJuego = {
        id: Date.now(),
        titulo: typeof sanitizarHTML === 'function' ? sanitizarHTML(tituloInput.value) : tituloInput.value,
        plataforma: typeof sanitizarHTML === 'function' ? sanitizarHTML(plataformaInput.value) : plataformaInput.value,
        estado: estadoInput.value
    };

    bibliotecaPersonal.push(nuevoJuego);
    localStorage.setItem('misJuegos', JSON.stringify(bibliotecaPersonal));
    
    // Limpiar formulario y re-renderizar
    tituloInput.value = '';
    plataformaInput.value = '';
    renderizarCRUD();
}

// DELETE: Elimina un registro por su ID
function eliminarJuego(id) {
    bibliotecaPersonal = bibliotecaPersonal.filter(juego => juego.id !== id);
    localStorage.setItem('misJuegos', JSON.stringify(bibliotecaPersonal));
    renderizarCRUD();
}