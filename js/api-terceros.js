async function cargarJuegosExternos() {
    const contenedor = document.getElementById('api-terceros-container');
    if (!contenedor) return;
    
    // Indicador visual de carga (Spinner)
    contenedor.innerHTML = `
        <div class="col-span-full text-center text-indigo-400 py-10 animate-pulse">
            <i class="fa-solid fa-spinner fa-spin text-3xl mb-2"></i>
            <p class="text-xs font-mono">Conectando con la API externa de FreeToGame...</p>
        </div>
    `;

    try {
        // Petición HTTP GET mediante Fetch API usando un proxy CORS seguro para web
        const respuesta = await fetch('https://corsproxy.io/?https://www.freetogame.com/api/games?sort=popularity');
        
        if (!respuesta.ok) throw new Error("Error en la respuesta del servidor");
        
        const datos = await respuesta.json();
        
        // Seleccionamos los primeros 6 juegos del catálogo devuelto
        const juegos = datos.slice(0, 6);
        
        contenedor.innerHTML = ''; // Limpiamos el contenedor
        
        juegos.forEach(juego => {
            contenedor.innerHTML += `
                <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden card-hover shadow-lg flex flex-col justify-between">
                    <div>
                        <img src="${juego.thumbnail}" alt="${juego.title}" class="w-full h-40 object-cover">
                        <div class="p-4">
                            <span class="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-mono">${juego.genre}</span>
                            <h4 class="font-bold text-white text-base mt-2">${juego.title}</h4>
                            <p class="text-xs text-slate-400 mt-1 line-clamp-2">${juego.short_description}</p>
                        </div>
                    </div>
                    <div class="p-4 pt-0">
                        <a href="${juego.game_url}" target="_blank" class="block text-center bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-bold py-2 rounded-lg transition border border-indigo-500/40">
                            Ver Detalles <i class="fa-solid fa-external-link-alt ml-1"></i>
                        </a>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error al cargar la API:", error);
        contenedor.innerHTML = `
            <div class="col-span-full text-center text-red-400 text-xs py-6 border border-red-500/20 bg-red-500/10 rounded-xl">
                <i class="fa-solid fa-triangle-exclamation text-lg mb-1"></i>
                <p>No se pudo conectar con el servicio web de terceros.</p>
            </div>
        `;
    }
}