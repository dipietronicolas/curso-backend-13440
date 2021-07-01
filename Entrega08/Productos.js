import fs from 'fs';

export class Productos {
  constructor(file_name) {
    this.file_name = file_name;
  }
  
  // Funcion que lee el archivo
  leer = async () => {
    try {
      const data = await fs.promises.readFile(`./${this.file_name}`, 'utf-8');
      const data_json = JSON.parse(data);
      if(data_json.length === 0)
        return {error : 'no hay productos cargados'}
      return (data_json);
    } catch (error) {
      return {error : 'no se pudo leer el archivo'};
    }
  }

  // Funcion que busca un producto por id
  buscarPorId = async (id) => {
    try {
      const data = await fs.promises.readFile(`./${this.file_name}`, 'utf-8');
      const productos = JSON.parse(data).filter(producto => producto.id === Number(id));
      if(productos.length === 0)
        return {error : 'producto no encontrado'};
      return productos[0];
    } catch (error) {
      return {error : 'no se pudo leer el archivo'};
    }
  }

  // Funcion que guarda un producto en el archivo
  guardar = async (title, price, thumbnail) => {
    try {
      const raw_data = await fs.promises.readFile(`./${this.file_name}`, 'utf-8');
      const data = JSON.parse(raw_data);
      const new_item = {
        title, price, thumbnail, id: data.length + 1
      };
      data.push(new_item);
      await fs.promises.writeFile(`./${this.file_name}`, JSON.stringify(data));
      return new_item;
    } catch (error) {
      return { 
        msg : 'no se pudo guardar el producto', error 
      };
    }
  }

  // Funcion que borra el archivo
  borrar = async () => {
    await fs.promises.unlink(`./${this.file_name}`);
  }
}
