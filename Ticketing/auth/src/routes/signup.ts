/** @format */

import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from './../models/user';
import { RequestValidationError, BadRequestError } from './../errors';

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
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors.array());
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email already in user');
    }

    const user = User.build({ email, password });
    await user.save();
    res.send({
      message: 'User created sucessfully',
      token: 'wewerwrwrwrwr',
      user,
    });
  }
);

export { router as signUpRouter };
