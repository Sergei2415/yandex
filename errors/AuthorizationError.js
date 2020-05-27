/* eslint-disable max-classes-per-file */
class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    this.name = 'AuthorizationError';
  }
}

module.exports = { AuthorizationError };
