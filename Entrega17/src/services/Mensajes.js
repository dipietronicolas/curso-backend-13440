const MensajesDAO = require('../models/dao/MensajesDAO');
const mensajesDao = new MensajesDAO();

class Mensajes {
  constructor(file_name) {
    this.file_name = file_name;
  }

  // Funcion que lee el archivo
  leer = async () => {
    try {
      const mensajes = await mensajesDao.getMessages();
      if (mensajes.length === 0)
        return { error: 'no hay mensajes previos' }
      return (mensajes);
    } catch (error) {
      return { error: 'no se pudo leer la base de datos' };
    }
  }

  // Funcion que guarda un producto en el archivo
  guardar = async (email, message) => {
    try {
      return mensajesDao.postMessage({
        email, message
      });
    } catch (error) {
      return {
        msg: 'no se pudo guardar el mensaje', error
      };
    }
  }
}

module.exports = Mensajes; 