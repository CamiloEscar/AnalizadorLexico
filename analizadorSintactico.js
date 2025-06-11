import {
    esPalabraReservada,
    esPuntuacion,
    esTipoDato
} from './analizadorFunciones.js';

// funcion para verificar la estructura básica del programa 
export function analizarPrograma(tokens) {
    let index = 0;

    function siguienteToken() {
        return tokens[index++];
    }

    function tokenActual() {
        return tokens[index];
    }

    function verificarPalabraReservada(palabra) {
        return esPalabraReservada(palabra);
    }

    function verificarPuntuacion(signo) {
        return esPuntuacion(signo);
    }

    function verificarTipoDato(tipo) {
        return esTipoDato(tipo);
    }

    function analizarPrograma() {
        if (verificarPalabraReservada(siguienteToken())) { // PROGRAM
            if (verificarPuntuacion(siguienteToken())) { // Identificador
                if (verificarPuntuacion(';')) {
                    analizarSeccionUses();
                    analizarSeccionVar();
                    analizarCuerpo();
                    if (tokenActual() === '.') {
                        console.log('Programa válido.');
                    } else {
                        console.error('ERROR SINTÁCTICO -----> Se esperaba "."');
                    }
                } else {
                    console.error('ERROR SINTÁCTICO -----> Se esperaba ";"');
                }
            } else {
                console.error('ERROR SINTÁCTICO -----> Se esperaba identificador');
            }
        } else {
            console.error('ERROR SINTÁCTICO -----> Se esperaba "PROGRAM"');
        }
    }

    function analizarSeccionUses() {
        if (verificarPalabraReservada('USES')) {
            if (verificarPuntuacion(';')) {
                // Agregar logica para analizar las unidades de puntuacion
            } else {
                console.error('ERROR SINTÁCTICO -----> Se esperaba ";" en la sección "USES"');
            }
        }
    }

    function analizarSeccionVar() {
        if (verificarPalabraReservada('VAR')) {
            if (verificarTipoDato(tokenActual())) {
                siguienteToken(); // Tipo de dato
                if (verificarPuntuacion(';')) {
                    // agregar logica para analizar las var
                } else {
                    console.error('ERROR SINTÁCTICO -----> Se esperaba ";" en la sección "VAR"');
                }
            } else {
                console.error('ERROR SINTÁCTICO -----> Se esperaba tipo de dato en la sección "VAR"');
            }
        }
    }

    function analizarCuerpo() {
        if (verificarPalabraReservada('BEGIN')) {
            // mas logica para analizar el cuerpo del programa
            if (verificarPalabraReservada('END')) {
                if (verificarPuntuacion('.')) {
                    console.log('Cuerpo válido.');
                } else {
                    console.error('ERROR SINTÁCTICO -----> Se esperaba "." en el final');
                }
            } else {
                console.error('ERROR SINTÁCTICO -----> Se esperaba "END"');
            }
        } else {
            console.error('ERROR SINTÁCTICO -----> Se esperaba "BEGIN"');
        }
    }

    analizarPrograma();
}

// Ejemplo de tokens
const tokensEjemplo = [
    'PROGRAM', 'VALIDADOR_TERMINA_AB', ';',
    'USES', 'CRT', ';',
    'VAR', 'clave', ':', 'STRING', ';',
    'FUNCTION', 'termina', '(', 'x', ':', 'STRING', ')', ':', 'BOOLEAN', ';',
    'CONST', 'q', '=', '1', ';', 'f', '=', '2.5', ';',
    'BEGIN', 'END', '.'
];

analizarPrograma(tokensEjemplo);
