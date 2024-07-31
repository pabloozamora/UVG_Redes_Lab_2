const net = require('net');
const {hammingDecode} = require('../hamming/hamming_decoder');
const {binaryToAscii} = require('../presentation/binary_to_ascii');

const client = new net.Socket();
const HOST = '127.0.0.1';
const PORT = 65432;

client.connect(PORT, HOST, () => {
    console.log('Conectado al servidor');
});

client.on('data', (data) => {
    console.log('Emisor >> ' + data);
    console.log('Mensaje recibido: ' + binaryToAscii((data.toString())));
});

client.on('close', () => {
    console.log('Conexión cerrada');
});

client.on('error', (err) => {
    console.error('Error de conexión: ', err);
});
