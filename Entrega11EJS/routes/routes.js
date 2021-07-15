import Router from 'express';
import { Productos } from '../Productos.js';
export const router = Router();
const FILE_NAME = "Productos.txt";
const productos = new Productos(FILE_NAME);


// Rutas con interfaz grafica EJS
router.get('/productos/vista', async (req, res) => {
  const result = await productos.leer();
  res.render('pages/index', { productos: result, listExists: result.length > 0 ? true : false })
})

router.get('/productos/guardar', async (req, res) => {
  res.render('pages/addProducts', { error: false });
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
  
  if(result.error){
    res.render('pages/addProducts', { error: result.msg });
  } else {
    // res.render('pages/index', { productos: result, listExists: Boolean(result.title) ? true : false });
    res.redirect('/productos/vista');
  }
})

router.put('/api/productos/actualizar/:id', async (req, res) => {
  const { title, price, thumbnail } = req.body;
  const { id } = req.params;
  const result = await productos.modificar(Number(id), title, price, thumbnail);
  res.json(result);
})

router.delete('/api/productos/borrar/:id', async  (req, res) => {
  const result = await productos.eliminarProducto(req.params.id);
  res.json(result);
})
