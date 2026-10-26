// Solo letras y números (sin espacios, tildes, ñ ni símbolos)
const REGEX_ALFANUMERICO = /^[a-zA-Z0-9]+$/;

export function esAlfanumerico(texto) {
    return REGEX_ALFANUMERICO.test(texto);
}
