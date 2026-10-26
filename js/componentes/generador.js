// Hace aparecer topos, topos dorados y bombas en agujeros libres del tablero.
import { PROB_DORADO, FACTOR_TIEMPO_DORADO } from '../servicios/niveles.js';
import { estaLibre, mostrarFigura, quitarFigura } from './tablero.js';

const ESPERA_MIN_MS = 150;
const ESPERA_MAX_MS = 500;

function aleatorio(min, max) {
    return min + Math.random() * (max - min);
}

function elegirTipo(probBomba) {
    if (Math.random() < probBomba) return 'bomba';
    return Math.random() < PROB_DORADO ? 'topo-dorado' : 'topo';
}

// congeladoHasta es una función que devuelve el instante (performance.now) hasta el que
// las figuras visibles no se esconden.
export function iniciarGenerador(agujeros, nivel, congeladoHasta) {
    let activo = true;
    const temporizadores = new Set();

    function programar(accion, ms) {
        const id = setTimeout(() => {
            temporizadores.delete(id);
            if (activo) accion();
        }, ms);
        temporizadores.add(id);
    }

    function esconderTras(agujero, figura, ms) {
        programar(() => {
            if (figura.parentNode !== agujero) return; // ya golpeada o desactivada

            const esperaCongelado = congeladoHasta() - performance.now();
            if (esperaCongelado > 0) {
                esconderTras(agujero, figura, esperaCongelado);
                return;
            }
            quitarFigura(agujero);
        }, ms);
    }

    function aparecer(agujero) {
        const tipo = elegirTipo(nivel.probBomba);
        const figura = mostrarFigura(agujero, tipo);
        const visibleMs = tipo === 'topo-dorado'
            ? nivel.tiempoVisibleMs * FACTOR_TIEMPO_DORADO
            : nivel.tiempoVisibleMs;
        esconderTras(agujero, figura, visibleMs);
    }

    function turno() {
        const libres = agujeros.filter(estaLibre);
        const visibles = agujeros.length - libres.length;

        if (visibles < nivel.simultaneos && libres.length > 0) {
            aparecer(libres[Math.floor(Math.random() * libres.length)]);
        }
        programar(turno, aleatorio(ESPERA_MIN_MS, ESPERA_MAX_MS));
    }

    turno();

    return {
        detener() {
            activo = false;
            temporizadores.forEach(clearTimeout);
            temporizadores.clear();
        }
    };
}
