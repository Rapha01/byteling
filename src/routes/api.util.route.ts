import { Router } from 'express';
import UtilController from '../controllers/api.util.controller';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/api.validation.middleware';
import validate from '../middlewares/api.validation.middleware';
import { contactEmail, contactName, contactPhone, contactMessage, newNewsletterSubscriptionEmail } from '../validators/util.validator';

class UtilApiRoute implements Routes {
  public path = '/util';
  public router = Router();
  public utilController = new UtilController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/sendContactForm`, validate([ contactEmail(), contactName(), contactPhone(), contactMessage() ]), this.utilController.sendContactForm);
    this.router.post(`${this.path}/subscribeNewsletter`, validate([ newNewsletterSubscriptionEmail() ]), this.utilController.subscribeNewsletter);
  }
}

export default UtilApiRoute;
