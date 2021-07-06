import express from 'express';
import { router } from './routes/routes.js';
const app = express();

// Settings
app.set('PORT', process.env.PORT || 8080);

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