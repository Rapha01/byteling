import { Router } from 'express';
import AuthController from '../controllers/api.auth.controller';
import { Routes } from '../interfaces/routes.interface';
import validate from '../middlewares/api.validation.middleware';
import { username, email, registerPassword, loginPassword, verifyEmailCode, verifyEmailUserId } from '../validators/auth.validator';

class AuthApiRoute implements Routes {
  public path = '/auth/';
  public router = Router();
  public authController = new AuthController();

  
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}register`, validate([username(), email(), registerPassword('password'),registerPassword('passwordConfirm')]), this.authController.register);
    this.router.post(`${this.path}login`, validate([ email(), loginPassword() ]), this.authController.login);
    this.router.post(`${this.path}verifyEmail`, validate([ verifyEmailUserId(), verifyEmailCode()]) ,this.authController.verifyEmail);
    this.router.post(`${this.path}logout`, this.authController.logout);
    this.router.post(`${this.path}resetPassword`, validate([ email() ]), this.authController.resetPassword);
    this.router.post(`${this.path}sendTestEmail`, validate([ email() ]), this.authController.sendTestEmail);
  }
}

export default AuthApiRoute;
