/** @format */

import { Router, Request, Response } from 'express';

const router = Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
  res.send('Sign Out');
});

export { router as signOutRouter };
