const automata_asignacion = (simbolo) => {
    const estados = {
        INICIAL: "A",
        DOBLE_PUNTO: "B",
        IGUAL: "C",
        MUERTO: "M"
    };
    
    let estado_actual = estados.INICIAL;
    const alfabeto_entrada = {
        DOBLE_PUNTO: ":",
        IGUAL: "="
    };
    
    // Validar que el símbolo no sea vacío
    if (!simbolo || simbolo.length === 0) {
        return false;
    }

    for (let i = 0; i < simbolo.length; i++) {
        const sim = simbolo[i];
        
        switch(estado_actual) {
            case estados.INICIAL:
                estado_actual = (sim === alfabeto_entrada.DOBLE_PUNTO) 
                    ? estados.DOBLE_PUNTO 
                    : estados.MUERTO;
                break;
                
            case estados.DOBLE_PUNTO:
                estado_actual = (sim === alfabeto_entrada.IGUAL)
                    ? estados.IGUAL
                    : estados.MUERTO;
                break;
                
            case estados.IGUAL:
                estado_actual = estados.MUERTO;
                break;
                
            default:
                return false;
        }
    }

    return estado_actual === estados.IGUAL;
};

export { automata_asignacion };