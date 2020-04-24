
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardrouter = require('./routes/cards');
const userrouter = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use((req, res, next) => {
  req.user = {
    _id: '5ea084a69595cc29d89ef674',
  };
  next();
});
app.use(cardrouter);
app.use(userrouter);
app.all('*', (req, res) => { res.send(404, { message: 'Запрашиваемый ресурс не найден' }); });
app.listen(PORT, () => {});
