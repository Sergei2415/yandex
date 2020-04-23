const users = require('../models/users');

module.exports.getusers = (req, res) => {
  users.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.postusers = (req) => {
  const { name, about, avatar } = req.body;
  users.create({ name, about, avatar });
};
module.exports.getusersid = (req, res) => {
  users.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
