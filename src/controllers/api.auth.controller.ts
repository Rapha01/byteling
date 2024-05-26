import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../interfaces/user.interface';
import { MyRequest } from '../interfaces/util.interface';
import { User } from '../interfaces/user.interface';
import { authService, userService } from '../services';
import { logger } from '../utils/logger';
import { ApiError } from '../exceptions/ApiError';
import { HttpError } from '../exceptions/HttpError';
import { emailService } from '../services/';
import config from '../config/config';
import { userModel } from 'models';

class AuthController {
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await authService.register(userData);

      res.status(201).json({ user: signUpUserData, message: 'register' });
    } catch (err: any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };
  
  public verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('verifyEmail',req.body);
      await authService.verifyEmail(req.body.userId, req.body.code);
      /*const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      */
      res.status(201).json({ message: 'success' });
    } catch (err: any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await authService.login(userData);
      logger.debug(cookie);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ user: findUser, message: 'login', cookie: cookie });
    } catch (err: any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loggedInUser: User | null = res.locals.user;
      if (loggedInUser == null) {
        throw new Error('Not logged in'); 
      }
      
      res.setHeader('Set-Cookie', ['Authorization=abcd; HttpOnly; Max-Age=0; path=/']);
      res.status(200).json({ message: 'logout'});
      
    } catch (err: any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('RESETPASSWORD',req.body);

      await authService.resetPassword(req.body.email);

      res.status(201).json({ message: 'success' });
    } catch (err: any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };

  public sendTestEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {


      console.log('SEND TEST EMAIL');
      await emailService.sendTestMail(req.body.email);
      console.log('AFTER SEND');

      res.status(200).json({ testEmail: config.MAIL_TESTEMAIL });
    } catch (err: any) {
      if (err instanceof HttpError) {
        next(new ApiError(err.status, err.message));
      } else
        next(new ApiError(400, err.message));
    }
  };
  
}

export default AuthController;
