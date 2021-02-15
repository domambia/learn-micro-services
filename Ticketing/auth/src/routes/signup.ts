/** @format */

import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError, RequestValidationError } from './../errors';

const router = Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Your email must valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    console.log('Creating User');

    throw new DatabaseConnectionError();

    res.send('Hi Sign Up');
  }
);

export { router as signUpRouter };
