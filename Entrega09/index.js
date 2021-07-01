import express from 'express';
const app = express();

// Settings
app.set('PORT', process.env.PORT || 8080);

// Middlewares
app.use(express.static('public'));

app.listen(app.get('PORT'), () => {
  console.log(`Listening on port ${app.get('PORT')}`);
})

app.on("error", error => console.log(`Error del servidor ${error}`));