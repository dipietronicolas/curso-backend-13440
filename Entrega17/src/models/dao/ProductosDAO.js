const db = require('../db/db');

// Data Acces Object
module.exports = class ProductosDAO {

  async getProductos() {
    const messages = await db('mensajes').select('*');
    return messages;
  }

  async postProductos({ title, price, thumbnail }) {
    const result = await db('productos').insert({
      title, price, thumbnail
    })
    const productos = await db('mensajes')
      .select('created_at')
      .where('id', `${result[0]}`)
    return {
      email, message, created_at: mensaje[0].created_at
    }
  }
}