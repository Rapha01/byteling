//require("dotenv").config({ path: './src/.env' });
//const bcrypt = require('bcrypt');

import express, { Express,Request, Response }from 'express';

const PORT = process.env.WEB_PORT;
const app: Express = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

  console.log(`dddd`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("OK! 0.1");
});

console.log(process.env);