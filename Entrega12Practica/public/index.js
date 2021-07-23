const socket = io();
const result = document.querySelector('#result');
const input = document.querySelector('#msg-input');

input.addEventListener('input', (e) => {
  console.log(e.target.value);
  const clientMsg = e.target.value;
  socket.emit('client-msg', { msg: clientMsg });
})

socket.on('mensaje general', ({ msg }) => {
  result.innerHTML = msg;
})

socket.on('mensaje', (objeto) => {
  console.log(objeto);
  result.innerHTML = objeto.msg;
})

socket.on('Nuevo usuario', (data) => {
  console.log(data);
})

