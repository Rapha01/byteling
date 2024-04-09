//require("dotenv").config({ path: './src/.env' });
//const bcrypt = require('bcrypt');

const express = require('express');

const PORT = process.env.WEB_PORT;
const app = express();

app.use((req, res, next) => {
  res.send('Hello Jack');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);


});

console.log(process.env);