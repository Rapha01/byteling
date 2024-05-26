import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../interfaces/user.interface';
import { User } from '../interfaces/user.interface';
import { userService } from '../services';
import { logger } from '../utils/logger';
import { ApiError } from '../exceptions/ApiError';
import { HttpError } from '../exceptions/HttpError';

class UsersController {
  

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: number = parseInt(req.params.id);
      const findOneUserData: User = await userService.getById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (err : any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };

  public changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loggedInUser: User | null = res.locals.user;
      if (loggedInUser == null) {
        throw new Error('Not logged in'); 
      }

      await userService.changePassword(loggedInUser, req.body.oldPassword, req.body.newPassword);

      res.status(200).json({ message: 'success' });
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

export default UsersController;
