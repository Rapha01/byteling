import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';

const validationMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    
      // if (errors.length > 0) {
      //   const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
      //   next(new HttpException(400, message));
      // } else {
        next();
      // }
    };
};

export default validationMiddleware;
