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
  if (!req.isAdministrator) {
    res.json({ 
      error: -1, 
      descripcion: 'ruta /productos/agregar metodo POST no autorizada' 
    })
  } else {
    const { title, description, price, stock, thumbnail } = req.body;
    const result = await productos.guardar(
      title, description, price, stock, thumbnail
    );
    res.json(result);
  }
})

router.put('/actualizar/:id', async (req, res) => {
  if (!req.isAdministrator) {
    res.jsonres.json({ 
      error: -1, 
      descripcion: 'ruta /productos/actualizar/:id metodo PUT no autorizada' 
    })
  } else {
    const result = await productos.modificar({
      id: Number(req.params.id), ...req.body
    });
    res.json(result);
  }
})

router.delete('/borrar/:id', async (req, res) => {
  if (!req.isAdministrator) {
    res.jsonres.json({ 
      error: -1, 
      descripcion: 'ruta /productos/borrar/:id metodo DELETE no autorizada' 
    })
  } else {
    const result = await productos.eliminarProducto(req.params.id);
    res.json(result);
  }
})

module.exports = router;