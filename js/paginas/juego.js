import { obtenerUsuarioActivo, obtenerNivel, guardarPartida } from '../servicios/almacen.js';
import { NIVELES, DURACION_PARTIDA, DURACION_CONGELAR_MS } from '../servicios/niveles.js';
import { crearPartida, golpear, desactivarBomba, haGanado } from '../servicios/partida.js';
import { crearTablero, tipoFigura, quitarFigura } from '../componentes/tablero.js';
import { iniciarGenerador } from '../componentes/generador.js';

const PAGINA_LOGIN = 'index.html';
const PAGINA_BIENVENIDA = 'bienvenida.html';
const PAGINA_RESULTADOS = 'resultados.html';
const INTERVALO_RELOJ_MS = 100;

const tablero = document.getElementById('tablero');
const textoTiempo = document.getElementById('tiempo');
const barraTiempo = document.getElementById('barraTiempo');
const textoPuntos = document.getElementById('puntos');
const textoNivel = document.getElementById('nivel');
const textoCongelar = document.getElementById('estadoCongelar');

function iniciarJuego(nivel) {
    const agujeros = crearTablero(tablero, nivel.lado);
    const partida = crearPartida(nivel);
    const inicio = performance.now();
    let congeladoHasta = 0;
    let terminada = false;

    const generador = iniciarGenerador(agujeros, nivel, () => congeladoHasta);
    const reloj = setInterval(actualizarReloj, INTERVALO_RELOJ_MS);

    textoNivel.textContent = nivel.nombre;
    mostrarPuntos();
    mostrarTiempo(DURACION_PARTIDA);

    function mostrarPuntos() {
        textoPuntos.textContent = `${partida.puntos} / ${partida.objetivo}`;
    }

    function mostrarTiempo(segundos) {
        textoTiempo.textContent = `${Math.ceil(segundos)} s`;
        barraTiempo.style.width = `${(segundos / DURACION_PARTIDA) * 100}%`;
    }

    function actualizarReloj() {
        const restante = DURACION_PARTIDA - (performance.now() - inicio) / 1000;
        if (restante <= 0) {
            mostrarTiempo(0);
            terminar('derrota');
        } else {
            mostrarTiempo(restante);
        }
    }

    // resultado: 'victoria' (objetivo alcanzado) o 'derrota' (se agotó el tiempo).
    function terminar(resultado) {
        if (terminada) return;
        terminada = true;
        generador.detener();
        clearInterval(reloj);

        const tiempoEmpleado = Math.min(DURACION_PARTIDA, (performance.now() - inicio) / 1000);
        guardarPartida({
            resultado,
            puntos: partida.puntos,
            objetivo: partida.objetivo,
            tiempoEmpleado: Math.round(tiempoEmpleado),
            tiempoRestante: Math.round(DURACION_PARTIDA - tiempoEmpleado),
            toposGolpeados: partida.toposGolpeados,
            bombasDesactivadas: partida.bombasDesactivadas
        });
        window.location.href = PAGINA_RESULTADOS;
    }

    // --- Eventos del juego ---

    // mousedown (botón izquierdo): golpear lo que haya en el agujero.
    function alPulsar(evento) {
        const agujero = evento.target.closest('.agujero');
        if (terminada || !agujero || evento.button !== 0) return;

        golpear(partida, tipoFigura(agujero));
        quitarFigura(agujero);
        mostrarPuntos();

        if (haGanado(partida)) terminar('victoria');
    }

    // contextmenu (clic derecho): desactivar una bomba, sin penalización.
    function alClicDerecho(evento) {
        evento.preventDefault();
        const agujero = evento.target.closest('.agujero');
        if (terminada || !agujero || tipoFigura(agujero) !== 'bomba') return;

        desactivarBomba(partida);
        quitarFigura(agujero);
    }

    // mouseover / mouseout: resaltar el agujero bajo el puntero.
    function alEntrar(evento) {
        const agujero = evento.target.closest('.agujero');
        if (agujero) agujero.classList.add('resaltado');
    }

    function alSalir(evento) {
        const agujero = evento.target.closest('.agujero');
        if (agujero) agujero.classList.remove('resaltado');
    }

    // keydown (barra espaciadora): congelar las figuras visibles, una vez por partida.
    function alPulsarTecla(evento) {
        if (evento.code !== 'Space') return;
        evento.preventDefault();
        if (terminada || partida.congeladoUsado) return;

        partida.congeladoUsado = true;
        congeladoHasta = performance.now() + DURACION_CONGELAR_MS;
        textoCongelar.textContent = 'activo';
        setTimeout(() => { textoCongelar.textContent = 'usado'; }, DURACION_CONGELAR_MS);
    }

    tablero.addEventListener('mousedown', alPulsar);
    tablero.addEventListener('contextmenu', alClicDerecho);
    tablero.addEventListener('mouseover', alEntrar);
    tablero.addEventListener('mouseout', alSalir);
    document.addEventListener('keydown', alPulsarTecla);
}

const nivel = NIVELES[obtenerNivel()];

// Sin sesión se vuelve al login; sin nivel elegido, a la bienvenida.
if (!obtenerUsuarioActivo()) {
    window.location.replace(PAGINA_LOGIN);
} else if (!nivel) {
    window.location.replace(PAGINA_BIENVENIDA);
} else {
    iniciarJuego(nivel);
}
