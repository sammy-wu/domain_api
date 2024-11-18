import { Response } from 'express';
export const errorHandler = (err: any, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
};
