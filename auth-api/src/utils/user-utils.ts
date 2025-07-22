import { hash } from "bcrypt";
import { User } from "../types/authtypes";
import { UserModel } from "../models/user-model";
import { decryptJWT } from "./auth-utils";


export async function createUser(username: string, password: string): Promise<User | undefined> {
    if (!username || !password) {
        return undefined;
    }
    
    const hashed = await hash(password, 10);
    return (await UserModel.create({
        username: username,
        password: hashed,
        roles: "[]"
    })).dataValues;
}


export async function deleteUser(username: string): Promise<User | undefined> {
    const found = await getUserByName(username);

    if (!found) {
        return undefined;
    }

    UserModel.destroy({ where: {
        username
    }});

    return found;
}


export async function getUserByName(username: string): Promise<User | undefined> {
    if (!username) {
        return undefined;
    }
    
    return (await UserModel.findOne({ where: {
        username
    }}))?.dataValues;
}


export async function getUserById(id: number): Promise<User | undefined> {
    if (!id || id < 0) {
        return undefined;
    }
    
    return (await UserModel.findOne({ where: {
        id
    }}))?.dataValues;
}


export async function updateUser(searchUsername: string, data: User): Promise<User | undefined> {
    if (!searchUsername) {
        return undefined;
    }
    
    if ((await UserModel.update(data, { where: { username: searchUsername } }))[0] == 0) {
        return undefined;
    }

    return await getUserByName(data.username ?? searchUsername)
}


export async function getUserByJWT(jwt: string): Promise<User | undefined> {
    if (!jwt) {
        return undefined;
    }

    const session = await decryptJWT(jwt);
    if (!session) {
        return undefined;
    }

    if (Date.now() < session.expiresAt.getTime()) {
        // token hasn't expired
        return (await UserModel.findOne({ where: { id: session.userId }}))?.dataValues;

    } else {
        // token has expired
        // (await cookies()).delete("session");
        return undefined;
    }
}


export async function getUsers(): Promise<User[]> {
    return (await UserModel.findAll()).map(x => x.dataValues);
}