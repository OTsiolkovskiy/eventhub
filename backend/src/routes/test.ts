import { Router } from 'express';
import { authenticate, AuthRequest } from '../middlewares/auth.middleware';
import { Response } from 'express';

const router = Router();

router.get('/protected', authenticate, (req: AuthRequest, res: Response) => {
  res.json({ message: 'You have access!', user: req.user });
});

export default router;
