import { Database, Server } from 'happy-barnacle';
import express from 'express';
import path from 'path';

import configuration from './config.prod.json';
const _app_folder = 'dist';

const app = express();
// ---- SERVE STATIC FILES ---- //
app.get('*.*.*', express.static(_app_folder, {maxAge: '1y'}));

app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.listen(configuration.frontend.port);
console.log('Running at Port '+configuration.frontend.port);

const db = new Database("objectEventStore.db");
const runServer = new Server(db);
runServer.start(configuration.backend.port);