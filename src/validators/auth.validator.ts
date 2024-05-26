import { body, header, query } from 'express-validator';
//import { extractToken } from '../utils';

const authorization = () => {
    return header('authorization')
        .trim()
        .escape()
        .exists()
        .notEmpty()
        .withMessage('Missing authentication header')
        .bail()
        .customSanitizer((token, { location }) => {
            if (location === 'headers') {
                //return extractToken(token);
            }
        })
        .isJWT()
        .withMessage(
            'Invalid Authorization header, must be Bearer authorization'
        );
};

const username = () => {
    return body('email')
        .trim()
        .escape()
        .exists()
        .notEmpty()
        .withMessage('Username address is required')
        .bail()
        .isLength({
            min: 3,
            max: 100,
        })
        .withMessage('Username must be between 3 and 100 characters')
        /*.customSanitizer((username) => {
            return username.toLowerCase();
        });*/
};

const email = () => {
    return body('email')
        .trim()
        .escape()
        .exists()
        .notEmpty()
        .withMessage('Email address is required')
        .bail()
        .isLength({
            min: 3,
            max: 100,
        })
        .withMessage('Email address must be between 3 and 100 characters')
        .bail()
        .isEmail()
        .withMessage('Email address is not valid')
        .customSanitizer((email) => {
            return email.toLowerCase();
        });
};

const verifyEmailUserId = () => {
    return body('userId')
        .trim()
        .escape()
        .exists()
        .notEmpty()
        .withMessage('userId is required')
        .bail()
        .isInt()
        .withMessage('Username must be between 3 and 100 characters')
};

const verifyEmailCode = () => {
    return body('code')
        .trim()
        .escape()
        .exists()
        .notEmpty()
        .withMessage('Verification Code is required')
        .bail()
        .isLength({
            min: 3,
            max: 100,
        })
        .withMessage('Verification Code must be between 3 and 100 characters')
};

const loginPassword = () => {
    return body('password')
        .trim()
        .escape()
        .exists()
        .notEmpty()
        .isString()
        .isLength({
            max: 255,
        })
        .withMessage('Password is not valid');
};

const registerPassword = (field : string) => {
    return body(field)
        .trim()
        .escape()
        .isString()
        .isLength({ min: 8 })
        .withMessage(
            `${field === 'password' ? 'Password' : 'Confirm password'
            } should not be empty and at a minimum eight characters.`
        )
        .bail()
        .custom((value, { req }) => {
            if (field === 'passwordConfirm' && value !== req.body.password) {
                throw new Error(
                    'Password confirmation does not match password'
                );
            }
            return true;
        });
};

const resetPassword = (field: string) => {
    return body(field)
        .trim()
        .escape()
        .isString()
        .isLength({ min: 8 })
        .withMessage(
            `${field} should not be empty and at a minimum eight characters.`
        )
        .bail()
        .custom((value, { req }) => {
            if (
                field === 'confirmationPassword' &&
                value !== req.body.newPassword
            ) {
                throw new Error(
                    'Confirmation password does not match password'
                );
            }
            return true;
        });
};


/** Token */
// const token = (field) => {
//     return body(field)
//         .trim()
//         .escape()
//         .exists()
//         .notEmpty()
//         .withMessage('Token is required')
//         .bail()
//         .isJWT()
//         .withMessage('Invalid token');
// };

export {
    authorization,
    username,
    email,
    registerPassword,
    loginPassword,
    verifyEmailCode,
    verifyEmailUserId
    // token
};