/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cardrouter = require('./routes/cards');
const userrouter = require('./routes/users');
const { postusers, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
    avatar: Joi.string().min(2).required(),
  }),
}), postusers);
app.use(errors());
app.use(auth);

app.use(cardrouter);
app.use(userrouter);
app.all('*', (req, res) => { res.send(404, { message: 'Запрашиваемый ресурс не найден' }); });
app.use(errorLogger);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  let { message } = err;
  if (err.name === 'AuthorizationError') {
    return res.status(status).send(`Authorization Error:\n${message}`);
  }
  if (err.status === 404) {
    return res.status(status).send(`EntryNotFound:\n${message}`);
  }
  if (err.joi) {
    return res.status(400).send(`Validation error:\n${message}`);
  }
  if (status === 500) {
    message = 'Unexpected error';
  }

  res.status(status).send(message);
});
app.listen(PORT, () => {});
