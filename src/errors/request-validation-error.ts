import { ValidationErrorItem } from 'joi';
import { CustomError } from './CustomError';

export class RequestValidationError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: ValidationErrorItem[]) {
    super('Invalid Request Parameters');
  }

  serializeErrors() {
    return this.errors.map((err) => ({ message: err.message }));
  }
}
