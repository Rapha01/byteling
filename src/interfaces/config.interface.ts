export interface Config {
    WEB_PORT: string,
    NODE_ENV: string,
    LOG_DIR: string,
    JWT_SECRET_KEY: string,
    db_con: {
        POSTGRES_HOST: string
        POSTGRES_USER: string
        POSTGRES_PASSWORD: string
        POSTGRES_DBNAME: string
        POSTGRES_PORT: string
    }
};