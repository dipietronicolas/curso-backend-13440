const db = require('../db/db');

// Data Acces Object
module.exports = class MensajesDAO {

  async getMessages() {
    const messages = await db('mensajes').select('*');
    return messages;
  }

  async postMessage({ email, message }) {
    const result = await db('mensajes').insert({
      email, message
    })
    const mensaje = await db('mensajes')
      .select('created_at')
      .where('id', `${result[0]}`)
    return {
      email, message, created_at: mensaje[0].created_at
    }
  }
}