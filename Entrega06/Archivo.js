//const fs = require('fs');
import fs from 'fs';

export class Archivo {
  constructor(file_name) {
    this.file_name = file_name;
  }
  // Funcion que lee el archivo
  leer = async () => {
    try {
      const data = await fs.promises.readFile(`./Entrega06/${this.file_name}`, 'utf-8');
      console.log(eval(data));
    } catch (error) {
      console.log([]);
    }
  }
  // Funcion que guarda en el archivo
  guardar = async (title, price, thumbnail) => {
    try {

      const raw_data = await fs.promises.readFile(`./Entrega06/${this.file_name}`, 'utf-8');
      const data = eval(raw_data);

      const arr_data = Array.from(data);
      arr_data.push({
        title, price, thumbnail, id: data.length + 1
      })
      await fs.promises.writeFile(`./Entrega06/${this.file_name}`, JSON.stringify(arr_data))
    } catch (error) {
      await fs.promises.writeFile(`./Entrega06/${this.file_name}`, JSON.stringify([{
        title, price, thumbnail, id: 1
      }]))
    }

  }
  // Funcion que borra el archivo
  borrar = async () => {
    await fs.promises.unlink(`./Entrega06/${this.file_name}`);
  }
}

//module.exports = Archivo;