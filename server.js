const net = require('net');
const readline = require('readline');
const fletcher = require("./fletcher/fletcher_checksum.js")
const hamming = require("./hamming/hamming_decoder.js")
const binary_to_ascii = require("./presentation/binary_to_ascii.js")

const port = 3000; 

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Muestra el menu para seleccionar un algoritmo de verificacion o corrección.
 * @returns 1: fletcher. 2: Hamming
 */
const selectAlgorithm = () => new Promise((resolve) => {
  rl.question('Seleccionar algoritmo a utilizar: \n1. Algoritmo de detección (Fletcher).\n2. Algoritmo de corrección (Hamming).\n', (option) => {
    
    if(option === "1" || option === "2"){
      resolve(option);
      rl.close();
      return
    }

    selectAlgorithm(); // Volver a mostrar menu    
  });
})

const createServer = async () => {
// Obtener algoritmo a usar
const option = await selectAlgorithm();

// Crear el servidor
const server = net.createServer((socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('data', (data) => {
    
    const encodedMessage = data.toString();
    
    if(option === "1"){
      // Decodificar con fletcher
      const [ok, binary_message] = fletcher.verifyChecksum(encodedMessage)
      if(ok){
        const message = binary_to_ascii(binary_message)
        console.log(`Mensaje correcto! El mensaje es: ${message}`)
      }else{
        console.log("El mensaje contiene errores.")
      }
    }else{
      // Decodificar con hamming
      const [ok, binary_message, errorPos ] = hamming.hammingDecode(encodedMessage)

      if(ok){
        console.log('No se detectaron errores en la secuencia codificada.');
      }else{
        console.log(`Bit incorrecto en la posición: ${errorPos}. Corrigiendo...`);
      }

      const message = binary_to_ascii(binary_message)
      console.log(`Mensaje decodificado: ${message}`)
    }

  });

  socket.on('end', () => {
    console.log('Cliente desconectado');
  });

  socket.on('error', (err) => {
    console.error(`Error: ${err}`);
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
}

createServer()