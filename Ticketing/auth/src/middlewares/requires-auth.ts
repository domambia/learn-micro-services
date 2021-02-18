/** @format */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from './../errors/not-authorized';

interface UserPayload {
  id: string;
  email: string;
}

// adding argumented type defination. Adding new properties
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    throw new NotAuthorizedError();
    return;
  }
  try {
    const payload = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;

    if (!req.currentUser) {
      throw new NotAuthorizedError();
      return;
    }
    next();
  } catch (err) {}
  throw new NotAuthorizedError();
  return;
};
