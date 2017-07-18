/* eslint no-console: "off" */
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const methodOverride = require('method-override')('_method');
const session = require('express-session');
const LocalStrategy = require('passport-local');

const app = express();
const staticR = express.static(`${__dirname}/dist`);
const sPORT = process.env.PORT || 3000;
const sIP = process.env.IP;
const sLog = () =>
  console.log(`Server is listening... ${sIP || 'localhost'}:${sPORT}`);

module.exports = {
  app,
  flash,
  session,
  mongoose,
  passport,
  bodyParser,
  LocalStrategy,
  methodOverride,
  staticR,
  sPORT,
  sLog,
  sIP,
};
