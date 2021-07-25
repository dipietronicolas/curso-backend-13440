const socket = io();
const tableBody = document.querySelector('#table-body');
const form = document.querySelector('#ingresar-form');

// Manejo del submit del form para que la pagina no recargue
form.onsubmit = (e) => {
  e.preventDefault();
  socket.emit('new product', {
    title: e.target.title.value,
    price: e.target.price.value,
    thumbnail: e.target.thumbnail.value
  })
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

// recibo los productos
socket.on('Productos', ({ result }) => {
  tableBody.innerHTML = '';
  for(let i=0; i<result.length; i++){
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

// Si hubo un error al guardar, emito un cartel de error
socket.on('save error', ({ error }) => {
  alert(error);
})

// un icono de prueba que me dejo a mano 
// https://cdn0.iconfinder.com/data/icons/summer-26/512/Swimtrunks-2-256.png
