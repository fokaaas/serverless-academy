import db from '../../database/Db.js';
import { HttpError } from '../utils/HttpError.js';
import jwtService from './JwtService.js';
import bcrypt from 'bcrypt';

class AuthService {
  async signUp(email, password) {
    const candidate = await this.getUser(email);
    if (candidate) throw HttpError.emailIsAlreadyTaken(email);

    const hashedPassword = await bcrypt.hash(password, 7);
    const query = 'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *';
    const user = await db.queryOne(query, [email, hashedPassword]);

    return this.refreshTokens(user);
  }

  async signIn(email, password) {
    const user = await this.getUser(email);
    if (!user) throw HttpError.invalidEmailOrPassword();

    const isEquals = await bcrypt.compare(password, user.password);
    if (!isEquals) throw HttpError.invalidEmailOrPassword();

    return this.refreshTokens(user);
  }

  async refreshTokens(user) {
    const tokens = jwtService.generateTokens(user);
    await jwtService.saveToken(user.id, tokens.refreshToken);
    return { id: user.id, ...tokens };
  }

  async getUser(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    return db.queryOne(query, [email]);
  }
}

export default new AuthService();