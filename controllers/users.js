/* eslint-disable no-throw-literal */
const users = require('../models/users');

module.exports.getusers = (req, res) => {
  users.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.postusers = (req, res) => {
  const { name, about, avatar } = req.body;
  users.create({ name, about, avatar })
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
