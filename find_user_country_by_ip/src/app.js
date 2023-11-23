import express from 'express';
import locationController from './controllers/LocationController.js';

const app = express();
const port = 3000;

app.get('/location', locationController.getLocation);

app.listen(port, () => {
  console.info(`Server started on 127.0.0.1:${port}`);
})