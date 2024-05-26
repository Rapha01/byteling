import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import { MyRequest } from '../interfaces/util.interface';
import { emailService } from '../services/';

class AdminController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user || (res.locals.user.role != 'admin' && res.locals.user.role != 'mod'))
      return res.redirect('/login')


    res.render('admin/index');
  };

  public test = (req: Request, res: Response, next: NextFunction) => {
    //if (!res.locals.user || (res.locals.user.role != 'admin' && res.locals.user.role != 'mod'))
      //return res.redirect('/login')

    console.log('test params', req.params);
    res.render('admin/test');
  };
  
  public localization = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user)
      return res.redirect('/login');

    res.render('admin/localization');
  };
}

export default AdminController;