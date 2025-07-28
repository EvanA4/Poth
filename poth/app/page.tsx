'use client';
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Login() {
    const [currentUser, setCurrentUser] = useState("");
    const [inputUsername, setUsername] = useState("");
    const [inputPassword, setPassword] = useState("");
    const [globalError, setGlobalError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        (async () => {
            const rawRes = await fetch("/api/login", {
                method: "GET",
                headers: new Headers({
                    'content-type': 'application/json'
                })
            });

            const res = await rawRes.json();
            if (res.data) {
                setCurrentUser(res.data);
            }
        })();
    }, []);

    async function handleSubmit() {
        // verify username and password
        if (!inputUsername || !inputPassword) {
            setGlobalError("Empty username or password.");
        }

        const rawRes = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                username: inputUsername,
                password: inputPassword
            }),
            headers: new Headers({
                'content-type': 'application/json'
            })
        });


        if ((await rawRes.json()).data) {
            setGlobalError("");
            setCurrentUser(inputUsername);
            setUsername("");
            setPassword("");
        } else {
            setGlobalError("Invalid username or password.")
        }
    }

    return (
        <div className="w-full relative">
            <div className="h-[100vh] w-full flex flex-col items-center justify-center text-white">
                <div className="flex flex-col items-center justify-center p-5 rounded-lg w-[300px]">
                    <p className={currentUser ? "text-3xl mb-3" : "text-3xl mb-10"}>Login</p>
                    {currentUser && <p className="mb-10">Hello, <b>u/{currentUser}</b></p>}

                    <div className="p-2">
                        <label htmlFor="username" className="mr-3 block">Username</label>
                        <input
                            value={inputUsername}
                            onChange={e => setUsername(e.target.value)}
                            type="text"
                            name="username"
                            id="username"
                            className="bg-white outline-none rounded-lg placeholder-neutral-400 px-2 py-1 text-black"
                            placeholder="username"
                        />
                        <br />
                    </div>

                    <div className="p-2">
                        <label htmlFor="password" className="mr-3 block">Password</label>
                        <div className="relative inline">
                            <input
                                value={inputPassword}
                                onChange={e => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                className="bg-white outline-none rounded-lg placeholder-neutral-400 px-2 py-1 text-black"
                                placeholder="password"
                                content="hide"
                            />

                            <button
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute top-[50%] right-0 -translate-y-[50%] mr-2 opacity-70 hover:opacity-100"
                            >
                                <Image
                                    src={showPassword ? "/svgs/show.svg" : "/svgs/hide.svg"}
                                    height={20}
                                    width={20}
                                    alt="Hide icon"
                                />
                            </button>
                        </div>
                    </div>

                    {globalError && <p className="text-red-500">{globalError}</p>}

					<button
						onClick={handleSubmit}
						className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg mt-6"
					>Submit</button>
                </div>
            </div>
        </div>
    )
}