import express from 'express';
import fs from 'fs';
const app = express();
let visitasItems = 0, visitasItemRandom = 0;

// Setteo el puerto
app.set('PORT', process.env.PORT || 8080);

// Ruta home de prueba
app.get('/', (req, res) => {
  res.json({ msg: 'Hola Mundo' });
});

// Ruta /items
app.get('/items', async (req, res) => {
  // Incremento la cantidad de visitas a este endpoint
  visitasItems++;
  try {
    const data = await fs.promises.readFile('./Entrega07/Productos.txt', 'utf-8');
    const items = eval(data);
    res.json({ 
      items, cantidad: items.length
    }) 
  } catch (error) {
    res.json({ error });
  }
})

// Ruta /item-random
app.get('/item-random', async (req, res) => {
  // Incremento la cantidad de visitas a este endpoint
  visitasItemRandom++;
  try {
    const data = await fs.promises.readFile('./Entrega07/Productos.txt', 'utf-8');
    const items = eval(data);
    res.json({ 
      items: items[parseInt(Math.random() * items.length)]
    }) 
  } catch (error) {
    res.json({ error });
  }
})

// Ruta /visitas
app.get('/visitas', (req, res) => {
  res.json({ 
    visitas: {
      items: visitasItems,
      item: visitasItemRandom
    }
  })
})

const server = app.listen(app.get('PORT'), () => {
  console.log(`Listen on port ${app.get('PORT')}`);
});

server.on("error", error => console.log(`Error del servidor ${error}`));
