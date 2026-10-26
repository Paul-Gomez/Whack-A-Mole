# Roadmap · Whac-A-Mole (DWEC03 · TE2)

Se avanza paso a paso. Cada paso se prueba antes de pasar al siguiente. Marca con `[x]` lo terminado.

## Fase 0 · Base del proyecto
- [x] Estructura de carpetas (`css/`, `data/`, `js/servicios`, `js/utilidades`, `js/paginas`).
- [x] `usuarios.json` y `cargar-datos.js` (sin modificar) copiados de los recursos.
- [x] Hoja de estilos compartida (`css/estilos.css`) con la paleta de los wireframes.
- [ ] Decidir/confirmar la arquitectura de la UD anterior y con el profesor el formato de entrega.

## Fase 1 · Inicio de sesión (Ejercicio 1)
- [x] Formulario Usuario / Contraseña / Enviar (`index.html`).
- [x] Carga de `usuarios.json` y guardado en `localStorage`.
- [x] Validación de contraseña alfanumérica con `RegExp`.
- [x] Comprobación de credenciales, mensajes de error y redirección a Bienvenida.
- [x] Probado en el navegador (campos vacíos, símbolos, credenciales erróneas, acceso correcto).

## Fase 2 · Bienvenida (Ejercicio 2)
- [x] `bienvenida.html` con saludo al usuario activo, instrucciones y botón «Jugar».
- [x] Selector de nivel (principiante / intermedio / avanzado) con descripción del nivel.
- [x] Guardar el nivel en `sessionStorage` y redirigir a Juego.
- [x] Proteger la página: si no hay usuario activo, volver al inicio de sesión.
- [x] Definir la configuración de niveles en un solo módulo (`js/servicios/niveles.js`).

## Fase 3 · Juego: estructura y tablero (Ejercicio 3, parte 1)
- [x] `juego.html` con zona de información (tiempo, puntos, nivel) y zona de juego.
- [x] Generación dinámica del tablero según el nivel (3×3, 4×4, 5×5).
- [x] Leyenda y controles (zona de ayuda).

## Fase 4 · Juego: temporizador y mecánica (Ejercicio 3, parte 2)
- [x] Cuenta atrás de 30 s visible y barra de tiempo; al llegar a 0, ir a Resultados.
- [x] Aparición aleatoria de topos, topos dorados y bombas según el nivel.
- [x] Evento `mousedown`: golpear topo (+1), dorado (+3), bomba (−3), agujero vacío (−1).
- [x] Evento `contextmenu`: desactivar bombas.
- [x] Eventos `mouseover` / `mouseout`: resaltar agujero.
- [x] Evento `keydown`: congelar 3 s (una vez por partida).
- [x] Fin de partida por puntos objetivo (victoria) o por tiempo.

## Fase 5 · Estado de la partida (`sessionStorage`)
- [ ] Guardar nivel, puntos, tiempo empleado, topos golpeados, bombas desactivadas y resultado.
- [ ] Redirigir a Resultados al terminar.

## Fase 6 · Resultados (Ejercicio 4)
- [ ] `resultados.html` con ganado / perdido / tiempo agotado y resumen.
- [ ] «Jugar de nuevo» → Bienvenida. «Salir» → Inicio de sesión (limpiando la sesión).

## Fase 7 · Pulido y entrega
- [ ] Mejora de la interfaz (hasta 1,5 puntos): coherencia entre pantallas, legibilidad, detalles.
- [ ] Revisar que no hay código muerto ni valores repetidos; comentarios mínimos y claros.
- [ ] Probar el recorrido completo en el navegador (login → bienvenida → juego → resultados, en los 3 niveles).
- [ ] Preparar la entrega según indique el profesor.
