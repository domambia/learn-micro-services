/** @format */

import { Router, Request, Response } from 'express';

const router = Router();

router.post('/api/users/signin', (req: Request, res: Response) => {
  res.send('Hi Signin');
});

export { router as signInRouter };
