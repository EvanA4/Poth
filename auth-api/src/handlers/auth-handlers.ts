import { Request, Response } from "express";
import { decryptJWT, encryptJWT, validateCredentials } from "../utils/auth-utils";
import { getUserById, getUserByName } from "../utils/user-utils";

// Time for encrypted JWTs to expire (in ms)
const EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000; // 1 week
// const EXPIRE_TIME = 10 * 1000; // 10 seconds

export async function loginHandler(req: Request, res: Response) {
    const body = req.body as { username?: string, password?: string };

    if (!body || !body.username || !body.password) {
        res.status(400).send({
            message: "Body must contain username and password.",
            data: undefined
        });
        return;
    }

    const valid = await validateCredentials(body.username, body.password);

    if (valid) {
        const user = await getUserByName(body.username);
        if (!user || !user.id) {
            res.status(400).send({
                message: "Invalid username or password.",
                data: undefined
            });
            return;
        }

        res.send({
            message: "Successfully logged in user.",
            data: await encryptJWT({
                userId: user.id,
                expiresAt: new Date(Date.now() + EXPIRE_TIME)
            })
        });

    } else {
        res.status(400).send({
            message: "Invalid username or password.",
            data: undefined
        });
    }
}


export async function verifyJWTHandler(req: Request, res: Response) {
    const body = req.body as { jwt?: string };
    
    if (!body || !body.jwt) {
        res.status(400).send({
            message: "Invalid JWT.",
            data: undefined
        });
        return;
    }

    const session = await decryptJWT(body.jwt);

    if (!session || !session.userId || !session.expiresAt) {
        res.status(400).send({
            message: "Invalid JWT.",
            data: undefined
        });
        return;
    }
    
    if (Date.now() < session.expiresAt.getTime()) {
        // token hasn't expired
        const user = await getUserById(session.userId);
        if (!user) {
            res.send({
                message: "Invalid JWT.",
                data: undefined
            });
            return;
        } else {
            res.send({
                message: "Successfully verified JWT.",
                data: user
            });
            return;
        }

    } else {
        // token has expired
        res.send({
            message: "JWT expired.",
            data: undefined
        });
    }
}

