/** @format */

import { Router, Request, Response } from 'express';
import { requireAuth } from './../middlewares';

const router = Router();

router.get(
  '/api/users/currentuser',
  requireAuth,
  (req: Request, res: Response) => {
    return res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
