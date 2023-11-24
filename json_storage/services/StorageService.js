import { dirname } from 'node:path';
import fs from 'node:fs/promises';

class StorageService {
  async saveJson(body, path) {
    await fs.mkdir(dirname(path), { recursive: true });
    await fs.writeFile(path, JSON.stringify(body));
    return body;
  }

  async getJson(path) {
    const data = await fs.readFile(path, 'utf-8')
    return JSON.parse(data);
  }
}

export default new StorageService();