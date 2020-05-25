/* eslint-disable no-const-assign */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-throw-literal */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const { EntryNotFound } = require('../errors/EntryNotFound');

module.exports.getusers = (req, res, next) => {
  users.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};
module.exports.postusers = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => users.create({
      name, about, avatar, email, password: hash,
    }))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.getusersid = (req, res, next) => {
  users.findById(req.params.id)
    .then((user) => {
      if (user == null) {
        throw new EntryNotFound('Данный пользователь не был найден');
      }
      res.send({ data: user });
    })
    .catch(next);
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return users.findUserByCredentials(email, password)
    .then((user) => {
      let JWT_SECRET;
      if (process.env.NODE_ENV !== 'production') JWT_SECRET = '402271a490b1da84693aaed3aa8b3dbdade403a609d072c6c10b5e4b55d53880';
      else JWT_SECRET = process.env.JWT_SECRET || '402271a490b1da84693aaed3aa8b3dbdade403a609d072c6c10b5e4b55d53880';
      let token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      token = `Bearer ${token}`;
      res.cookie('authorization', token, { maxAge: 3600000 * 24 * 7 });
      res.send({ token });
    })
    .catch(next);
};
