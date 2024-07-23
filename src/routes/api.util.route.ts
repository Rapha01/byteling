import { Router } from 'express';
import UtilController from '../controllers/api.util.controller';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/api.validation.middleware';
import validate from '../middlewares/api.validation.middleware';
import { changePasswordNew, changePasswordOld } from '../validators/user.validator';

class UtilApiRoute implements Routes {
  public path = '/util';
  public router = Router();
  public utilController = new UtilController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/sendContactForm`, this.utilController.sendContactForm);
    this.router.get(`${this.path}/subscribeNewsletter`, this.utilController.subscribeNewsletter);
  }
}

export default UtilApiRoute;
