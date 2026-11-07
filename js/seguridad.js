// ==========================================
// MÓDULO DE SEGURIDAD Y AUTENTICACIÓN UI
// ==========================================

function sanitizarHTML(cadenaTexto) {
    const divTemp = document.createElement('div');
    divTemp.textContent = cadenaTexto;
    return divTemp.innerHTML;
}

// Abrir o cerrar sesión desde el botón superior
function manejarBotonAuth() {
    const rolActual = localStorage.getItem('userRole') || 'Gamer_Guest';

    if (rolActual !== 'Gamer_Guest') {
        if (confirm("¿Deseas cerrar la sesión actual?")) {
            localStorage.setItem('userRole', 'Gamer_Guest');
            localStorage.removeItem('username');
            location.reload();
        }
    } else {
        abrirModalAuth();
    }
}

// Funciones del Modal
function abrirModalAuth() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('hidden');
}

function cerrarModalAuth() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('hidden');
}

function cambiarTab(tipo) {
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const btnLogin = document.getElementById('tab-login-btn');
    const btnRegister = document.getElementById('tab-register-btn');

    if (tipo === 'login') {
        formLogin.classList.remove('hidden');
        formRegister.classList.add('hidden');
        btnLogin.className = "flex-1 pb-3 text-sm font-bold text-indigo-400 border-b-2 border-indigo-500";
        btnRegister.className = "flex-1 pb-3 text-sm font-bold text-slate-400 border-b-2 border-transparent";
    } else {
        formLogin.classList.add('hidden');
        formRegister.classList.remove('hidden');
        btnLogin.className = "flex-1 pb-3 text-sm font-bold text-slate-400 border-b-2 border-transparent";
        btnRegister.className = "flex-1 pb-3 text-sm font-bold text-purple-400 border-b-2 border-purple-500";
    }
}

// Petición AJAX para Iniciar Sesión
async function ejecutarLogin(event) {
    event.preventDefault();
    const user = document.getElementById('login-user').value;
    const pass = document.getElementById('login-pass').value;

    try {
        const respuesta = await fetch('login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });
        const resultado = await respuesta.json();

        if (resultado.success) {
            localStorage.setItem('userRole', resultado.rol);
            localStorage.setItem('username', user);
            alert(`¡Bienvenido de nuevo, ${user}!`);
            location.reload();
        } else {
            alert(`Error: ${resultado.message}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor backend en XAMPP.");
    }
}

// Petición AJAX para Crear Cuenta
async function ejecutarRegistro(event) {
    event.preventDefault();
    const user = document.getElementById('reg-user').value;
    const pass = document.getElementById('reg-pass').value;

    try {
        const respuesta = await fetch('register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });
        const resultado = await respuesta.json();

        if (resultado.success) {
            alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
            cambiarTab('login');
        } else {
            alert(`Error: ${resultado.message}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor backend en XAMPP.");
    }
}