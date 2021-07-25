const express = require('express');
const router = express.Router();
const Productos = require('../Productos');
const FILE_NAME = "Productos.txt";
const productos = new Productos(FILE_NAME);

module.exports = (io) => {

  // Websockets
  io.on('connection', (socket) => {

    console.log('Usuario conectado');

    io.sockets.emit('Nuevo usuario', 'Un nuevo usuario se ha conectado');

    socket.on('get productos', async () => {
      const result = await productos.leer();
      io.sockets.emit('Productos', { result });
    });

    socket.on('new product', async ({ title, price, thumbnail }) => {
      const resultGuardar = await productos.guardar(title, price, thumbnail);
      if (resultGuardar.error) {
        socket.emit('save error', { error: resultGuardar.msg })
      } else {
        const result = await productos.leer();
        io.sockets.emit('Productos', { result });
      }
    })
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
      res.render('ingresar-productos', { error: false });
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