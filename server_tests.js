const net = require('net');
const fs = require('fs');
const fletcher = require("./fletcher/fletcher_checksum.js")
const hamming = require("./hamming/hamming_decoder.js")
const binary_to_ascii = require("./presentation/binary_to_ascii.js")

const port = 3000; 

// Crear el servidor
const server = net.createServer((socket) => {
  console.log('Nuevo cliente conectado');

  const results = [] // method, errorProb, correcto, incorrecto, falso correcto

  socket.on('data', (data) => {
    
    const fullMessage = data.toString().split("|");

    const {errorProb, originalMessage, method} = JSON.parse(fullMessage[0])
    const encodedMessage = fullMessage[1];

    if(method === "1"){
      // Decodificar con fletcher

      const [ok] = fletcher.verifyChecksum(encodedMessage)
      if(ok){
        results.push([method, errorProb, originalMessage.length, 1, 0])
      }else{
        results.push([method, errorProb, originalMessage.length, 0, 0])
      }

    }else{
      // Decodificar con hamming
      const [ok, binary_message ] = hamming.hammingDecode(encodedMessage)

      if(ok){
        // El mensaje no contenía errores
        results.push([method, errorProb, originalMessage.length, 1, 0])
      }else{
        if(binary_message == originalMessage){
          // Mensaje corregido correctamente (Esta al revés creo)
          console.log("El mensaje contiene errores.")
          results.push([method, errorProb, originalMessage.length, 0, 0])
        }else{
          // Falso corregido
          results.push([method, errorProb, originalMessage.length, 0, 1])
        }
      }
    }
  });

  socket.on('end', () => {
    console.log('Cliente desconectado');
  // Guardar en csv
  const csvData = results.map(row => row.join(',')).join('\n') + '\n';

  // Escribir o hacer append al archivo CSV
  fs.appendFile('output.csv', csvData, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo CSV:', err);
    } else {
      console.log('Resultados guardados en el archivo CSV.');
    }
  });
  });

  socket.on('error', (err) => {
    console.error(`Error: ${err}`);
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
