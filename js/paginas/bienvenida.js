import { obtenerUsuarioActivo, guardarNivel, obtenerNivel } from '../servicios/almacen.js';
import { NIVEL_POR_DEFECTO, describirNivel } from '../servicios/niveles.js';

const PAGINA_LOGIN = 'index.html';
const PAGINA_JUEGO = 'juego.html';

const usuario = obtenerUsuarioActivo();

// Sin sesión iniciada no se puede entrar en la aplicación.
if (!usuario) {
    window.location.replace(PAGINA_LOGIN);
}

const nombreUsuario = document.getElementById('nombreUsuario');
const selectorNivel = document.getElementById('nivel');
const descripcionNivel = document.getElementById('descripcionNivel');
const botonJugar = document.getElementById('botonJugar');

function actualizarDescripcion() {
    descripcionNivel.textContent = describirNivel(selectorNivel.value);
}

function empezarJuego() {
    guardarNivel(selectorNivel.value);
    window.location.href = PAGINA_JUEGO;
}

nombreUsuario.textContent = usuario;
// Si se vuelve desde Resultados, se recuerda el último nivel elegido.
selectorNivel.value = obtenerNivel() || NIVEL_POR_DEFECTO;
actualizarDescripcion();

selectorNivel.addEventListener('change', actualizarDescripcion);
botonJugar.addEventListener('click', empezarJuego);
