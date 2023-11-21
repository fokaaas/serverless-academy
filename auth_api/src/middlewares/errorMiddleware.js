import { HttpError } from '../utils/HttpError.js';

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ success: false, error: err.message, errors: err.errors });
  }
  console.error(err);
  return res.status(500).json({ success: false, error: 'Internal server error' });
}