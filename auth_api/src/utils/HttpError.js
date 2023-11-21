export class HttpError extends Error {
  constructor(statusCode, message, errors) {
    super(message)
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static emailIsAlreadyTaken(email) {
    return new HttpError(409, `Email ${email} is taken already`);
  }

  static invalidEmailOrPassword() {
    return new HttpError(404, 'Invalid email or password');
  }

  static unauthorized() {
    return new HttpError(401, 'Unauthorized');
  }

  static invalidData(errors) {
    return new HttpError(400, 'Data is invalid', errors);
  }
}