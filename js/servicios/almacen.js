// Acceso a Web Storage: el resto de la aplicación no toca localStorage/sessionStorage directamente.
//
// localStorage:   usuarios cargados desde usuarios.json.
// sessionStorage: usuario activo, nivel elegido y resultado de la última partida.

const CLAVE_USUARIOS = 'usuarios';
const CLAVE_USUARIO_ACTIVO = 'usuarioActivo';
const CLAVE_NIVEL = 'nivel';
const CLAVE_PARTIDA = 'partida';

export function guardarUsuarios(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

export function obtenerUsuarios() {
    const guardados = localStorage.getItem(CLAVE_USUARIOS);
    return guardados ? JSON.parse(guardados) : [];
}

export function guardarUsuarioActivo(usuario) {
    sessionStorage.setItem(CLAVE_USUARIO_ACTIVO, usuario);
}

export function obtenerUsuarioActivo() {
    return sessionStorage.getItem(CLAVE_USUARIO_ACTIVO);
}

export function guardarNivel(nivel) {
    sessionStorage.setItem(CLAVE_NIVEL, nivel);
}

export function obtenerNivel() {
    return sessionStorage.getItem(CLAVE_NIVEL);
}

// datos: { resultado, puntos, objetivo, tiempoEmpleado, tiempoRestante, toposGolpeados, bombasDesactivadas }
export function guardarPartida(datos) {
    sessionStorage.setItem(CLAVE_PARTIDA, JSON.stringify(datos));
}

export function obtenerPartida() {
    const guardada = sessionStorage.getItem(CLAVE_PARTIDA);
    return guardada ? JSON.parse(guardada) : null;
}

export function borrarPartida() {
    sessionStorage.removeItem(CLAVE_PARTIDA);
}

// Al salir se borra todo lo de la sesión; los usuarios de localStorage se conservan.
export function cerrarSesion() {
    sessionStorage.clear();
}
