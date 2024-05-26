import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config/config';
import { DataStoredInToken } from '../interfaces/auth.interface';
import { MyRequest } from '../interfaces/util.interface';
import { userService } from '../services';
import { logger } from '../utils/logger';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //throw new ClientError('GGGGGGGGGGGG');
    let authorization: string | null = null;
    
    
    if (req.cookies.Authorization)
      authorization = req.cookies['Authorization'];
      
    /*
    const bool: boolean = req.cookies.Authorization;
    console.log('req.cookies',req.cookies);
    console.log('req.cookies.Authorization',typeof req.cookies.Authorization);
    console.log('authorization',authorization);
    console.log('bool',bool);
    */

    // if (req.header && req.header('Authorization') != '')
    //   authorization = req.header('Authorization')?.split('Bearer ')[1] || null;

    if (authorization) {
      const secretKey: string = config.JWT_SECRET_KEY;
      const verificationResponse = (await verify(authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await userService.getById(userId);

      if (findUser) {
        res.locals.user = findUser;
      }
    }
  } catch (error : any) {
    //next(new ClientError('Wrong authentication token'));
    logger.error(error.message)
  }
  
  next();
};

export default authMiddleware;
