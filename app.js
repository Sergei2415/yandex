
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardrouter = require('./routes/cards');
const userrouter = require('./routes/users');
const { postusers, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.post('/signin', login);
app.post('/signup', postusers);

app.use(auth);

app.use(cardrouter);
app.use(userrouter);
app.all('*', (req, res) => { res.send(404, { message: 'Запрашиваемый ресурс не найден' }); });
app.listen(PORT, () => {});
