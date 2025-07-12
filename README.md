# Poth
Minimalist user authentication reverse proxy which can be used to protect routes of a network

# Routes for User DB

```
login (username, password)
verifyJWT (jwt: string)
create, delete user
get all users
```

```
actionCreateJWT
(payload: SessionPayload)
SignJWT

decryptJWT
(session: string | undefined = "")
Session | undefined

validateCredentials
(username: string, password: string)
boolean

createUser
(user: User)
User | undefined>

deleteUser
(username: string)
User | undefined

getUserByName
(username: string)
User | undefined

getUserByJWT
(jwt: string)
User | undefined

getUsers
User[]
```

# Todo

JSON or config in root of repo to determine where to redirect users in `/proxy` server.
Better environment variable configuration for generalized use
Docker containers?

list each sub-project's env config options/requirements in this README
list their port numbers, too