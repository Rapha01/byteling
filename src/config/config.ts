import { Config } from '../interfaces/config.interface.js';

const config: Config  = {
    NODE_ENV: process.env.NODE_ENV as string,
    WEB_PORT: process.env.WEB_PORT as string,
    LOG_DIR: '/logs',
    JWT_SECRET_KEY:  process.env.WEB_PORT as string,
    DB_CON: {
        POSTGRES_HOST: process.env.POSTGRES_HOST as string,
        POSTGRES_USER: process.env.POSTGRES_USER as string,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD as string,
        POSTGRES_DBNAME: process.env.POSTGRES_DBNAME as string,
        POSTGRES_PORT: process.env.POSTGRES_PORT as string,
    },
    MAIL_USER: process.env.MAIL_USER as string,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD as string,
    MAIL_SMTPHOST: process.env.MAIL_SMTPHOST as string,
    MAIL_TESTEMAIL: process.env.MAIL_TESTEMAIL as string,
    HOST: process.env.HOST as string,
};

export default config;