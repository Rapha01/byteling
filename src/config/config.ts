import { Config } from '../interfaces/config.interface.js';

const config : Config  = {
    NODE_ENV: process.env.NODE_ENV as string,
    WEB_PORT: process.env.WEB_PORT as string,
    LOG_DIR: '/logs',
    JWT_SECRET_KEY: '',
    db_con: {
        POSTGRES_HOST: process.env.POSTGRES_HOST as string,
        POSTGRES_USER: process.env.POSTGRES_USER as string,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string,
        POSTGRES_DBNAME: process.env.POSTGRES_DBNAME as string,
        POSTGRES_PORT: process.env.POSTGRES_PORT as string,
    }
};

export { config };