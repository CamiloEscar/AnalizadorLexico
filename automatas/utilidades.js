function numeros() {
  let numeros = [];
  for (let i = 48; i < 58; i++) {
    let num = String.fromCharCode(i);
    numeros.push(num);
  }
  return numeros
}

function ABCMinuscula() {
  let minuscula = [];
  for (let i = 97; i < 123; i++) {
    let min = String.fromCharCode(i);
    minuscula.push(min);
  }
  return minuscula
}

function ABCMayuscula() {
  let mayuscula = [];
  for (let i = 65; i < 90; i++) {
    let mas = String.fromCharCode(i);
    mayuscula.push(mas);
  }
  return mayuscula
}
 export {numeros,ABCMayuscula,ABCMinuscula};

 