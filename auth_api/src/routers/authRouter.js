import { Router } from 'express';
import authController from '../controllers/AuthController.js';
import { authValidator } from '../utils/validators/authValidator.js';

const authRouter = new Router();

authRouter.post('/sign-up', ...authValidator, authController.signUp);
authRouter.post('/sign-in', authController.signIn);

export default authRouter;