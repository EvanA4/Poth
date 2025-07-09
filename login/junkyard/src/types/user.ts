export type User = {
    id?: number,
    createdAt?: Date,
    updatedAt?: Date,

    username: string,
    password: string,
    hint: string,
    roles: string
};