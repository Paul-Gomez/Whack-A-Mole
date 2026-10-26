// Genera dinámicamente los agujeros del tablero.

export function crearTablero(contenedor, lado) {
    contenedor.style.setProperty('--lado', lado);
    contenedor.replaceChildren();

    const agujeros = [];

    for (let fila = 0; fila < lado; fila++) {
        for (let columna = 0; columna < lado; columna++) {
            const agujero = document.createElement('div');
            agujero.className = 'agujero';
            agujero.dataset.fila = fila;
            agujero.dataset.columna = columna;

            const tierra = document.createElement('div');
            tierra.className = 'tierra';
            agujero.appendChild(tierra);

            contenedor.appendChild(agujero);
            agujeros.push(agujero);
        }
    }

    return agujeros;
}

export function obtenerFigura(agujero) {
    return agujero.querySelector('.figura');
}

export function estaLibre(agujero) {
    return obtenerFigura(agujero) === null;
}

// Devuelve 'topo', 'topo-dorado', 'bomba' o null si el agujero está vacío.
export function tipoFigura(agujero) {
    const figura = obtenerFigura(agujero);
    return figura ? figura.dataset.tipo : null;
}

export function mostrarFigura(agujero, tipo) {
    const figura = document.createElement('span');
    figura.className = `figura ${tipo}`;
    figura.dataset.tipo = tipo;
    agujero.prepend(figura);
    return figura;
}

export function quitarFigura(agujero) {
    const figura = obtenerFigura(agujero);
    if (figura) figura.remove();
}
