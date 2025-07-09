import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
// import qs from 'qs';
// import { createUser, deleteUser, getUsers } from './utils/user-utils.ts';

dotenv.config();
const app = express();
const SERVER_PORT = 2999;


app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});

// app.set('query parser', function (str) {
//   return qs.parse(str, { /* custom options */ })
// });
app.use(express.json());

// // createUser(user: User)
// app.post("/poth/user/create", (req, res) => {
//     res.send(JSON.stringify(createUser(req.body)));
// });

// // deleteUser(username: string)
// app.delete("/poth/user/delete", (req, res) => {
//     res.send(JSON.stringify(deleteUser(req.body)));
// });

// // getUserByName(username: string)
// app.get("/poth/user/get/user", (
//     req: Request<{ username: string }, any, any, any>,
//     res: Response,
// ) => {
//     res.send(JSON.stringify(deleteUser(req.query.username)));
// });

// // getUserByJWT(jwt: string)


// // getUsers()
// app.get("/poth/user/get/users", (
//     req: Request<any, any, any, any>,
//     res: Response,
// ) => {
//     res.send(JSON.stringify(getUsers()));
// });