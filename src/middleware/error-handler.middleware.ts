import * as Boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';

export default function errorHandler() {
  return (
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    if (error) {
      if (Boom.isBoom(error)) {
        res.status(error.output.statusCode).json(error.output.payload);
      } else {
        res.status(500).json({ error: true, message: error.message });
      }
    }
    next(error);
  };
}
