const socket = io();

const emit = () => {
  socket.emit('get productos');
}

socket.on('Nuevo usuario', (data) => {
  console.log(data);
})

socket.on('Productos', ({ result }) => {
  console.log(result);
})


