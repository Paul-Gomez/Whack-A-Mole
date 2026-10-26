import { obtenerUsuarioActivo, obtenerNivel, obtenerPartida, borrarPartida, cerrarSesion } from '../servicios/almacen.js';
import { NIVELES } from '../servicios/niveles.js';

const PAGINA_LOGIN = 'index.html';
const PAGINA_BIENVENIDA = 'bienvenida.html';

const titular = document.getElementById('titularResultado');
const motivo = document.getElementById('motivoResultado');
const botonJugarDeNuevo = document.getElementById('botonJugarDeNuevo');
const botonSalir = document.getElementById('botonSalir');

function mostrarResultado(partida, nivel) {
    const ganada = partida.resultado === 'victoria';

    titular.textContent = ganada ? '¡Has ganado!' : '¡Has perdido!';
    titular.classList.add(ganada ? 'victoria' : 'derrota');
    motivo.textContent = ganada
        ? `Has alcanzado los ${partida.objetivo} puntos antes de que se acabara el tiempo.`
        : 'Se acabó el tiempo.';

    document.getElementById('puntos').textContent = `${partida.puntos} / ${partida.objetivo}`;
    document.getElementById('tiempo').textContent = `${partida.tiempoEmpleado} s`;
    document.getElementById('topos').textContent = partida.toposGolpeados;
    document.getElementById('bombas').textContent = partida.bombasDesactivadas;
    document.getElementById('nivel').textContent = nivel.nombre;
}

function jugarDeNuevo() {
    borrarPartida();
    window.location.href = PAGINA_BIENVENIDA;
}

function salir() {
    cerrarSesion();
    window.location.href = PAGINA_LOGIN;
}

const partida = obtenerPartida();
const nivel = NIVELES[obtenerNivel()];

// Sin sesión se vuelve al login; sin partida terminada, a la bienvenida.
if (!obtenerUsuarioActivo()) {
    window.location.replace(PAGINA_LOGIN);
} else if (!partida || !nivel) {
    window.location.replace(PAGINA_BIENVENIDA);
} else {
    mostrarResultado(partida, nivel);
    botonJugarDeNuevo.addEventListener('click', jugarDeNuevo);
    botonSalir.addEventListener('click', salir);
}
