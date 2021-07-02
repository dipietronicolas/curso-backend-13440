import express from 'express';
const app = express();

// Settings
app.set('PORT', process.env.PORT || 8080);

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('todo bien')
})

app.listen(app.get('PORT'), () => {
  console.log(`Listening on port ${app.get('PORT')}`);
})

app.on("error", error => console.log(`Error del servidor ${error}`));