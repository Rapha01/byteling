import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../config/config';
import { HttpException } from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';
import userModel from '../models/users.model';
import { logger } from '../utils/logger';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  req.user = null;
  
  try {
    let authorization: string | null = null;
    if (req.cookies && req.cookies['Authorization'])
      authorization = req.cookies['Authorization'];

    if (req.header && req.header('Authorization') != '')
      authorization = req.header('Authorization')?.split('Bearer ')[1] || null;

    //const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization')?.split('Bearer ')[1] : null);
    //logger.debug(authorization);
    if (authorization) {
      const secretKey: string = config.JWT_SECRET_KEY;
      const verificationResponse = (await verify(authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await userModel.getById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        //next(new HttpException(401, 'Wrong authentication token'));
        next();
      }
    } else {
      //next(new HttpException(404, 'Authentication token missing'));
      next();
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
