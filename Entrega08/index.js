import express from 'express';
import { Productos } from './Productos.js';
const app = express(),
  file_name = "Productos.txt"

app.set('PORT', process.env.PORT || 8080);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/productos/listar', async (req, res) => {
  const productos = new Productos(file_name);
  const result = await productos.leer();
  console.log(typeof result);
  res.json(result);
});

app.get('/api/productos/listar/:id', async (req, res) => {
  const productos = new Productos(file_name);
  const result = await productos.buscarPorId(req.params.id);
  res.json(result);
});

app.post('/api/productos/guardar/', async (req, res) => {
  // Enviados por postman, como campos 
  // x-www-form-urlencoded
  const { title, price, thumbnail } = req.body;
  console.log(req.body);
  const productos = new Productos(file_name);
  const result = await productos.guardar(title, price, thumbnail);
  res.json(result);
})

app.listen(app.get('PORT'), () => {
  console.log(`Listen on port ${app.get('PORT')}`);
});