import { jwtVerify, SignJWT } from "jose";
import { compare } from "bcrypt";
import { Session, SessionPayload } from "../types/authtypes";
import { getUserByName } from "./user-utils";


const secretKey = process.env.SESSION_SECRET; // base64 number
const encodedKey = new TextEncoder().encode(secretKey);


// export async function actionCreateJWT(payload: SessionPayload): Promise<SignJWT> {
//     return new SignJWT(payload)
//         .setProtectedHeader({ alg: "HS256" })
//         .setIssuedAt()
//         .setExpirationTime("7d")
//         .sign(encodedKey);
// }


export async function decryptJWT(session: string | undefined = ""): Promise<Session | undefined> {
    const blah = (await jwtVerify(session, encodedKey, { algorithms: ["HS256"] })).payload as {
        userId: string,
        expiresAt: string
    };

    return {
        userId: parseInt(blah.userId),
        expiresAt: new Date(blah.expiresAt),
    }
}


export async function validateCredentials(username: string, password: string): Promise<boolean> {
    let user = await getUserByName(username);

    if (!user) {
        return false;
    }

    let result = await compare(password, user.password);

    return result;
}