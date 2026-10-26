// Acceso a Web Storage: el resto de la aplicación no toca localStorage/sessionStorage directamente.

const CLAVE_USUARIOS = 'usuarios';
const CLAVE_USUARIO_ACTIVO = 'usuarioActivo';

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
