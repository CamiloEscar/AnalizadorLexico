import { numeros } from './utilidades.js';

/**
 * Autómata para reconocer números enteros en Pascal.
 * Un número entero válido puede comenzar con un signo opcional (+ o -)
 * seguido de uno o más dígitos.
 *
 * @param {string} entero - El token a verificar.
 * @returns {boolean} - Devuelve `true` si el token es un número entero válido, de lo contrario `false`.
 */
const automata_enteros = (entero) => {
    const numero = numeros();

    let estado_actual = "A";
    const estados = ["A", "B", "M", "D"];  // Estado muerto M
    const estado_final = ["D"];  // Estado final para enteros
    const estado_inicial = "A";
    const alfabeto_entrada = [numero, "-"];
    const tamano_entero = entero.length;
    let entero_aceptado = false;

    for (let i = 0; i < tamano_entero; i++) {
        let num = entero[i];

        // ESTADO A
        if (estado_actual === estado_inicial) {
            if (alfabeto_entrada[0].includes(num)) {
                estado_actual = estados[3];  // Estado D
            } else if (alfabeto_entrada[1] === num) {
                estado_actual = estados[1];  // Estado B
            } else {
                estado_actual = estados[2];  // Estado muerto M
            }
        }
        // ESTADO B
        else if (estado_actual === estados[1]) {
            if (alfabeto_entrada[0].includes(num)) {
                estado_actual = estados[3];  // Estado D
            } else {
                estado_actual = estados[2];  // Estado muerto M
            }
        }
        // ESTADO D
        else if (estado_actual === estados[3]) {
            if (alfabeto_entrada[0].includes(num)) {
                estado_actual = estados[3];  // Estado D
            } else {
                estado_actual = estados[2];  // Estado muerto M
            }
        }
        // ESTADO M
        else if (estado_actual === estados[2]) {
            entero_aceptado = false;
            break;
        }
    }

    // Verificar si el estado final es un estado de aceptación
    if (estado_final.includes(estado_actual)) {
        entero_aceptado = true;
    }

    return entero_aceptado;
};

export { automata_enteros };
