function sanitizarHTML(cadenaTexto) {
    const divTemp = document.createElement('div');
    divTemp.textContent = cadenaTexto;
    return divTemp.innerHTML;
}

/**
 * Control de acceso por Roles (Invitado vs Administrador)
 */
function verificarAccesoAdmin() {
    const rolActual = localStorage.getItem('userRole') || 'Gamer_Guest';
    
    if (rolActual === 'Admin') {
        alert("Autenticación válida. Sesión activa con permisos de Administrador.");
    } else {
        const password = prompt("Ingrese la contraseña de Administrador (Prueba: admin123):");
        if (password === "admin123") {
            localStorage.setItem('userRole', 'Admin');
            alert("¡Acceso concedido! Ahora estás en modo Administrador.");
            location.reload();
        } else {
            alert("Acceso denegado. Contraseña incorrecta.");
        }
    }
}