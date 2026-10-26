# Whac-A-Mole

Minijuego en JavaScript para la tarea de evaluación 2 del módulo DWEC (UD3). Es la implementación del diseño presentado en la tarea 1.

## Cómo ejecutarlo

La aplicación carga `data/usuarios.json` con `fetch` y usa módulos ES, así que **no funciona abriendo el HTML con doble clic**. Hay que servirla por HTTP. Por ejemplo:

```bash
python -m http.server 8000
```

y abrir <http://localhost:8000/>. También sirve la extensión Live Server de VS Code.

Usuarios de prueba (los de `data/usuarios.json`): `iarana` / `1234Abcd`, `agoikoetxea` / `5678Efgh`, `jolano` / `9012Ijkl`.

## Cómo se juega

- Golpea los topos marrones con el ratón: +1 punto. Los topos dorados valen +3.
- Las bombas restan 3 puntos; con el clic derecho se desactivan sin perder puntos.
- Pulsar un agujero vacío resta 1 punto (la puntuación no baja de 0).
- Barra espaciadora: congela las figuras visibles 3 segundos (una vez por partida).
- Hay 30 segundos para alcanzar la puntuación objetivo del nivel.

| Nivel | Tablero | Figuras a la vez | Tiempo visible | Bombas | Puntos para ganar |
|---|---|---|---|---|---|
| Principiante | 3 × 3 | 1 | 1200 ms | no | 10 |
| Intermedio | 4 × 4 | 2 | 900 ms | 15 % | 20 |
| Avanzado | 5 × 5 | 3 | 600 ms | 25 % | 30 |

## Estructura

```
index.html · bienvenida.html · juego.html · resultados.html   las cuatro interfaces
css/        estilos.css (común) y juego.css
data/       usuarios.json
js/
  paginas/      un script por interfaz: conecta el DOM con la lógica
  componentes/  tablero.js (DOM del tablero) y generador.js (aparición de figuras)
  servicios/    almacen.js (Web Storage), niveles.js (configuración), partida.js (puntuación), cargar-datos.js (recurso del profesor)
  utilidades/   validacion.js (RegExp)
```

## Web Storage

- `localStorage`: lista de usuarios cargada desde `usuarios.json`.
- `sessionStorage`: usuario activo, nivel elegido y datos de la última partida (resultado, puntos, objetivo, tiempo empleado y restante, topos golpeados, bombas desactivadas).
