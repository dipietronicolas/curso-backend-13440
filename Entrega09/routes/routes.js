import Router from 'express';
import { Productos } from '../Productos.js';
export const router = Router();
const file_name = "Productos.txt";

router.get('/api/productos/listar', async (req, res) => {
  const productos = new Productos(file_name);
  const result = await productos.leer();
  res.json(result);
});

router.get('/api/productos/listar/:id', async (req, res) => {
  const productos = new Productos(file_name);
  const result = await productos.buscarPorId(req.params.id);
  res.json(result);
});

router.post('/api/productos/guardar/', async (req, res) => {
  // Enviados por postman, como campos 
  // x-www-form-urlencoded
  const { title, price, thumbnail } = req.body;
  const productos = new Productos(file_name);
  const result = await productos.guardar(title, price, thumbnail);
  res.json(result);
})

router.put('/api/productos/actualizar/:id', async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const { id } = req.params;
  const productos = new Productos(file_name);
  const result = await productos.modificar(Number(id), title, price, thumbnail)  ;
  console.log(result);
  res.json(result);
})

router.delete('/api/productos/borrar/:id', async  (req, res) => {
  const productos = new Productos(file_name);
  const result = await productos.eliminarProducto(req.params.id);
  res.json(result);
})
