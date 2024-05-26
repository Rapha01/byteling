import { Router } from 'express';
import UsersController from '../controllers/api.users.controller';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/api.validation.middleware';
import validate from '../middlewares/api.validation.middleware';
import { changePasswordNew, changePasswordOld } from '../validators/user.validator';

class UsersApiRoute implements Routes {
  public path = '/user';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.usersController.getById);
    this.router.put(`${this.path}/changePassword`, validate([changePasswordOld(), changePasswordNew('newPassword'), changePasswordNew('newPasswordConfirm')]) ,this.usersController.changePassword);
    //this.router.get(`${this.path}`, this.usersController.getAll);
    //this.router.post(`${this.path}`, this.usersController.create);
    //this.router.put(`${this.path}/:id`, this.usersController.update);
    //this.router.delete(`${this.path}/:id`, this.usersController.delete);
  }
}

export default UsersApiRoute;
