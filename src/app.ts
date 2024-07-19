//import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
//import helmet from 'helmet';
//import hpp from 'hpp';
//import morgan from 'morgan';
import config from './config/config';
import { Routes } from './interfaces/routes.interface';
import authMiddleware from './middlewares/auth.middleware';
import apiErrorMiddleware from './middlewares/api.error.middleware';
import initVarsMiddleware from './middlewares/initVars.middleware';
import { logger } from './utils/logger';
import routes from './routes';
import path from 'path';
import SiteRoute from './routes/site.route';
import UsersApiRoute from './routes/api.user.route';
import AuthApiRoute from './routes/api.auth.route';
import AdminSiteRoute from './routes/site.admin.route';
import { Router } from 'express';
// 1

const router = Router();

logger.error('Testerror');
logger.info('Testinfo');
logger.warn('Testwarning');
logger.debug('Testdebug');
logger.silly('Testsilly');

class App {
  public app: express.Application;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = config.WEB_PORT;

    this.init();
  }

  private async init() {
    //await initDatabase();
    this.app.use(express.urlencoded({ extended: false }));
    this.app.set("views", path.join(__dirname, "./views"));
    this.app.set("view engine", "ejs");
    this.app.use(express.static(path.join(__dirname, "./public")));
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${config.NODE_ENV} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  private initializeMiddlewares() {
    //this.app.use(morgan(LOG_FORMAT, { stream }));
    //this.app.use(hpp());
    //this.app.use(helmet());
    //this.app.use(compression());
    this.app.use(express.json());
    this.app.use(initVarsMiddleware);
    this.app.use(cookieParser());
    this.app.use(authMiddleware);
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    for (const [key, value] of Object.entries(routes)) {
      //value.router.stack.forEach((stack) => console.log(stack.route.path));
      this.app.use('/',value.router);
    }

    for (const [key, value] of Object.entries(routes)) {
      if ('localizedRouter' in value) {
        //value.localizedRouter.stack.forEach((stack) => console.log(stack.route.path));
        this.app.use('/',value.localizedRouter);
      }
    }
  }

  private initializeErrorHandling() {
    this.app.use(apiErrorMiddleware);
  }
}

const app: App = new App();

app.listen();

/*
let i = 0;
while (true) {
  i++

  if (i % 10000)
    console.log(i);
}*/