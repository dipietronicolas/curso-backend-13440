'use strict';

var express = require('express');
var handlebars = require('express-handlebars');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Estableciendo la configuracion de handlebars
app.engine('hbs', // Nombre referencia a la plantilla
handlebars({ // Funcion de configuracion de handlebars
  extname: 'hbs', // Extension a utilizar
  defaultLayout: 'index.hbs', // Plantilla principal
  layoutsDir: './src/views/layouts', // Ruta a la plantilla principal
  partialsDir: './src/views/partials/' // Ruta a las plantillas parciales
}));

// Settings
app.set('PORT', process.env.PORT || 8080);
// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "hbs");
// Estableciendo el directorio donde se encuentran los archivos de plantillas
app.set("views", "./src/views");

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(require('./routes/routes')(io));
// app.use(router);

http.listen(app.get('PORT'), function () {
  console.log('Listening on port ' + app.get('PORT'));
});
