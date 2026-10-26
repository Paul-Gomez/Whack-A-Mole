// Estado y reglas de puntuación de una partida (sin tocar el DOM).
import { PUNTOS } from './niveles.js';

export function crearPartida(nivel) {
    return {
        puntos: 0,
        objetivo: nivel.objetivo,
        toposGolpeados: 0,
        bombasDesactivadas: 0,
        congeladoUsado: false
    };
}

// tipo = null significa que se ha pulsado un agujero vacío.
export function golpear(partida, tipo) {
    const variacion = PUNTOS[tipo ?? 'vacio'];
    partida.puntos = Math.max(0, partida.puntos + variacion);

    if (tipo === 'topo' || tipo === 'topo-dorado') {
        partida.toposGolpeados++;
    }
}

export function desactivarBomba(partida) {
    partida.bombasDesactivadas++;
}

export function haGanado(partida) {
    return partida.puntos >= partida.objetivo;
}
