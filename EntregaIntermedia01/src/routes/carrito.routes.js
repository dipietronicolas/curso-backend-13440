const express = require('express');
const router = express.Router();
const Carrito = require('../services/Carrito');
const CART_FILE_NAME = "Carrito.txt";
const carrito = new Carrito(CART_FILE_NAME);

module.exports = (isAdministrator) => {

  // Rutas sin interfaz para postman
  router.get('/listar/:id?', async (req, res) => {
    const result = req.params.id
      ? await carrito.buscarPorId(req.params.id)
      : await carrito.leer();
    res.json(result);
  });

  router.post('/agregar/:id_producto', async (req, res) => {
    // Enviados por postman, como campos 
    // x-www-form-urlencoded
    const result = await carrito.guardar({
      id: req.params.id_producto, ...req.body
    });
    res.json(result);
  })

  router.delete('/borrar/:id', async (req, res) => {
    const result = await carrito.eliminarProducto(req.params.id);
    res.json(result);
  })

  return router;
}
