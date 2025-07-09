// import { hash } from "bcrypt";
// import { User } from "../types/user.ts";
// import { UserModel } from "../models/user-model.ts";
// import { decryptJWT } from "./auth-utils.js";


// export async function createUser(user: User): Promise<User | undefined> {
//     if (!user.username || !user.password || !user.hint) {
//         return undefined;
//     }
    
//     user.password = await hash(user.password, 10);
//     return (await UserModel.create(user)).dataValues;
// }


// export async function deleteUser(username: string): Promise<User | undefined> {
//     const found = getUserByName(username);

//     if (!found) {
//         return undefined;
//     }

//     UserModel.destroy({ where: {
//         username
//     }});

//     return found;
// }


// export async function getUserByName(username: string): Promise<User | undefined> {
//     if (!username) {
//         return undefined;
//     }
    
//     return (await UserModel.findOne({ where: {
//         username
//     }}))?.dataValues;
// }

// export async function getUserByJWT(jwt: string): Promise<User | undefined> {
//     if (!jwt) {
//         return undefined;
//     }

//     const session = await decryptJWT(jwt);
//     if (!session) {
//         return undefined;
//     }

//     if (Date.now() < session.expiresAt.getTime()) {
//         // token hasn't expired
//         return (await UserModel.findOne({ where: { id: session.userId }}))?.dataValues;

//     } else {
//         // token has expired
//         // (await cookies()).delete("session");
//         return undefined;
//     }
// }

// export async function getUsers(): Promise<User[]> {
//     return (await UserModel.findAll()).map(x => x.dataValues);
// }