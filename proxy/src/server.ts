import express, { Request, Response } from 'express';
import cookies from 'cookie-parser';
const app = express();
const SERVER_PORT = 2999;
const LOGIN_SERVER_URI = "http://localhost:3000";

app.use(cookies());
app.use(async (
    req: Request,
    res: Response
) => {
    const cks = req.cookies;
    console.log(`\tCookies: "${JSON.stringify(cks)}"`)

    if (req.path == "/login") {
        console.log(JSON.stringify(req.query))
        console.log("req.path: " + req.path)
        console.log("req.originalUrl: " + req.originalUrl)
        console.log("req.headers: " + JSON.stringify(req.headers))
        console.log("req.method: " + req.method)

        const forward = await fetch(LOGIN_SERVER_URI + req.originalUrl, {
            headers: JSON.parse(JSON.stringify(req.headers)),
            method: req.method,
            body: req.method != "GET" ? req.body : null,
            mode: "cors"
        });
        res.status(forward.status).send(forward.text());

        // res.status(300).redirect("http://localhost:3000");

    } else {
        res.status(200).cookie(
            'myTestCookie', 'testValue'
        ).send("Hello from xjs test");
    }
});

app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}...`));
