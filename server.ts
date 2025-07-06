import express from 'express';
import cookies from 'cookie-parser';

const app = express();

const SERVER_PORT = 2999;

app.listen(SERVER_PORT, () => {
    console.log(`Server running on port ${SERVER_PORT}`);
});

app.use(cookies());
app.use(express.json());
app.use((req, res) => {
    console.log(`\n${req.method} Request: ${req.path}`);

    let cks = req.cookies;
    console.log(`\tCookies: "${JSON.stringify(cks)}"`)

    if (req.path == "/redirect-me") {
        res.status(300).redirect("/you/were/redirected");

    } else {
        res.status(200).cookie(
            'myTestCookie', 'testValue'
        ).send("Hello from xjs test");
    }
});