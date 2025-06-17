import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;

  try {
    const token = await authService.register(name, email, password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    res.json({ token })
  } catch (err) {
    res.status(401).json({ error: (err as Error).message})
  }
}