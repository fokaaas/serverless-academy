import jwt from 'jsonwebtoken';
import db from '../../database/Db.js';
import { Payload } from '../utils/Payload.js';

const secret = process.env.SECRET;
const expiresIn = process.env.TTL;

class JwtService {
  generateTokens(user) {
    const payload = new Payload(user)
    return {
      accessToken: jwt.sign({ ...payload }, secret, { expiresIn }),
      refreshToken: jwt.sign({ ...payload }, secret),
    };
  }

  async saveToken(id, token) {
    const query = `UPDATE users SET refresh_token = '${token}' WHERE id = ${id}`;
    await db.queryOne(query);
  }

  validate(token) {
    try {
      return jwt.verify(token, secret);
    } catch (e) {
      return null;
    }
  }
}

export default new JwtService();
