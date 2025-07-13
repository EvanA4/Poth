async function test() {
    // const res = await fetch("http://localhost:6002?qval1=something&other=miscig", {
    //     method: "POST",
    //     body: JSON.stringify({
    //         foo: "bar",
    //         me: "Evan"
    //     }),
    //     headers: new Headers({
    //         'content-type': 'application/json'
    //     })
    // });
    // console.log(await res.text());

    for (let i = 0; i < 5; ++i) {
        const res = await fetch("http://localhost:6002/users", {
            method: "POST",
            body: JSON.stringify({
                username: "user" + i,
                password: "pass" + i
            }),
            headers: new Headers({
                'content-type': 'application/json'
            })
        });
        console.log(await res.json());
    }

    let res = await fetch("http://localhost:6002/users");
    console.log(await res.json());

    // for (let i = 0; i < 5; ++i) {
    //     const res = await fetch("http://localhost:6002/users?username=user" + i, {
    //         method: "DELETE"
    //     });
    //     console.log(await res.json());
    // }

    res = await fetch("http://localhost:6002/users?username=user12", {
        method: "PUT",
        body: JSON.stringify({
            roles: JSON.stringify(["admin", "staff", "other"])
        }),
        headers: new Headers({
            'content-type': 'application/json'
        })
    });
    console.log(await res.json());


    res = await fetch("http://localhost:6002/users");
    console.log(await res.json());
}

test();