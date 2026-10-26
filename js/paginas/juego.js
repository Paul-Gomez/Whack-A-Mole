import { obtenerUsuarioActivo, obtenerNivel } from '../servicios/almacen.js';
import { NIVELES, DURACION_PARTIDA } from '../servicios/niveles.js';
import { crearTablero } from '../componentes/tablero.js';

const PAGINA_LOGIN = 'index.html';
const PAGINA_BIENVENIDA = 'bienvenida.html';

const tablero = document.getElementById('tablero');
const textoTiempo = document.getElementById('tiempo');
const textoPuntos = document.getElementById('puntos');
const textoNivel = document.getElementById('nivel');

function prepararPartida(nivel) {
    textoNivel.textContent = nivel.nombre;
    textoPuntos.textContent = `0 / ${nivel.objetivo}`;
    textoTiempo.textContent = `${DURACION_PARTIDA} s`;

    crearTablero(tablero, nivel.lado);
}

const nivel = NIVELES[obtenerNivel()];

// Sin sesión se vuelve al login; sin nivel elegido, a la bienvenida.
if (!obtenerUsuarioActivo()) {
    window.location.replace(PAGINA_LOGIN);
} else if (!nivel) {
    window.location.replace(PAGINA_BIENVENIDA);
} else {
    prepararPartida(nivel);
}
