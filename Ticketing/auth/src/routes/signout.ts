/** @format */

import { Router, Request, Response } from 'express';
import { requireAuth } from './../middlewares';
const router = Router();

router.post(
  '/api/users/signout',
  requireAuth,
  (req: Request, res: Response) => {
    req.session = null;
    return res.send({});
  }
);

export { router as signOutRouter };
