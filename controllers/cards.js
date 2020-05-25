/* eslint-disable consistent-return */
/* eslint-disable no-throw-literal */
/* eslint-disable linebreak-style */
const cards = require('../models/cards');
const { AuthorizationError } = require('../errors/AuthorizationError');
const { EntryNotFound } = require('../errors/EntryNotFound');

module.exports.getcards = (req, res, next) => {
  cards.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};
module.exports.postcards = (req, res, next) => {
  const owner = req.user._id;
  const {
    name, link,
  } = req.body;
  cards.create({
    name, link, owner,
  })
    .then((card) => res.send({ data: card }))
    .catch(next);
};
module.exports.deletecardsid = (req, res, next) => {
  cards.findById(req.params.id)
    .then((card) => {
      if (card == null) return next(new EntryNotFound('Данная запись не найдена'));
      if (card.owner === req.user._id) {
        res.send({ data: card });
        return cards.findByIdAndRemove(req.params.id);
      }

      return next(new AuthorizationError('Данная запись небыла удалена, так как не вы её создатель'));
    })
    .catch(next);
};
