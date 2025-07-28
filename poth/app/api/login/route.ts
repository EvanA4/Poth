import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request
) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session")?.value;

    if (!sessionId) {
        return NextResponse.json({
            message: "Missing session id",
            data: ""
        });
    }

    const rawRes = await fetch("http://localhost:6002/verify-jwt", {
        method: "POST",
        body: JSON.stringify({
            jwt: sessionId
        }),
        headers: new Headers({
            'content-type': 'application/json'
        })
    });
    const res = await rawRes.json() as {
        message: string,
        data: { username: string }
    };

    if (res.data) {
        return NextResponse.json({
            message: "Successfully verified credentials",
            data: res.data.username
        });
    
    } else {
        return NextResponse.json({
            message: "Invalid credentials",
            data: ""
        });
    }

}

export async function POST(
  req: Request
) {
    const body = await req.json() as {
        username: string,
        password: string
    };

    if (!body.username || !body.password) {
        return NextResponse.json({
            message: "Missing username or password",
            data: false
        });
    }

    const rawRes = await fetch("http://localhost:6002/login", {
        method: "POST",
        body: JSON.stringify({
            username: body.username,
            password: body.password
        }),
        headers: new Headers({
            'content-type': 'application/json'
        })
    });
    const res = await rawRes.json() as {
        message: string,
        data: string
    };

    console.log("Received login data: " + JSON.stringify(res));

    if (res.data) {
        const cookieStore = await cookies();
        cookieStore.set("session", res.data);
        return NextResponse.json({
            message: "Successfully verified credentials",
            data: true
        });
    
    } else {
        return NextResponse.json({
            message: "Invalid credentials",
            data: false
        });
    }

}