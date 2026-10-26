import { cargarJSON } from '../servicios/cargar-datos.js';
import { guardarUsuarios, obtenerUsuarios, guardarUsuarioActivo } from '../servicios/almacen.js';
import { esAlfanumerico } from '../utilidades/validacion.js';

const RUTA_USUARIOS = './data/usuarios.json';
const PAGINA_BIENVENIDA = 'bienvenida.html';

const formulario = document.getElementById('formLogin');
const campoUsuario = document.getElementById('usuario');
const campoContrasena = document.getElementById('contrasena');
const mensajeError = document.getElementById('mensajeError');

// Los usuarios del fichero JSON se guardan en localStorage al cargar la página.
cargarJSON(RUTA_USUARIOS, usuarios => {
    guardarUsuarios(usuarios);
});

function mostrarError(texto, campo) {
    mensajeError.textContent = texto;
    campoUsuario.classList.remove('invalido');
    campoContrasena.classList.remove('invalido');
    if (campo) campo.classList.add('invalido');
}

function validarFormulario(evento) {
    evento.preventDefault();

    const usuario = campoUsuario.value.trim();
    const contrasena = campoContrasena.value;

    if (usuario === '' || contrasena === '') {
        mostrarError('Rellena el usuario y la contraseña.');
        return;
    }

    if (!esAlfanumerico(contrasena)) {
        mostrarError('La contraseña solo admite letras y números.', campoContrasena);
        return;
    }

    const usuarios = obtenerUsuarios();

    // Pasa si el fichero aún no se ha cargado o la página se abrió sin servidor web (fetch falla).
    if (usuarios.length === 0) {
        mostrarError('No se han podido cargar los usuarios. Abre la aplicación desde un servidor web local.');
        return;
    }

    const encontrado = usuarios.find(u => u.usuario === usuario && u['contraseña'] === contrasena);

    if (!encontrado) {
        mostrarError('Usuario o contraseña incorrectos.', campoUsuario);
        return;
    }

    guardarUsuarioActivo(encontrado.usuario);
    window.location.href = PAGINA_BIENVENIDA;
}

formulario.addEventListener('submit', validarFormulario);
