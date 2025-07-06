import express from 'express';
import dotenv from 'dotenv';

import { UserModel } from './models/user.ts';

dotenv.config();
const app = express();
const SERVER_PORT = 2999;

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});

app.use(express.json());


app.get("/adduser", (req, res) => {
    res.status(200).send("Added user");
});

app.get("/getusers", (req, res) => {
    res.status(200).send("Added user");
})