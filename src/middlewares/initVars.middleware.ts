import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import { MyRequest } from '../interfaces/util.interface';


const initVarsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    res.locals = { user: null, toasts: []};
    next();
};

export default initVarsMiddleware;
