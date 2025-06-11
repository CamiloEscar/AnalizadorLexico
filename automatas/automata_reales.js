import { numeros } from './utilidades.js';

const automata_reales = (real) => {
    const estados = {
        INICIAL: "A",
        SIGNO: "B",
        ENTERO: "D",
        PUNTO: "E",
        PUNTO_DOBLE: "F",
        DECIMAL: "G",
        MUERTO: "M"
    };
    
    const numero = numeros();
    let estado_actual = estados.INICIAL;
    
    // Validaciones iniciales
    if (!real || real.length === 0) return false;
    
    // Verificar formato básico de número real
    if (!/^\-?\d*\.\d+$/.test(real)) return false;
    
    // Verificar que no empiece con punto
    if (real[0] === '.') return false;
    
    // Verificar que no termine con punto
    if (real[real.length - 1] === '.') return false;
    
    // Verificar que no haya más de un punto decimal
    const puntos = real.split('.').length - 1;
    if (puntos !== 1) return false;

    for (let i = 0; i < real.length; i++) {
        const char = real[i];
        const nextChar = real[i + 1];
        
        switch(estado_actual) {
            case estados.INICIAL:
                if (char === '-') {
                    estado_actual = estados.SIGNO;
                } else if (numero.includes(char)) {
                    estado_actual = estados.ENTERO;
                } else {
                    estado_actual = estados.MUERTO;
                }
                break;
                
            case estados.SIGNO:
                if (numero.includes(char)) {
                    estado_actual = estados.ENTERO;
                } else {
                    estado_actual = estados.MUERTO;
                }
                break;
                
            case estados.ENTERO:
                if (numero.includes(char)) {
                    // Mantener estado
                } else if (char === '.' && nextChar === '.') {
                    estado_actual = estados.PUNTO_DOBLE;
                    i++; // Saltar el siguiente punto
                } else if (char === '.') {
                    estado_actual = estados.PUNTO;
                } else {
                    estado_actual = estados.MUERTO;
                }
                break;
                
            case estados.PUNTO:
                if (numero.includes(char)) {
                    estado_actual = estados.DECIMAL;
                } else if (char === '.') {
                    estado_actual = estados.PUNTO_DOBLE;
                } else {
                    estado_actual = estados.MUERTO;
                }
                break;

            case estados.PUNTO_DOBLE:
                if (numero.includes(char)) {
                    estado_actual = estados.DECIMAL;
                } else {
                    estado_actual = estados.MUERTO;
                }
                break;
                
            case estados.DECIMAL:
                if (!numero.includes(char)) {
                    estado_actual = estados.MUERTO;
                }
                break;
                
            default:
                return false;
        }
    }

    return estado_actual === estados.DECIMAL;
};

export { automata_reales };
