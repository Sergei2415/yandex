/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());
app.get('/crash-test', () => { setTimeout(() => { throw new Error('Сервер сейчас упадёт'); }, 0); });
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
    avatar: Joi.string().regex(/^(https?:\/\/(www\.)?(([А-Яа-яA-Za-z0-9-_]\/*\?*=*)+\.[a-z]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(\/?[A-Za-zА-Яа-я0-9-_\/]{1,})?(:\d{1,5})?(\/[A-Za-zА-Яа-я0-9-_\/]{1,})?#?|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?#?)|[A-Za-z]*\.[A-Za-z0-9]{2,20}(:\d{1,5})?(\/?[A-Za-zА-Яа-я0-9-_\/]{1,})?(:\d{1,5})?#?$/i),

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
  const { message } = err;
  if (err.status === 403) {
    return res.status(403).send({ 'Access Denied': message });
  }
  if (err.name === 'AuthorizationError') {
    return res.status(status).send({ 'Authorization Error': message });
  }
  if (err.status === 404) {
    return res.status(status).send({ EntryNotFound: message });
  }
  if (err.joi) {
    return res.status(400).send({ 'Validation error': message });
  }
  if (status === 500) {
    return res.status(500).send({ 'Unexpected error:': 'На сервере произошла ошибка' });
  }
});
app.listen(PORT, () => {});
