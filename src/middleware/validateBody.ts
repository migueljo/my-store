import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export default function validateBody<T extends z.ZodTypeAny>(schema: T) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const body = req.body;
    const validation = schema.safeParse(body);
    if (validation.success === false) {
      const formattedError = fromZodError(validation.error);
      console.log({ formattedError: formattedError.message });
      throw new Error(formattedError.message);
    }
    next();
  };
}
