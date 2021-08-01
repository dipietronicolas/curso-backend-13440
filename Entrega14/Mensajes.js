const fs = require('fs');
const { DateTime } = require("luxon");

class Mensajes {
  constructor(file_name) {
    this.file_name = file_name;
  }
  // Funcion que lee el archivo
  leer = async () => {
    try {
      const data = await fs.promises.readFile(`./${this.file_name}`, 'utf-8');
      const data_json = JSON.parse(data);
      if (data_json.length === 0)
        return { error: 'no hay mensajes previos' }
      return (data_json);
    } catch (error) {
      return { error: 'no se pudo leer el archivo' };
    }
  }

  // Funcion que guarda un producto en el archivo
  guardar = async (email, message) => {
    try {
      const raw_data = await fs.promises.readFile(`./${this.file_name}`, 'utf-8');
      let data = [];
      if(raw_data){
        data = JSON.parse(raw_data);
      } 
      const new_message = {
        email, message,
        time: DateTime.now().toFormat("dd/MM/yyyy, tt")
      };
      data.push(new_message);
      await fs.promises.writeFile(`./${this.file_name}`, JSON.stringify(data));
      return new_message;
    } catch (error) {
      return {
        msg: 'no se pudo guardar el mensaje', error
      };
    }
  }
}

module.exports = Mensajes; 