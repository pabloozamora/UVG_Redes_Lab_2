/*
Universidad del Valle de Guatemala
Redes
Sección 10
Laboratorio 2

Codificador Fletcher checksum

Autores:
Diego Andrés Morales Aquino - 21762
Pablo Andrés Zamora Vásquez - 21780
*/

const readline = require('readline');

function fletcher16Checksum(input) {

  const blockSize = 8;

  // Agregar padding si el input no es multiplo del tamaño de bloque
  const numberOfBlocks = Math.ceil(input.length / blockSize) * blockSize;
  const inputWithPadding = input.toString(2).padStart(numberOfBlocks, '0')

  let sum1 = 0;
  let sum2 = 0;

  // Recorrer input en bloques


  for (let i = 0; i < inputWithPadding.length; i+= blockSize) {
      // Suma y mantiene el byte bajo 8 bits
      const blockValue = parseInt(inputWithPadding.slice(i, i + blockSize), 2);
      sum1 = (sum1 + blockValue) % 255; 
      sum2 = (sum2 + sum1) % 255; 
  }

  // Combina sum1 y sum2 en un valor de 16 bits
  const checksum = ((sum2 << 8) | sum1);
  return checksum.toString(2).padStart(16, '0');
}


// Crear una interfaz de entrada/salida
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingresar mensaje en binario a codificar: ', (message) => {
  console.log(`Mensaje completo codificado:\n${message}\x1b[33m${fletcher16Checksum(message)}\x1b[0m`);
  rl.close();
});