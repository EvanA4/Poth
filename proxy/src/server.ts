import express, { Request, Response } from 'express';
import cookies from 'cookie-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express();
const SERVER_PORT = 2999;
const LOGIN_SERVER_URI = "http://localhost:3000";

const proxyMiddleware = createProxyMiddleware<Request, Response>({
  target: LOGIN_SERVER_URI,
  changeOrigin: true,
  ws: true
});

app.use(cookies());
app.use(async (
    req: Request,
    res: Response
) => {
    // const cks = req.cookies;
    // console.log(`\tCookies: "${JSON.stringify(cks)}"`);

    if (req.path.indexOf("/poth/") == 0 || req.path == "/poth") {
        console.log(`Forwarding "${req.method} ${req.path}"`);
        proxyMiddleware(req, res);

    } else {
        // res.status(200).cookie(
        //     'myTestCookie', 'testValue'
        // ).send("Hello from xjs test");
        console.log(`Received "${req.method} ${req.path}"`);
        res.send(`Welcome to "${req.path}"`);
    }
});

app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}...`));