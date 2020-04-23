/* eslint-disable linebreak-style */
const cards = require('../models/cards');

module.exports.getcards = (req, res) => {
  cards.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.postcards = (req, res) => {
  const owner = req.user._id;
  const {
    name, link, likes, createdAt,
  } = req.body;
  cards.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.deletecardsid = (req, res) => {
  cards.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Произошла ошибка' }));
};
