/* eslint no-console: "off" */
const express = require('express');

const sPORT = process.env.PORT || 3000;
const sIP = process.env.IP;
const sLog = () =>
  console.log(`Server is listening... ${sIP || 'localhost'}:${sPORT}`);
const app = express();
const staticR = express.static(`${__dirname}/dist`);

module.exports = { app, sPORT, sIP, sLog, staticR };
