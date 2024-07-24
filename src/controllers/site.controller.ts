import { NextFunction, Request, Response } from 'express';

class SiteController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    res.render('site/index');
  };
  
  public register = async (req: Request, res: Response, next: NextFunction) => {
    res.render('site/auth/register');
  };

  public registerSuccess = async (req: Request, res: Response, next: NextFunction) => {
    res.render('site/auth/registerSuccess');
  };

  public verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    res.render('site/auth/verifyEmail');
  };

  public login = (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user)
      return res.redirect('/');

    res.render('site/auth/login');
  };

  public resetPassword = (req: Request, res: Response, next: NextFunction) => {
    res.render('site/auth/resetPassword');
  };

  public settings = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user)
      return res.redirect('/login');

    res.render('site/user/settings');
  };
}




export default SiteController;
