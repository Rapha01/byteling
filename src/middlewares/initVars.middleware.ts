import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import { MyRequest } from '../interfaces/util.interface';


const initVarsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log('initVarsMiddleware body', req.body, req.params);
    res.locals = { user: null, toasts: []};
    next();
};

export default initVarsMiddleware;
