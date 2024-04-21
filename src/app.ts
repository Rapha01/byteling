//import compression from 'compression';
//import cookieParser from 'cookie-parser';
import express from 'express';
//import helmet from 'helmet';
//import hpp from 'hpp';
//import morgan from 'morgan';
import { config } from './config/config';
import { Routes } from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import authMiddleware from './middlewares/auth.middleware';
import { logger } from './utils/logger';
import { routes } from './routes/routes.init';
import path from 'path';

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

    //db.connect();
    this.app.set("views", path.join(__dirname, "./views"));
    this.app.set("view engine", "ejs");
    this.app.use(express.static(path.join(__dirname, "../public")));

    this.initializeMiddlewares();
    this.initializeRoutes();
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
    this.app.use(authMiddleware);
    this.app.use(errorMiddleware);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    //this.app.use(cookieParser());
  }

  private initializeRoutes() {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}

const app: App = new App();

app.listen();