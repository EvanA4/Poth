import express from 'express';
const app = express();
const SERVER_PORT = 6002;



app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}...`));