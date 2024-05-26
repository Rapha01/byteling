export interface Config {
    WEB_PORT: string,
    NODE_ENV: string,
    LOG_DIR: string,
    JWT_SECRET_KEY: string,
    DB_CON: {
        POSTGRES_HOST: string
        POSTGRES_USER: string
        POSTGRES_PASSWORD: string
        POSTGRES_DBNAME: string
        POSTGRES_PORT: string
    },
    MAIL_USER: string,
    MAIL_PASSWORD: string,
    MAIL_SMTPHOST: string,
    MAIL_TESTEMAIL: string,
    HOST: string
};