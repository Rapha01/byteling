import { Router } from 'express';
import SiteController from '../controllers/site.controller';
import { Routes } from '../interfaces/routes.interface';

class ErrorRoute implements Routes {
  public router = Router();
  public localizedRouter = Router();
  public siteController = new SiteController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`*`, [], this.siteController.error_404);
    //this.localizedRouter.get(`/:locale/*`, [], this.siteController.error_404);
  }
}

export default ErrorRoute;