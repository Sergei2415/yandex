/* eslint-disable max-classes-per-file */
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = 'ValidationError';
  }
}

module.exports = { ValidationError };
