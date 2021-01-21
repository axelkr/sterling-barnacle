import { Database, Server } from 'happy-barnacle';

const db = new Database("objectEventStore.db");
const runServer = new Server(db);
runServer.start(8000);