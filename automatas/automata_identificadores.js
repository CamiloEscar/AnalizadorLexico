import {numeros, ABCMayuscula, ABCMinuscula} from './utilidades.js'

const automata_identificadores = (identificador)=>{
    //Funciones que devuelven un array;
    const numero = numeros();
    const LetrasMinusculas = ABCMinuscula();
    const LetrasMayusculas = ABCMayuscula()
    ////////////////////////////////////////

    let estado_actual = "A";
    const estados = ["A","B","M"]  //M --> ESTADO MUERTO
    const estado_final = "B";
    const estado_inicial = "A" 
    const alfabeto_entrada = [numero, LetrasMayusculas, LetrasMinusculas, "_"]

    ////////////////////////////////////////
    const tamano_identificador = identificador.length;
    let cadena_aceptada = false;
    
    for (let i = 0; i <= tamano_identificador; i++) {
        let iden = identificador[i]
        
        //ESTADO A
        if (estado_actual == estado_inicial){
            if (alfabeto_entrada[1].includes(iden) || alfabeto_entrada[2].includes(iden) ||  iden == alfabeto_entrada[3]){
                
                estado_actual = estado_final; //estado B
            }
            else{
                estado_actual = estados[2]; //estado Muerto
            }
        }
        //ESTADO B --> ACEPTACIÓN
        else if (estado_actual == estado_final){
            cadena_aceptada = true;
            if (alfabeto_entrada[1].includes(iden) || alfabeto_entrada[2].includes(iden) ||  iden == alfabeto_entrada[3] || alfabeto_entrada[0].includes(iden)){
                estado_actual = estado_final; //estado B
                cadena_aceptada = true;
            }
            else{
                estado_actual = estados[2]; //estado Muerto
            }
        }

        //Estado muerto
        else if (estado_actual == estados[2]){
            cadena_aceptada = false;
            break;
        }
        
    }

    return cadena_aceptada;

}


export {automata_identificadores};