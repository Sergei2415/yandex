/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, '402271a490b1da84693aaed3aa8b3dbdade403a609d072c6c10b5e4b55d53880');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
