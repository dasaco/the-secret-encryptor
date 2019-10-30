import { Request, Response, NextFunction } from 'express';

export const getIndex = (req: Request, res: Response, next: NextFunction) => {
  res.send('Welcome to the secret encryptor!');
};

export default {
  getIndex,
};
