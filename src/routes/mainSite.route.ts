import { Router } from 'express';
import MainSiteController from '../controllers/mainSite.controller';
import { Routes } from '../interfaces/routes.interface';

class MainSiteRoute implements Routes {
  public path = '/';
  public router = Router();
  public mainSiteController = new MainSiteController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.mainSiteController.index);
    this.router.get(`${this.path}/page1`, this.mainSiteController.index);
    this.router.get(`${this.path}/page2`, this.mainSiteController.index);
    this.router.get(`${this.path}/page3`, this.mainSiteController.index);
  }
}

export default MainSiteRoute;
