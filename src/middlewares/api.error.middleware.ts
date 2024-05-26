import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { logger } from '../utils/logger';

const apiErrorMiddleware = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    console.log('AAAAA');
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({ errors: [{ type: 'error', message, status}]});
  } catch (error) {
    next(error);
  }
};

export default apiErrorMiddleware;