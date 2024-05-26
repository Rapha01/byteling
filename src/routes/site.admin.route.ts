import { Router,} from 'express';
import AdminSiteController from '../controllers/site.admin.controller';
import { Routes } from '../interfaces/routes.interface';

class AdminSiteRoute implements Routes {
  public router = Router();
  public localizedRouter = Router();
  public adminSiteController = new AdminSiteController();

  public subpaths = [
    { path: '', middlewares: [], controller: this.adminSiteController.index },
    { path: 'localization', middlewares: [], controller: this.adminSiteController.localization },
    { path: 'test', middlewares: [], controller: this.adminSiteController.test },
  ];

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    for (let subpath of this.subpaths) { 
      this.router.get(`/admin/${subpath.path}`, subpath.middlewares, subpath.controller);
      this.localizedRouter.get(`/:locale/admin/${subpath.path}`, subpath.middlewares, subpath.controller);
    }
  }
}

export default AdminSiteRoute;
