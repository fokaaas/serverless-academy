import express from 'express';
import storageController from "../controllers/StorageController.js";

const app = express();
const port = 3000;

app.use(express.json());

app.put('/:path*', storageController.saveJson);
app.get('/:path*', storageController.getJson);

app.listen(port, () => {
  console.info(`Server started on 127.0.0.1:${port}`);
})