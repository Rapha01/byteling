import { Router } from 'express';
import AdminSiteController from '../controllers/adminSite.controller';
import { Routes } from '../interfaces/routes.interface';

class AdminSiteRoute implements Routes {
  public path = '/admin';
  public router = Router();
  public adminSiteController = new AdminSiteController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, this.adminSiteController.index);
    this.router.get(`${this.path}/localization`, this.adminSiteController.index);
    this.router.get(`${this.path}/settings`, this.adminSiteController.index);
  }
}

export default AdminSiteRoute;
