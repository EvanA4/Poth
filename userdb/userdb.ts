import express from 'express';
import dotenv from 'dotenv';

import { UserModel } from './models/user-model';

dotenv.config();
const app = express();
const SERVER_PORT = 2999;

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});

app.use(express.json());


app.get("/adduser", async (req, res) => {
    const users = (await UserModel.findAll()).map(x => x.dataValues);
    if (users.length == 0) {
        for (let i = 0; i < 5; ++i) {
            UserModel.create({
                username: `user${i}`,
                password: `pass${i}`,
                hint: `hint${i}`,
                roles: "[]"
            });
        }
    }

    res.status(200).send("Added user");
});

app.get("/getusers", async (req, res) => {
    const users = (await UserModel.findAll()).map(x => x.dataValues);
    res.status(200).send(JSON.stringify(users));
})