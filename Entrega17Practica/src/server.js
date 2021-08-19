const express = require('express'),
  compression = require('compression'),
  cors = require('cors'),
  router = express.Router();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/routes')(router));
// require('./routes/routes')

module.exports = app;