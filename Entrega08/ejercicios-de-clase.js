// En este archivo hay pruebas que hice segun los 
// ejercicios de clase.

import express from 'express';
import { Productos } from './Productos.js';
const app = express(),
  frase = "Hola mundo como estan",
  file_name = "Productos.txt"

app.set('PORT', process.env.PORT || 8080);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<h1>La casa esta en orden</h1>');
})

app.get('/api/getFrase', (req, res) => {
  res.send(`<h1>${frase}</h1>`);
})

app.get('/api/getLetra/:num', (req, res) => {
  res.json(req.params)
})

app.get('/api/getPalabra/:num', (req, res) => {
  res.send(`<h1>${frase}</h1>`);
})

app.get('/api/sumar/:numUno/:numDos', (req, res) => {
  // http://localhost:8080/api/5/6
  const { numUno, numDos } = req.params;
  res.json({ resultado: Number(numUno) + Number(numDos) });
})

app.get('/api/sumar/', (req, res) => {
  // http://localhost:8080/api/sumar?num1=5&num2=62
  const { num1, num2 } = req.query;
  res.json({ resultado: Number(num1) + Number(num2) });
})

app.get('/api/sumar/:suma', (req, res) => {
  // http://localhost:8080/api/5+6
  res.json({ resultado: eval(req.params.suma) })
})

app.get('/randomtest', (req, res) => {
  res.json({ resultado: (Math.random() * (9999.99 - 0.01) + 0.01).toFixed(2) })
})

// Desafio 08
app.get('/api/productos/listar', (req, res) => {
  res.send(`<h1>${frase}</h1>`);
})

app.listen(app.get('PORT'), () => {
  console.log(`Listen on port ${app.get('PORT')}`);
})  