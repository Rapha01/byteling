import { NextFunction, Request, Response } from 'express';

class AdminController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render('admin/index');
    } catch (error) {
      next(error);
    }
  };
}

export default AdminController;