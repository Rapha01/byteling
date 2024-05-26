import { logger } from '../src/utils/logger';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Toast } from '../src/interfaces/util.interface';

const validate = (validations: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(
            validations.map((validation: any) => validation.run(req))
        );
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            for (const err of errors.array()) {
                const toast: Toast = {type: 'error', title: 'Error', message: err.msg};
                res.locals.toasts.push(toast);
            }
        }
        return next();
    };
};

export default validate;