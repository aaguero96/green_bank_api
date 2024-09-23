import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

export const validateRequest = async <T, V>(
  classToCompare: ClassConstructor<T>,
  request: V,
): Promise<T> => {
  const req = plainToClass(classToCompare, request);

  if (typeof req !== 'object') {
    throw new Error('req is not object');
  }

  const validateErrors = await validate(req);
  if (validateErrors.length !== 0) {
    throw new ValidationException(validateErrors);
  }

  return req;
};
