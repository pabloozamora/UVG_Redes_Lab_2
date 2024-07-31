const net = require('net');

const port = 3000; 

// Crear el servidor
const server = net.createServer((socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('data', (data) => {
    console.log(`Mensaje recibido: ${data}`);

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
