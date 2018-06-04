'use strict';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './api/api.js';

import notFound from './middleware/404.js';
import errorHandler from './middleware/error.js';

let app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(router);

app.use(notFound);
app.use(errorHandler);

let server = false;

module.exports = {
  start: (port) => {
    if (!server) {
      server = app.listen(port, (err) => {
        if (err) { throw err; }
        server = true;
        console.log(`Server is up and running on ${port}`);
      });
    } else {
      console.log('Server is already running - STUPID!');
    }
  }, 
  stop: () => {
    server.close(() => {
      console.log('Server has been stopped');
    });
  } // eslint-disable-line
};