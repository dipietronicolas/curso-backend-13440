const StudentDAO = require('../models/dao/StudentDAO');

module.exports = class StudentService {
  constructor(){};

  async createStudent(student){
    const studentDAO = new StudentDAO();
    return await studentDAO.createStudent(student);

  };
}