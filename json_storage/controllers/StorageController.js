import { join } from 'node:path';
import storageService from '../services/StorageService.js';

class StorageController {
  async saveJson(req, res) {
    const path = join('storage', req.params.path, req.params[0])
    const data = await storageService.saveJson(req.body, path);
    return res.status(201).json(data);
  }

  async getJson(req, res) {
    const path = join('storage', req.params.path, req.params[0])
    await storageService.getJson(path)
      .then((data) => res.status(200).json(data))
      .catch(() => res.status(404).json({ message: 'Path is wrong' }));
  }
}

export default new StorageController()