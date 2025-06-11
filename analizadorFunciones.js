/**
 * Verifica si un token pertenece a un conjunto dado.
 *
 * @param {string} token - El token a verificar.
 * @param {Set<string>} conjunto - El conjunto de tokens válidos.
 * @param {boolean} [convertirMayuscula=false] - Si es true, convierte el token a mayúsculas antes de la verificación.
 * @returns {boolean} - Devuelve `true` si el token está en el conjunto, de lo contrario `false`.
 */

function esTokenValido(token, conjunto, convertirMayuscula = false) {
    if (token === '\n') {
        // Manejo específico para saltos de renglón si es necesario
        return true;
    }
    
    if (convertirMayuscula) {
        token = token.toUpperCase();
    }
    return conjunto.has(token);
}

const operadoresAritmeticos = new Set(['+', '-', '/', '*']);
const operadoresRelacionales = new Set(['>=', '<=', '<>', '>', '<', '=']);
const palabrasReservadas = new Set([
    'FUNCTION', 'PROCEDURE', 'PROGRAM', 'WHILE', 'IF', 'ELSE', 'THEN', 'TO', 'DO', 'TRUE', 'FALSE',
    'AND', 'OR', 'NOT', 'AS', 'ARRAY', 'BEGIN', 'END', 'BREAK', 'CASE', 'CONTINUE', 'DEFAULT', 'DIV',
    'EXIT', 'FILE', 'FINALLY', 'FOR', 'GOTO', 'MOD', 'OF', 'READ', 'WRITE', 'RECORD', 'REPEAT', 'SELF',
    'SET', 'STRING', 'TRY', 'TYPE', 'UNIT', 'USES', 'VAR', 'WITH', 'WRITELN'
]);
const simbolosPuntuacion = new Set(['.', ':', ';', ',', "'"]);
const tiposDatos = new Set(['BOOLEAN', 'CHAR', 'STRING', 'WORD', 'INTEGER', 'BYTE', 'REAL']);

/**
 * Verifica si un token es un operador aritmético válido en Pascal.
 */
export function esOperadorAritmetico(token) {
    return esTokenValido(token, operadoresAritmeticos);
}

/**
 * Verifica si un token es un operador relacional válido en Pascal.
 */
export function esOperadorRelacional(token) {
    return esTokenValido(token, operadoresRelacionales);
}

/**
 * Verifica si un token es una palabra reservada válida en Pascal.
 */
export function esPalabraReservada(token) {
    return esTokenValido(token, palabrasReservadas, true);
}

/**
 * Verifica si un token es un signo de puntuación válido en Pascal.
 */
export function esPuntuacion(token) {
    return esTokenValido(token, simbolosPuntuacion);
}

/**
 * Verifica si un token es un tipo de dato válido en Pascal.
 */
export function esTipoDato(token) {
    return esTokenValido(token, tiposDatos, true);
}
