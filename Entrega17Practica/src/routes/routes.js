const { studentController } = require('../controller/student.controller');

module.exports = (router) => {
  router.post('/api/create', studentController);
  router.get('/', (req, res) => {
    res.send('Hola')
  })
  return router;
}