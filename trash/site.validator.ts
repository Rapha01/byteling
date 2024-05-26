import { body, header, query } from 'express-validator';

const verifyEmailUserId = () => {
    return query('userId')
        .trim()
        .escape()
        .optional()
        .bail()
        .isInt()
        .withMessage('Username must be between 3 and 100 characters')
};

const verifyEmailCode = () => {
    return query('code')
        .trim()
        .escape()
        .optional()
        .bail()
        .isLength({
            min: 3,
            max: 100,
        })
        .withMessage('Verification Code must be between 3 and 100 characters')
};

export {
    verifyEmailCode,
    verifyEmailUserId
};