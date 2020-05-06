/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-throw-literal */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/users');

const { JWT_SECRET = '402271a490b1da84693aaed3aa8b3dbdade403a609d072c6c10b5e4b55d53880' } = process.env;
module.exports.getusers = (req, res) => {
  users.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.postusers = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (password.length < 8) {
    return res.status(401).send({ message: 'Длина пароля долна быть больше 8 символов' });
  }
  bcrypt.hash(password, 10)
    .then((hash) => users.create({
      name, about, avatar, email, password: hash,
    }))
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.getusersid = (req, res) => {
  users.findById(req.params.id)
    .then((user) => {
      if (user == null) {
        throw 'Ошибка при выполнении запроса';
      }
      res.send({ data: user });
    })
    .catch(() => res.status(404).send({ message: 'Произошла ошибка' }));
};
module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('name', token, { maxAge: 3600000 * 24 * 7 });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
