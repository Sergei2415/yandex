/* eslint-disable max-classes-per-file */
class AccessDenied extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
    this.name = 'AccessDenied';
  }
}

module.exports = { AccessDenied };
