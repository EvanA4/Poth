import { User } from "../types/authtypes";

const DEBUG_USERS = ["debug_user0", "debug_user1", "debug_user2", "debug_user3", "debug_user4"]

async function test() {
    // Find and delete any previous debug users
    const foundUsers = await getFilteredUsers();
    console.log("Current users:");
    console.log(foundUsers);

    for (let i = 0; i < foundUsers.length; ++i) {
        const res = await fetch(`http://localhost:6002/users?username=${foundUsers[i].username}`, {
            method: "DELETE"
        });
        console.log(`\nAttempting to delete ${foundUsers[i].username}:`)
        console.log(await res.json());
    }

    // Recreate all the debug users
    for (let i = 0; i < DEBUG_USERS.length; ++i) {
        const res = await fetch("http://localhost:6002/users", {
            method: "POST",
            body: JSON.stringify({
                username: DEBUG_USERS[i],
                password: `${DEBUG_USERS[i]}_password`
            }),
            headers: new Headers({
                'content-type': 'application/json'
            })
        });
        console.log(`\nAttempting to create ${DEBUG_USERS[i]}`);
        console.log(await res.json());
    }

    const recreated = await getFilteredUsers();
    console.log("\nNew list of users:");
    console.log(recreated);

    // Update a user
    let res = await fetch(`http://localhost:6002/users?username=${recreated[0].username}`, {
        method: "PUT",
        body: JSON.stringify({
            roles: JSON.stringify(["custom", "roles", "example"])
        }),
        headers: new Headers({
            'content-type': 'application/json'
        })
    });
    console.log("\nUpdated user:")
    console.log(await res.json());

    const updated = await getFilteredUsers();
    console.log("\nNew list of (updated) users:");
    console.log(updated);

    // Login as a user
    res = await fetch("http://localhost:6002/login", {
        method: "POST",
        body: JSON.stringify({
            username: updated[0].username,
            password: `${updated[0].username}_password`
        }),
        headers: new Headers({
            'content-type': 'application/json'
        })
    });
    console.log(`\nAttempting to login as ${updated[0].username}`);
    const loginJSON = await res.json();
    console.log(loginJSON);

    // Verify JWT from login
    res = await fetch("http://localhost:6002/verify-jwt", {
        method: "POST",
        body: JSON.stringify({
            jwt: loginJSON.data
        }),
        headers: new Headers({
            'content-type': 'application/json'
        })
    });
    console.log("\nAttempting to verify JWT:");
    console.log(await res.json());

    // Delete all debug users
    const toDelete = await getFilteredUsers();
    for (let i = 0; i < toDelete.length; ++i) {
        const res = await fetch(`http://localhost:6002/users?username=${toDelete[i].username}`, {
            method: "DELETE"
        });
        console.log(`\nAttempting to delete ${toDelete[i].username}:`);
        console.log(await res.json());
    }

    const shouldBeEmpty = await getFilteredUsers();
    console.log("\nLeftover debug users (should be empty):");
    console.log(shouldBeEmpty);
}

async function getFilteredUsers(): Promise<User[]> {
    const res = await fetch("http://localhost:6002/users");
    return ((await res.json()).data as User[]).filter(x => DEBUG_USERS.find(y => y == x.username));
}

test();