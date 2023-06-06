import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

type Property = 'body' | 'query' | 'params';

export default function validatorHandler<T extends z.AnyZodObject>(
  schema: T,
  property: Property,
) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const payload = req[property];
    const validation = schema.strict().safeParse(payload);
    if (validation.success === false) {
      const formattedError = fromZodError(validation.error);
      const error = new Error(formattedError.message);
      next(error);
    }
    next();
  };
}
