import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../interfaces/user.interface';
import { User } from '../interfaces/user.interface';
import { userService } from '../services';
import { logger } from '../utils/logger';
import { ApiError } from '../exceptions/ApiError';
import { HttpError } from '../exceptions/HttpError';

class UtilController {
  

  public sendContactForm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('sendContactForm');      

      res.status(200).json({ data: { }, message: 'findOne' });
    } catch (err : any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };

  public subscribeNewsletter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('subscribeNewsletter');      

      res.status(200).json({ data: { }, message: 'findOne' });
    } catch (err : any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };

  /*
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await userService.getAll();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (err : any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: User = await userService.update(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (err : any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.id);
      const deleteUserData: User = await userService.delete(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (err : any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };*/
}

export default UtilController;
