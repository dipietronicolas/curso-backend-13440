import express from 'express';
import { router } from './routes/routes.js';
import handlebars from 'express-handlebars';

const app = express();

// Estableciendo la configuracion de handlebars
app.engine(
  'hbs',                      // Nombre referencia a la plantilla
  handlebars({                // Funcion de configuracion de handlebars
    extname: 'hbs',           // Extension a utilizar
    defaultLayout: 'index.hbs',   // Plantilla principal
    layoutsDir: `./views/layouts`,   // Ruta a la plantilla principal
    partialsDir: `./views/partials/` // Ruta a las plantillas parciales
  })
)

// Settings
app.set('PORT', process.env.PORT || 8080);
// Estableciendo el motor de plantilla que se utiliza
app.set("view engine", "hbs");
// Estableciendo el directorio donde se encuentran los archivos de plantillas
app.set("views", "./views");

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

app.listen(app.get('PORT'), () => {
  console.log(`Listening on port ${app.get('PORT')}`);
})

app.on("error", error => console.log(`Error del servidor ${error}`));