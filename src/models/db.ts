import { Pool } from "pg";
import config  from "../config/config";

const pool: Pool = new Pool({
  host: config.DB_CON.POSTGRES_HOST,
  user: config.DB_CON.POSTGRES_USER,
  password: config.DB_CON.POSTGRES_PASSWORD,
  database: config.DB_CON.POSTGRES_DBNAME,
  port: parseInt(config.DB_CON.POSTGRES_PORT),
  idleTimeoutMillis: 30000,
});

export default pool;