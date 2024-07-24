import { body, header, query } from 'express-validator';
//import { extractToken } from '../utils';

const contactEmail = () => {
    return body('email')
        .trim()
        .escape()
        .bail()
        .isString()
        .isLength({
            min: 0,
            max: 200,
        })
        .withMessage('Email address must be between 0 and 200 characters')
        .bail()
        .customSanitizer((email) => {
            return email.toLowerCase();
        });
};

const newNewsletterSubscriptionEmail = () => {
    return body('email')
        .trim()
        .escape()
        .bail()
        .isString()
        .isLength({
            min: 0,
            max: 200,
        })
        .withMessage('Email address must be between 0 and 200 characters')
        .bail()
        .customSanitizer((email) => {
            return email.toLowerCase();
        });
};


const contactName = () => {
    return body('name')
        .trim()
        .escape()
        .bail()
        .isString()
        .isLength({
            min: 0,
            max: 200,
        })
        .withMessage('Name must be between 0 and 200 characters')
};

const contactPhone = () => {
    return body('phone')
        .trim()
        .escape()
        .bail()
        .isString()
        .isLength({
            min: 0,
            max: 100,
        })
        .withMessage('Phone must be between 0 and 100 characters')
};

const contactMessage = () => {
    return body('message')
        .trim()
        .escape()
        .bail()
        .isString()
        .isLength({
            min: 0,
            max: 10000,
        })
        .withMessage('Message must be between 0 and 10000 characters')
};

export {
    newNewsletterSubscriptionEmail,
    contactEmail,
    contactName,
    contactPhone,
    contactMessage
};