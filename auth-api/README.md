# Poth Proxy
Used to verify requests before passing to respective applications.

## Routes

Note that all responses follow the following structure:

```
{
    message: string,
    data?: any
}
```

What the `response` field corresponds to in the table below is the type of the `data` field above:


url | method | params | body | response
--- | --- | --- | --- | ---
/users | GET ||| `User[]`
/users | POST || `{username: string, password: string}` | `User`
/users | PUT | `{username: string}` | `User` | `User`
/users | DELETE | `{username: string}` || `User`
/login | POST || `{username: string, password: string}` | `string`
/verify-jwt | post || `{jwt: string}` | `User`



### Other Notes on Routes

The `username` field in the search params for the PUT method in the `users` route is what finds the user in the database. Also, the login route's response is the JWT associated with that login. And finally: the `User` type in this case matches the following description:
```
{
    // automatically handled by the database
    id?: number,
    createdAt?: Date,
    updatedAt?: Date,

    // handled manually
    username: string,
    password: string,
    roles: string
}
```

## Environment Variables

```
MYSQL_BASE="databaseName"
MYSQL_USER="usernameForDatabase"
MYSQL_PASS="passwordForUsername"
MYSQL_URL="localhost"

SESSION_SECRET="32-character, base-64 number"
```