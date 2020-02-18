'use strict';

require('./database/connect');

import express, { Application } from 'express';
import bodyParser from 'body-parser';

import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/FolderController';
import './controllers/UrlContronller';
import './controllers/ContentController';
import './controllers/RootController';

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

module.exports = app;
