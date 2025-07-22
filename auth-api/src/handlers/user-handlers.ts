import { Request, Response } from "express";
import { UserModel } from "../models/user-model";
import { createUser, deleteUser, updateUser } from "../utils/user-utils";
import { User } from "../types/authtypes";


export async function getUserHandler(_: Request, res: Response) {
    const users = (await UserModel.findAll()).map(x => x.dataValues);

    res.send({
        message: "Successfully retrieved users.",
        data: users
    });
};


export async function createUserHandler(req: Request, res: Response) {
    const body = req.body as { username: string, password: string };

    if (!body || !body.username || !body.password) {
        res.status(400).send({
            message: "Body must contain username and password.",
            data: undefined
        });
        return;
    }

    try {
        const user = await createUser(body.username, body.password);
        res.send({
            message: user ? "Successfully created user!" : "Failed to create user.",
            data: user
        });

    } catch (e: any) {
        // if (e instanceof UniqueConstraintError) {}

        console.log(e);
        res.send({
            message: "Failed to add user to database.",
            data: undefined
        });
    }
};


export async function deleteUserHandler(req: Request, res: Response) {
    const query = req.query as { username: string };

    if (!query || !query.username) {
        res.status(400).send({
            message: "URL must contain username as query parameter.",
            data: undefined
        });
        return;
    }

    try {
        const user = await deleteUser(query.username as string);
        res.send({
            message: user ? "Successfully deleted user!" : "Failed to delete user.",
            data: user
        });

    } catch (e: any) {
        // if (e instanceof UniqueConstraintError) {}

        console.log(e);
        res.send({
            message: "Failed to delete user from database.",
            data: undefined
        });
    }
};


export async function updateUserHandler(req: Request, res: Response) {
    const body = req.body as User;
    const query = req.query as { username: string };

    if (!query || !query.username) {
        res.status(400).send({
            message: "URL must contain search username as query parameter.",
            data: undefined
        });
        return;
    }

    if (!body || !(body.username || body.password || body.roles)) {
        res.status(400).send({
            message: "Body must contain a username, password, or roles.",
            data: undefined
        });
        return;
    }

    try {
        const user = await updateUser(query.username, body);
        res.send({
            message: user ? "Successfully updated user!" : "Failed to update user.",
            data: user
        });

    } catch (e: any) {
        // if (e instanceof UniqueConstraintError) {}

        console.log(e);
        res.send({
            message: "Failed to update user in database.",
            data: undefined
        });
    }
};