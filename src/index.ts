import { Database, Server } from 'happy-barnacle';
import express from 'express';
import path from 'path';

const _app_folder = 'dist';

const app = express();
// ---- SERVE STATIC FILES ---- //
app.get('*.*.*', express.static(_app_folder, {maxAge: '1y'}));

app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.listen(process.env.port || 4203);
console.log('Running at Port 4203');

const db = new Database("objectEventStore.db");
const runServer = new Server(db);
runServer.start(8000);