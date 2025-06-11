// Importación de módulos
import fs from "fs";

// Importación de funciones de análisis léxico
import {
  esOperadorAritmetico,
  esOperadorRelacional,
  esPalabraReservada,
  esPuntuacion,
  esTipoDato,
} from "./analizadorFunciones.js";

// Importación de autómatas
import { automata_asignacion } from "./automatas/automata_asignacion.js";
import { automata_identificadores } from "./automatas/automata_identificadores.js";
import { automata_reales } from "./automatas/automata_reales.js";
import { automata_enteros } from "./automatas/automata_enteros.js";

const archivoPascal = "pascal2.txt";

class AnalizadorPascal {
  constructor() {
    //almacenamiento de errores, lineas, tokens, control de estructura ;
    this.errores = [];
    this.lineas = [];
    this.tokens = [];
    this.ultimoTokenEsPuntoyComa = false;
  }

  //Lee el archivo, divide el contenido en líneas y las analiza una por una.
  analizarArchivo(nombreArchivo) {
    try {
      const contenido = fs.readFileSync(nombreArchivo, "utf8");
      this.lineas = contenido.split("\n");

      console.log("Analizando archivo línea por línea...\n");

      this.lineas.forEach((linea, numeroLinea) => {
        this.analizarLinea(linea, numeroLinea + 1);
      });

      this.mostrarResultados();
    } catch (err) {
      console.error("Error al leer el archivo:", err);
    }
  }

  analizarLinea(linea, numeroLinea) {
    // Verificar si hay contenido después de punto y coma en la misma línea
    if (linea.includes(";")) {
      const partes = linea.split(";");
      if (partes.length > 1 && partes[1].trim().length > 0) {
        this.errores.push({
          linea: numeroLinea,
          token: ";",
          mensaje:
            "No debe haber código después de punto y coma en la misma línea",
        });
        return;
      }
    }

    const regex =
      /(\b\d+\.\.\d+\b|\b\d+\.\d+\b|\b\d+\b|\b\w+\b|[:][=]|[;]|[\.]|[^\s])/g; //extraemos tokens usando una expresion regular
    const tokens = linea.match(regex);

    if (!tokens) return;

    console.log(`\nAnalizando línea ${numeroLinea}: ${linea.trim()}`);

    // Validar estructura básica de Pascal
    this.validarEstructuraLinea(tokens, numeroLinea);

    tokens.forEach((token) => {
      const resultado = this.clasificarToken(token); //Clasifica cada token y lo almacena en this.tokens, además de registrar errores
      if (resultado.error) {
        this.errores.push({
          linea: numeroLinea,
          token,
          mensaje: resultado.mensaje,
        });
      }
      this.tokens.push({
        linea: numeroLinea,
        token,
        tipo: resultado.tipo,
      });
    });
  }

  validarEstructuraLinea(tokens, numeroLinea) {
    // Validar estructura BEGIN-END
    if (tokens.includes("begin") && !tokens.includes(";")) {
      this.errores.push({
        linea: numeroLinea,
        token: "begin",
        mensaje: "BEGIN debe terminar con punto y coma",
      });
    }

    // Validar END osae verifica que END termine en . o ;
    if (tokens.includes("end")) {
      const indexEnd = tokens.indexOf("end");
      const nextToken = tokens[indexEnd + 1];

      // Permitir "end." o "end;" pero no otros caracteres
      if (nextToken && nextToken !== "." && nextToken !== ";") {
        this.errores.push({
          linea: numeroLinea,
          token: "end",
          mensaje: "END debe terminar con punto o punto y coma",
        });
      }
    }

    // Validar declaraciones de variables
    if (tokens.includes("var") && !tokens.includes(":")) {
      this.errores.push({
        linea: numeroLinea,
        token: "var",
        mensaje: "Declaración de variable incorrecta",
      });
    }

    // Validar asignaciones, verifica que := no esté mal colocado
    if (tokens.includes(":=")) {
      const indexAsignacion = tokens.indexOf(":=");
      if (indexAsignacion === 0 || indexAsignacion === tokens.length - 1) {
        this.errores.push({
          linea: numeroLinea,
          token: ":=",
          mensaje: "Asignación mal formada",
        });
      }
    }
  }

  clasificarToken(token) {
    // Validaciones específicas para números reales y rangos
    if (token.includes(".")) {
      // Manejar el caso especial de rango (e.g., 0..3)
      if (token.includes("..")) {
        const partes = token.split("..");
        if (
          partes.length === 2 &&
          /^\d+$/.test(partes[0]) &&
          /^\d+$/.test(partes[1])
        ) {
          return { tipo: "RANGO" };
        }
      }

      // Validar números reales normales
      if (automata_reales(token)) {
        return { tipo: "REAL" };
      }

      // Si no es un rango válido ni un número real, es un error
      return {
        error: true,
        mensaje: `Número o rango mal formado: ${token}`,
        tipo: "ERROR",
      };
    }

    // Usamos los autómatas para validar números, palabras reservadas y operadores.

    if (automata_enteros(token)) {
      return { tipo: "ENTERO" };
    }
    if (esPalabraReservada(token)) {
      return { tipo: "PALABRA_RESERVADA" };
    }
    if (esTipoDato(token)) {
      return { tipo: "TIPO_DATO" };
    }
    if (esOperadorAritmetico(token)) {
      return { tipo: "OPERADOR_ARITMETICO" };
    }
    if (esOperadorRelacional(token)) {
      return { tipo: "OPERADOR_RELACIONAL" };
    }
    if (esPuntuacion(token)) {
      return { tipo: "PUNTUACION" };
    }
    if (token === ")" || token === "(") {
      return { tipo: "PARENTESIS" };
    }
    if (token === "]" || token === "[") {
      return { tipo: "CORCHETE" };
    }
    if (token === "'") {
      return { tipo: "APOSTROFE" };
    }
    if (automata_asignacion(token)) {
      return { tipo: "ASIGNACION" };
    }
    if (automata_identificadores(token)) {
      return { tipo: "IDENTIFICADOR" };
    }

    return {
      error: true,
      mensaje: `Token no válido: ${token}`,
      tipo: "ERROR",
    };
  }

  mostrarResultados() {
    //imprimimos los resultados y errores que haya encontrado
    if (this.errores.length === 0) {
      console.log("\n✅ El código es sintácticamente válido"); //si los errores es igual a 0 el codigo es valido
      console.log("\nResumen de tokens encontrados:");
      this.tokens.forEach(({ linea, token, tipo }) => {
        console.log(`Línea ${linea}: ${token.padEnd(20)} --> ${tipo}`);
      });
    } else {
      console.log("\n❌ Se encontraron errores en el código:"); // sino muestra los errores
      this.errores.forEach(({ linea, token, mensaje }) => {
        console.log(`Error en línea ${linea}: ${mensaje}`);
      });
    }
  }
}

// Uso del analizador, se ejecuta a lo ultimo, ya que debe inicializar las demas clases del codigo
const analizador = new AnalizadorPascal();
analizador.analizarArchivo(archivoPascal); //declaramos una constante al principio para que sea mas facil el cambio de archivo
