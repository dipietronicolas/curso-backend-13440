const fs = require('fs');
const { DateTime } = require("luxon");

class Productos {
  constructor(file_name) {
    this.file_name = file_name;
  }

  // Funcion que lee el archivo
  leer = async () => {
    try {
      const data = await fs.promises.readFile(`./${this.file_name}`, 'utf-8');
      const data_json = JSON.parse(data);
      if (data_json.length === 0)
        return { error: 'no hay productos cargados' }
      return (data_json);
    } catch (error) {
      return { error: 'no se pudo leer el archivo' };
    }
  }

  // Funcion que busca un producto por id
  buscarPorId = async (id) => {
    try {
      const data = await fs.promises.readFile(`./${this.file_name}`, 'utf-8');
      const productos = JSON.parse(data).filter(producto => producto.id === Number(id));
      if (productos.length === 0)
        return { error: 'producto no encontrado' };
      return productos[0];
    } catch (error) {
      return { error: 'no se pudo leer el archivo' };
    }
  }

  // Funcion que guarda un producto en el archivo
  guardar = async (title, description, price, stock, thumbnail) => {
    try {
      const raw_data = await fs.promises.readFile(`./${this.file_name}`, 'utf-8');
      const data = JSON.parse(raw_data);
      const new_item = {
        id: data.length === 0 ? 1 : data[data.length - 1].id + 1, 
        timestamp: DateTime.now().toFormat("dd/MM/yyyy, tt"),
        title, description, price, stock, thumbnail
      };
      data.push(new_item);
      await fs.promises.writeFile(`./${this.file_name}`, JSON.stringify(data));
      return new_item;
    } catch (error) {
      return {
        msg: 'no se pudo guardar el producto', error
      };
    }
  }

  // Funcion que modifica un producto
  modificar = async ({ id, title, description, price, stock, thumbnail }) => {
    // id enviado por URL params,
    // title, description, price, stock, thumbnail 
    // enviados por postman, como campos x-www-form-urlencoded
    let foundFlag = false;
    try {
      let items = await this.leer();
      if (items.error)
        return items;

      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          items[i].title = title;
          items[i].description = description;
          items[i].price = price;
          items[i].stock = stock;
          items[i].thumbnail = thumbnail;
          foundFlag = true;
        }
      }
      if (!foundFlag)
        return { error: "producto no encontrado" }

      await fs.promises.writeFile(`./${this.file_name}`, JSON.stringify(items));
      return { id, title, description, price, stock, thumbnail };
    } catch (error) {
      return { error: "no se pudo modificar el item" }
    }
  }

  // Funcion que elimina un producto
  eliminarProducto = async (id) => {
    try {
      const data = await fs.promises.readFile(`./${this.file_name}`, 'utf-8');
      const productoEncontrado = JSON.parse(data).filter(producto => producto.id === Number(id));
      if (productoEncontrado.length === 0)
        return { error: 'producto no encontrado' };

      const nuevaData = JSON.parse(data).filter(producto => producto.id !== Number(id));
      await fs.promises.writeFile(`./${this.file_name}`, JSON.stringify(nuevaData));
      return productoEncontrado;
    } catch (error) {
      return { error: 'no se pudo leer el archivo' };
    }
  }

  // Funcion que borra el archivo
  borrar = async () => {
    await fs.promises.unlink(`./${this.file_name}`);
  }
}

module.exports = Productos;