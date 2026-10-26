// Configuración de la partida: se define aquí una sola vez y la usan Bienvenida, Juego y Resultados.

export const DURACION_PARTIDA = 30; // segundos

export const NIVELES = {
    principiante: {
        nombre: 'Principiante',
        lado: 3,               // tablero de lado × lado
        simultaneos: 1,        // elementos visibles a la vez
        tiempoVisibleMs: 1200,
        probBomba: 0,
        objetivo: 10
    },
    intermedio: {
        nombre: 'Intermedio',
        lado: 4,
        simultaneos: 2,
        tiempoVisibleMs: 900,
        probBomba: 0.15,
        objetivo: 20
    },
    avanzado: {
        nombre: 'Avanzado',
        lado: 5,
        simultaneos: 3,
        tiempoVisibleMs: 600,
        probBomba: 0.25,
        objetivo: 30
    }
};

export const NIVEL_POR_DEFECTO = 'principiante';

export function describirNivel(clave) {
    const n = NIVELES[clave];
    const plural = n.simultaneos === 1 ? 'topo' : 'topos';
    return `${n.nombre}: tablero ${n.lado}×${n.lado} · ${n.simultaneos} ${plural} a la vez · ${n.objetivo} puntos para ganar`;
}
