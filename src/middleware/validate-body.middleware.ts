import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export default function validateBody<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const body = req.body;
    try {
      schema.parseAsync(body);
    } catch (error) {
      const formattedError = fromZodError(error);
      throw new Error(formattedError.message);
    }
    next();
  };
}
