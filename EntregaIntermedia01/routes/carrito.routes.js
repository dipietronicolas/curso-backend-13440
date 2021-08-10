const express = require('express');
const router = express.Router();
// const Carrito = require('../Carrito');
const CART_FILE_NAME = "Carrito.txt";
//const carrito = new Carrito(PRODUCTS_FILE_NAME);

// Rutas sin interfaz para postman
router.get('/listar/:id?', async (req, res) => {
  /*
  const result = req.params.id
    ? await productos.buscarPorId(req.params.id)
    : await productos.leer();
  */
  res.json(result);
});

router.post('/agregar/:id_producto', async (req, res) => {
  // Enviados por postman, como campos 
  // x-www-form-urlencoded
  const { title, price, thumbnail } = req.body;
  // const result = await productos.guardar(title, price, thumbnail);
  res.json(result);
})

router.delete('/borrar/:id', async (req, res) => {
  // const result = await productos.eliminarProducto(req.params.id);
  res.json(result);
})

module.exports = router;