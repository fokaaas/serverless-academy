import { body } from 'express-validator';

export const authValidator =  [
  body('email')
    .isEmail().withMessage('Email is not valid'),
  body('password')
    .isLength({ min: 8, max: 32 }).withMessage('Password must be between 8 and 32 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d).+$/).withMessage('Password must include at least 1 digit and 1 letter')
]