// ==========================================
// COMMIT 2: CONSUMO DE API DE TERCEROS (LIGERA Y DIRECTA)
// ==========================================

async function cargarJuegosExternos() {
    const contenedor = document.getElementById('api-terceros-container');
    if (!contenedor) return;
    
    // Indicador visual de carga
    contenedor.innerHTML = `
        <div class="col-span-full text-center text-indigo-400 py-8 animate-pulse">
            <i class="fa-solid fa-spinner fa-spin text-2xl mb-2"></i>
            <p class="text-xs font-mono">Consultando API pública de trivias de videojuegos...</p>
        </div>
    `;

    try {
        // API pública directa sin CORS ni proxies (Open Trivia DB - Categoría Videojuegos)
        const respuesta = await fetch('https://opentdb.com/api.php?amount=4&category=15&type=multiple');
        
        if (!respuesta.ok) throw new Error("Error en la respuesta del servidor");
        
        const datos = await respuesta.json();
        contenedor.innerHTML = ''; // Limpiamos el contenedor
        
        datos.results.forEach((item, index) => {
            // Decodificamos entidades HTML sencillas
            const pregunta = item.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&');
            const respuestaCorrecta = item.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'");

            contenedor.innerHTML += `
                <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 card-hover shadow-lg flex flex-col justify-between space-y-3">
                    <div>
                        <div class="flex items-center justify-between">
                            <span class="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-mono">Dificultad: ${item.difficulty.toUpperCase()}</span>
                            <span class="text-[10px] text-slate-500 font-mono">Pregunta #${index + 1}</span>
                        </div>
                        <h4 class="font-bold text-white text-sm mt-2.5 leading-snug">${pregunta}</h4>
                    </div>
                    <div class="pt-2 border-t border-slate-800/80">
                        <span class="text-[11px] text-slate-400 block mb-1">Respuesta Correcta:</span>
                        <div class="bg-slate-950 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-1.5 rounded-lg font-mono flex items-center gap-2">
                            <i class="fa-solid fa-circle-check"></i>
                            <span>${respuestaCorrecta}</span>
                        </div>
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