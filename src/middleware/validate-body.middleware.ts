import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export default function validateBody<T extends z.AnyZodObject>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const body = req.body;
    const validation = schema.strict().safeParse(body);
    if (validation.success === false) {
      const formattedError = fromZodError(validation.error);
      const error = new Error(formattedError.message);
      next(error);
    }
  };
}
