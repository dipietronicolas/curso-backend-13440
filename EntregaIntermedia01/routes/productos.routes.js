const express = require('express');
const router = express.Router();
const Productos = require('../Productos');
const PRODUCTS_FILE_NAME = "Productos.txt";
const productos = new Productos(PRODUCTS_FILE_NAME);

// Rutas sin interfaz para postman
router.get('/listar/:id?', async (req, res) => {
  const result = req.params.id
    ? await productos.buscarPorId(req.params.id)
    : await productos.leer();
  res.json(result);
});

router.post('/agregar', async (req, res) => {
  // Enviados por postman, como campos 
  // x-www-form-urlencoded
  const { title, description, price, stock, thumbnail } = req.body;
  const result = await productos.guardar(
    title, description, price, stock, thumbnail
  );
  res.json(result);
})

router.put('/actualizar/:id', async (req, res) => {
  const { title, description, price, stock, thumbnail } = req.body;
  const { id } = req.params;
  const result = await productos.modificar(
    Number(id), title, description, price, stock, thumbnail
  );
  res.json(result);
})

router.delete('/borrar/:id', async (req, res) => {
  const result = await productos.eliminarProducto(req.params.id);
  res.json(result);
})

module.exports = router;