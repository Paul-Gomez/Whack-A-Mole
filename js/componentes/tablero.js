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
