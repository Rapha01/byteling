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

const changePasswordOld = () => {
    return body('oldPassword')
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

const changePasswordNew = (field : string) => {
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
            if (field === 'newPasswordConfirm' && value !== req.body.newPassword) {
                throw new Error(
                    'Password confirmation does not match password'
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
    changePasswordOld,
    changePasswordNew
    // token
};