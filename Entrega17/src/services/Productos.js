const ProductosDAO = require('../models/dao/ProductosDAO');
const productosDao = new ProductosDAO();

class Productos {
  constructor(file_name) {
    this.file_name = file_name;
  }

  // Funcion que lee la base de datos
  leer = async () => {
    try {
      const productos = await productosDao.getProductos();
      if (productos.length === 0)
        return { error: 'no hay productos cargados' }
      return productos;
    } catch (error) {
      return { error: 'no se pudo leer el archivo' };
    }
  }

  // Funcion que busca un producto por id
  buscarPorId = async (id) => {
    try {
      const producto = await productosDao.getProductoById(id);
      return producto;
    } catch (error) {
      return { error: 'no se pudo leer el archivo' };
    }
  }

  // Funcion que guarda un producto en la base de datos
  guardar = async (title, price, thumbnail) => {
    try {
      const productos = await productosDao.postProductos(title, price, thumbnail);
      return productos;
    } catch (error) {
      return {
        msg: 'no se pudo guardar el producto', error
      };
    }
  }

  // Funcion que modifica un producto
  modificar = async (id, title, price, thumbnail) => {
    try {
      const productos = await productosDao.updateProducto(id, title, null, price, thumbnail);
      return productos;
    } catch (error) {
      return { error: "no se pudo modificar el item" }
    }
  }

  // Funcion que elimina un producto
  eliminarProducto = async (id) => {
    try {
      await productosDao.deleteProducto(id);
    } catch (error) {
      return { error: 'no se pudo leer el archivo' };
    }
  }
}

module.exports = Productos;