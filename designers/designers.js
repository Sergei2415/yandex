/* eslint-disable max-classes-per-file */
class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
    this.name = 'AuthorizationError';
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = 'ValidationError';
  }
}
class EntryNotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.name = 'ErrorNotFound';
  }
}
module.exports = { AuthorizationError, ValidationError, EntryNotFound };
