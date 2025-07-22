export type Session = {
    userId: number,
    expiresAt: Date
};

export type User = {
    id?: number,
    createdAt?: Date,
    updatedAt?: Date,

    username: string,
    password: string,
    roles: string
};