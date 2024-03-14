'use strict';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandlers');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(require('./routes'));
app.use(errorHandler);

module.exports = app;
