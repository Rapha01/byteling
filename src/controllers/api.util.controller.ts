import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/ApiError';
import { HttpError } from '../exceptions/HttpError';
import { emailService } from '../services/';
import { sleep } from '../utils/util';

class UtilController {
  public sendContactForm = async (req: Request, res: Response, next: NextFunction) => {
    try {    
      await sleep(1000);

      await emailService.sendContactEmail(req.body.email, req.body.name, req.body.phone, req.body.message);

      res.status(200).json({ data: { sent: true }, message: 'ok' });
    } catch (err : any) {
      if (err instanceof HttpError)
        next(new ApiError(err.status, err.message));
      else
        next(new ApiError(400, err.message));
    }
  };

  public subscribeNewsletter = async (req: Request, res: Response, next: NextFunction) => {
    try {     
      await sleep(1000);

      await emailService.sendNewNewsletterSubscriptionEmail(req.body.email);

      res.status(200).json({ data: { sent: true }, message: 'ok' });
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
