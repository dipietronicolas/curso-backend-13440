const app = require('./server');
const {PORT} = require('./config/globals');

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})