const StudentService = require('../services/Student');

exports.studentController = async (req, res, next) => {
  const student = new StudentService();
  await student.createStudent(req.body);
  res.status(200).json({
    msg: 'student created succesfully',
    ...req.body
  })
}