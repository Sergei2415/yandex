/* eslint-disable consistent-return */
/* eslint-disable import/no-dynamic-require */

const router = require('express').Router();
const { getusers, getusersid } = require('../controllers/users');

router.get('/users', getusers);
router.get('/users/:id', getusersid);

module.exports = router;
