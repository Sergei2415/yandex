/* eslint-disable import/no-dynamic-require */
const router = require('express').Router();
const { getcards, postcards, deletecardsid } = require('../controllers/cards');

router.get('/cards', getcards);
router.post('/cards', postcards);
router.delete('/cards/:id', deletecardsid);
module.exports = router;
