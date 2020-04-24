/* eslint-disable no-throw-literal */
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
    name, link,
  } = req.body;
  cards.create({
    name, link, owner,
  })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
module.exports.deletecardsid = (req, res) => {
  cards.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card == null) { throw 'Ошибка при выполнении запроса'; }
      res.send({ data: card });
    })
    .catch(() => res.status(404).send({ message: 'Произошла ошибка' }));
};
