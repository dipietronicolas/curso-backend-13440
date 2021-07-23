const express = require('express');
const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http);

// Settings
app.set('PORT', process.env.PORT || 8080);

// Middlewares
app.use(express.static('./public'));

// Websockets
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('client-msg', ({ msg }) => {
    io.sockets.emit('mensaje general', { msg });
  })

  io.sockets.emit('Nuevo usuario', 'Un nuevo usuario se ha conectado');
})

http.listen(app.get('PORT'), () => {
  console.log(`Listen on port ${app.get('PORT')}`);
})
