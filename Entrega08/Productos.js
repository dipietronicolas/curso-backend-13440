import fs from 'fs';

export class Productos {
  constructor(file_name) {
    this.file_name = file_name;
  }
  
  // Funcion que lee el archivo
  leer = async () => {
    try {
      const data = await fs.promises.readFile(`./Entrega08/${this.file_name}`, 'utf-8');
      if(eval(data).length === 0)
        return {error : 'no hay productos cargados'}
      return (eval(data));
    } catch (error) {
      return {error : 'no se pudo leer el archivo'};
    }
  }

  // Funcion que busca un producto por id
  buscarPorId = async (id) => {
    try {
      const data = await fs.promises.readFile(`./Entrega08/${this.file_name}`, 'utf-8');
      const productos = eval(data).filter(producto => producto.id === Number(id));
      if(productos.length === 0)
        return {error : 'producto no encontrado'};
      return productos[0];
    } catch (error) {
      return {error : 'no se pudo leer el archivo'};
    }
  }

  // Funcion que guarda en el archivo
  guardar = async (title, price, thumbnail) => {
    try {
      const raw_data = await fs.promises.readFile(`./Entrega08/${this.file_name}`, 'utf-8');
      const data = eval(raw_data);
      const arr_data = Array.from(data);
      const new_item = {
        title, price, thumbnail, id: data.length + 1
      };
      arr_data.push(new_item);
      await fs.promises.writeFile(`./Entrega08/${this.file_name}`, JSON.stringify(arr_data));
      return new_item;
    } catch (error) {
      try {
        await fs.promises.writeFile(`./Entrega08/${this.file_name}`, JSON.stringify([{
          title, price, thumbnail, id: 1
        }]));
        return { title, price, thumbnail, id: 1 };
      } catch (writeError) {
        return { 
          msg : 'no se pudo escribir el archivo', 
          error: writeError 
        };
      }
    }
  }


  // Funcion que borra el archivo
  borrar = async () => {
    await fs.promises.unlink(`./Entrega08/${this.file_name}`);
  }
}
