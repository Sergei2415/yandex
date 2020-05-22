/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getcards, postcards, deletecardsid } = require('../controllers/cards');

router.get('/cards', getcards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().min(2).required(),
  }),
}), postcards);
router.delete('/cards/:id', deletecardsid);
module.exports = router;
