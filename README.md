# Poth
Minimalist user authentication reverse proxy which can be used to protect routes of a network

# Routes for User DB

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