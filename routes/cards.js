/* eslint-disable no-useless-escape */
/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getcards, postcards, deletecardsid } = require('../controllers/cards');

router.get('/cards', getcards);// здесь не стал реализовывать схему, так как ничего не передаем
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(/^(https?:\/\/(www\.)?(([А-Яа-яA-Za-z0-9-_]\/*\?*=*)+\.[a-z]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(\/?[A-Za-zА-Яа-я0-9-_\/]{1,})?(:\d{1,5})?(\/[A-Za-zА-Яа-я0-9-_\/]{1,})?#?|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?#?)|[A-Za-z]*\.[A-Za-z0-9]{2,20}(:\d{1,5})?(\/?[A-Za-zА-Яа-я0-9-_\/]{1,})?(:\d{1,5})?#?$/i),
  }),
}), postcards);
router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deletecardsid);
module.exports = router;
