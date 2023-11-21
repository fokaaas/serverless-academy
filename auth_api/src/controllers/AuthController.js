import authService from '../services/AuthService.js';
import {validationResult} from "express-validator";
import {HttpError} from "../utils/HttpError.js";

class AuthController {
  async signUp(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) next(HttpError.invalidData(errors.array()));

    const { email, password } = req.body;
    await authService.signUp(email, password)
      .then((data) => {
        res.cookie('refreshToken', data.refreshToken);
        return res.status(201).json({ success: true, data });
      })
      .catch(next);
  }

  async signIn(req, res, next) {
    const { email, password } = req.body;
    await authService.signIn(email, password)
      .then((data) => {
        res.cookie('refreshToken', data.refreshToken);
        return res.status(200).json({ success: true, data });
      })
      .catch(next);
  }
}

export default new AuthController();