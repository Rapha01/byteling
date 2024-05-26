import { logger } from '../utils/logger';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validate = (validations: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(
            validations.map((validation: any) => validation.run(req))
        );
        const result = validationResult(req);
        
        if (result.isEmpty()) {
            return next();
        }
        const errors = result.array().map((error) => {
            return {
                type: error.type,
                message: error.msg,
                code: 422,
            };
        });

        res.status(422).json({ errors });
    };
};

export default validate;