const db = require('../db/db');

// Data Acces Object
module.exports = class StudentDAO {

  async createStudent({ firstName, lastName, email }){
    await db('student').insert({
      firstName,
      lastName,
      email
    })
    
  }
}