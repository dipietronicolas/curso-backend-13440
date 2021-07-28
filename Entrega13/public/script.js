const socket = io();
const tableBody = document.querySelector('#table-body');
const chatDiv = document.querySelector('.chat-results');
const addProductForm = document.querySelector('#ingresar-form');
const chatMessageForm = document.querySelector('#chat-message');

// Chat service - envio un mensaje nuevo al servidor
chatMessageForm.onsubmit = async (e) => {
  e.preventDefault();
  socket.emit('new message', {
    email: e.target.email.value,
    message: e.target.message.value
  })
  e.target.email.value = '';
  e.target.message.value = '';
}

// Recibo un mensaje nuevo que fue guardado en el archivo Mensajes.txt
socket.on('saved message', ({ email, message, time }) => {
  chatDiv.innerHTML += `
    <p>
      <span class="text-primary fw-bold">
        ${email}
      </span> 
      [<span class="text-danger">
        ${time}
      </span>]: 
      <span class="text-success">
        ${message}
      </span>
    </p>
  `
  // pongo el scroll del chat siempre abajo
  chatDiv.scrollTop = chatDiv.scrollHeight;
})

// Recibo todos los mensajes cuando se establece la conexion. 
socket.on('chat messages', results => {
  if (!results.error) {
    chatDiv.innerHTML = '';
    for (result of results) {
      chatDiv.innerHTML += `
        <p>
          <span class="text-primary fw-bold">
            ${result.email}
          </span> 
          [<span class="text-danger">
            ${result.time}
          </span>]: 
          <span class="text-success">
            ${result.message}
          </span>
        </p>
      `
    }
  }
  // pongo el scroll del chat siempre abajo
  chatDiv.scrollTop = chatDiv.scrollHeight;
})

// Manejo del submit del form que ingresa productos para que la pagina no recargue
addProductForm.onsubmit = async (e) => {
  e.preventDefault();
  await fetch('http://localhost:8080/api/productos/guardar/', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: e.target.title.value,
      price: e.target.price.value,
      thumbnail: e.target.thumbnail.value
    })
  });
}

// Detecto cuando un nuevo usuario se ha conectado.
socket.on('Nuevo usuario', (data) => {
  console.log(data);
  emit();
})

// Funcion que trae productos 
const emit = () => {
  socket.emit('get productos');
}

// recibo todos los productos
socket.on('Productos', ({ result }) => {
  tableBody.innerHTML = '';
  for (let i = 0; i < result.length; i++) {
    tableBody.innerHTML += `
      <tr>
        <th class="p-4" scope="row">${result[i].id}</th>
        <td class="p-4">${result[i].title}</td>
        <td class="p-4">${result[i].price}</td>
        <td><img src="${result[i].thumbnail}" class="table-img" alt="img-${result[i].id}" /></td>
      </tr>
    `
  }
})

// recibo un solo producto
socket.on('new product', ({ result }) => {
  tableBody.innerHTML += `
    <tr>
      <th class="p-4" scope="row">${result.id}</th>
      <td class="p-4">${result.title}</td>
      <td class="p-4">${result.price}</td>
      <td><img src="${result.thumbnail}" class="table-img" alt="img-${result.id}" /></td>
    </tr>
  `
})

// Si hubo un error al guardar, emito un cartel de error
socket.on('save error', ({ error }) => {
  alert(error);
})

// un icono de prueba que me dejo a mano 
// https://cdn0.iconfinder.com/data/icons/summer-26/512/Swimtrunks-2-256.png
