import { Database, Server } from 'happy-barnacle';
import { Logger } from 'sitka';
import express from 'express';
import path from 'path';
import fs from 'fs';

import configuration from './config.prod.json';
const _app_folder = 'dist';

const homedir = require('os').homedir();
const appDirectory = path.join(homedir, '.heijunka');

if (!fs.existsSync(appDirectory)) {
  fs.mkdirSync(appDirectory);
}

const dbFile = path.join(appDirectory, "objectEventStoreWebSPA.db");


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loggerConfig: any = {name: 'sterling-barnacle',level: Logger.Level.ALL};
const logger = Logger.getLogger(loggerConfig);

const app = express();
// ---- SERVE STATIC FILES ---- //
app.get('*.*.*', express.static(_app_folder, { maxAge: '1y' }));
app.use('/assets', express.static(_app_folder + '/assets', { maxAge: '1y' }));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(configuration.frontend.port);
logger.info('Running at Port ' + configuration.frontend.port);

const db = new Database(dbFile,loggerConfig);
const runServer = new Server(db,loggerConfig);
runServer.start(configuration.backend.port);