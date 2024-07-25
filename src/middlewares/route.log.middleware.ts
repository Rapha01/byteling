import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import { MyRequest } from '../interfaces/util.interface';

const pathExceptions = [
    '/site/vendors/mapbox-gl/mapbox-gl.js.map',
    '/site/vendors/typed.js/typed.umd.js.map',
    '/android-chrome-512x512.png',
    '/android-chrome-192x192.png'
];

const routeLogMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (pathExceptions.indexOf(req.path) > -1) return;

    const time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    let message = '';

    message += time + ' | ' + req.method  + ' |';
    message += ' path: ' + req.path;

    if (Object.keys(req.body).length > 0)
        message += ' | body: ' + JSON.stringify(req.body)

    if (Object.keys(req.params).length > 0)
        message += ' | params: ' + JSON.stringify(req.params)

    if (Object.keys(req.query).length > 0)
        message += ' | query: ' + JSON.stringify(req.query)

    logger.info(message);
    next();
};

export default routeLogMiddleware;
