
import { NextFunction, Request, Response } from 'express';
import { ValidationErrorItem } from 'joi';
import { RequestValidationError } from '../errors/request-validation-error';



export const validateRequest = (schema: any) => {
  return (req: Request,
    res: Response,
    next: NextFunction) => {
    const { error } = schema.validate(req.body);


    if (error) {
      res.status(422).json({
        message: 'Invalid request',
        data: error.details.map((err: ValidationErrorItem) => ({ message: err.message, field: err.path }))
      })
    } next();
  }
}
export default validateRequest
