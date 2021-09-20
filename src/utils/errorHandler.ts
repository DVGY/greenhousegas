import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = err.message;
  res.status(400).json({
    status: 'Error',
    message,
  });
};
