import { NextFunction, Request, Response } from 'express';

class MainSiteController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render('site/index');
    } catch (error) {
      next(error);
    }
  };
}

export default MainSiteController;
