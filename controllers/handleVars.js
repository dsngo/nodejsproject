const express = require('express');

const sPORT = process.env.PORT || 3000;
const sIP = process.env.IP;
const sLog = () =>
  console.log(`Server is listening... ${ip || "localhost"}:${port}`); // eslint-disable-line
const app = express();
const staticR = express.static(`${__dirname}/dist`);

module.exports = { app, sPORT, sIP, sLog, staticR };
