
import { Request, Response, NextFunction } from 'express';
import { DefaultError } from '../../../../@types/types';

const errorMiddleware = (err: DefaultError, req: Request, res: Response, next: NextFunction) => {
  // Handle the error here
  console.error(err);

  // Send an error response to the client
  res.status(err.status).json({ err });
};

export default errorMiddleware;
