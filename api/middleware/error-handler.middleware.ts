import * as Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

// This middleware does not call next because it is the last middleware
export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction, // next must be declare for express to recognize this as an error middleware handler
): void {
  if (error) {
    if (Boom.isBoom(error)) {
      res.status(error.output.statusCode).json(error.output.payload);
    } else {
      res.status(500).json({ error: true, message: error.message });
    }
  } else {
    _next();
  }
}
