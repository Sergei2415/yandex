/* eslint-disable consistent-return */
/* eslint-disable import/no-dynamic-require */

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getusers, getusersid } = require('../controllers/users');

router.get('/users', getusers);// здесь не стал реализовывать схему, так как ничего не передаем
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getusersid);

module.exports = router;
