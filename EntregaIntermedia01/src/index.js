const express = require('express');
const app = express();
// Variable booleana que simula ser un administrador.
const isAdministrator = false;
const productosRouter = require('./routes/productos.routes');
const carritoRouter = require('./routes/carrito.routes');

// Settings-
app.set('PORT', process.env.PORT || 8080);

// Custom Middleware que indica si el usuario es admin o no
const checkLog = (req, res, next) => {
  req.isAdministrator = isAdministrator;
  next();
}

// Middlewares
app.use(checkLog);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/productos', productosRouter);
app.use('/carrito', carritoRouter);

app.listen(app.get('PORT'), () => {
  console.log(`Listening on port ${app.get('PORT')}`);
})

app.on("error", error => console.log(`Error del servidor ${error}`));