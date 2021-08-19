const db = require('../db/db');

// Data Acces Object
module.exports = class ProductosDAO {

  async getProductos() {
    const productos = await db('products').select('*');
    return productos;
  }

  async getProductoById(id) {
    const producto = await db('products').select('*').where('id', id);
    return producto;
  }

  async postProductos(title, price, thumbnail) {
    const result = await db('products').insert({
      title, price, thumbnail
    })
    console.log(result);
    return {
      id: result[0], title, price, thumbnail
    }
  }

  async updateProducto(id, title, description = null, price, thumbnail) {
    await db('products')
      .where({ id: Number(id) })
      .update({ title, description, price, thumbnail })
    const producto = await db('products').select('*').where('id', Number(id));
    return producto;
  }

  async deleteProducto(id) {
    const result = await db('products')
      .where({ id: Number(id) })
      .del()
    console.log(result);
  }
}