/** @format */

import { Request, Response, NextFunction } from 'express';
import { DatabaseConnectionError, RequestValidationError } from './../errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formatedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
    return res.status(400).json({
      errors: formatedErrors,
    });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).json({
      errors: [{ message: err.reason }],
    });
    console.log(`handling this error as a database connection error`);
  }

  res.status(400).json({
    errors: [
      {
        message: 'Something went wrong',
      },
    ],
  });
};
