import { Request, Response } from "express";


/*
login (username, password)
/login POST
find user by username
compare hashed passwords
create jwt
return jwt

verifyJWT (jwt: string)
/verifyJWT POST
decrypt jwt
return whether jwt session and username are valid
*/


export async function loginHandler(req: Request, res: Response) {
    const body = req.body as { username: string, password: string };
}


export async function verifyJWTHandler(req: Request, res: Response) {

}