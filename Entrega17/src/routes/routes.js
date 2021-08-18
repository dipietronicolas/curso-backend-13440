const express = require('express');
const router = express.Router();
const Productos = require('../services/Productos');
const Mensajes = require('../services/Mensajes');
const PRODUCTS_FILE_NAME = "Productos.txt";
const MESSAGES_FILE_NAME = "Mensajes.txt";
const productos = new Productos(PRODUCTS_FILE_NAME);
const mensajes = new Mensajes(MESSAGES_FILE_NAME);

module.exports = (io) => {

  // Websockets
  io.on('connection', (socket) => {
    console.log('Usuario conectado');
    io.sockets.emit('Nuevo usuario', 'Un nuevo usuario se ha conectado');

    // Leo los productos del archivo y los mando a la vista
    socket.on('get productos', async () => {
      const result = await productos.leer();
      io.sockets.emit('Productos', { result });
    });

    // Chat service - recibo un mensaje
    socket.on('new message', async ({ email, message }) => {
      //console.log(email, message);
      const newMessage = await mensajes.guardar(email, message);
      io.sockets.emit('saved message', newMessage);
    })

    // Funcion que emite los mensajes guardados al establecer la coneccion
    const emitMessages = async () => {
      const messages = await mensajes.leer();
      io.sockets.emit('chat messages', messages);
    }
    emitMessages();

  })

  // Rutas con interfaz grafica
  router.get('/productos/vista', async (req, res) => {
    const result = await productos.leer();
    res.render('main', { productos: result, listExists: result.length > 0 ? true : false })
  })

  router.get('/productos/guardar', async (req, res) => {
    res.render('ingresar-productos', { error: false });
  })

  // Rutas sin interfaz para postman
  router.get('/api/productos/listar', async (req, res) => {
    const result = await productos.leer();
    res.json(result);
  });

  router.get('/api/productos/listar/:id', async (req, res) => {
    const result = await productos.buscarPorId(req.params.id);
    res.json(result);
  });

  router.post('/api/productos/guardar/', async (req, res) => {
    // Enviados por postman, como campos 
    // x-www-form-urlencoded
    const { title, price, thumbnail } = req.body;
    const result = await productos.guardar(title, price, thumbnail);

    if (result.error) {
      res.render('ingresar-productos', { error: result.msg });
    } else {
      io.sockets.emit('new product', { result });
      res.status(201).send() // 201 Created, tuvo exito y ha llevado a la creación de un recurso
    }
  })

  router.put('/api/productos/actualizar/:id', async (req, res) => {
    const { title, price, thumbnail } = req.body;
    const { id } = req.params;
    const result = await productos.modificar(Number(id), title, price, thumbnail);
    res.json(result);
  })

  router.delete('/api/productos/borrar/:id', async (req, res) => {
    const result = await productos.eliminarProducto(req.params.id);
    res.json(result);
  })

  return router;
}