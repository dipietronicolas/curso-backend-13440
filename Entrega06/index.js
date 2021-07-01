// correr con npm run dev06

import { Archivo } from './Archivo.js';
const archivo = new Archivo('Entrega.txt');

const llamadas = async () => {
  // Funciones que escribe el archivo
  await archivo.guardar('Frasco', 500, './assets/img01.jpg');
  await archivo.guardar('Mesa', 8000, './assets/img02.jpg');
  await archivo.guardar('Botella', 600, './assets/img03.jpg');
  
  // Funcion que lee el arhivo
  await archivo.leer();
}

llamadas();

// Funcion que borra el archivo, descomentar para borrar
// archivo.borrar();

