import express from 'express';
import cookieParser from 'cookie-parser';
import { client } from '../database/Db.js';
import authRouter from './routers/authRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express()
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cookieParser())

app.use('/auth', authRouter);
app.get('/me', authMiddleware, (req, res) => {
  return res.status(200).json({ success: true, data: req.user });
});

app.use(errorMiddleware);

await client.connect()
app.listen(port, () => {
  console.info(`Server started on 127.0.0.1:${port}`)
})