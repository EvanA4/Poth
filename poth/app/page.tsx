'use client';
import Image from "next/image";
import { useState } from "react";

export default function Login() {
    const [inputUsername, setUsername] = useState("");
    const [inputPassword, setPassword] = useState("");
    const [globalError, setGlobalError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit() {
        // console.log(`inputUsername: \"${inputUsername}\"`);
        // console.log(`inputPassword: \"${inputPassword}\"`);
        
        // verify username and password
        if (!inputUsername || !inputPassword) {
            setGlobalError("Empty username or password.");
        }

		console.log("logging in!");
        // const res = await validateCredentials(inputUsername, inputPassword);
        // if (res.success && res.unwrap()) {
        //     await actionLogin(inputUsername);
        //     setGlobalError("");
        //     router.push("/");
        // } else if (res.success && !res.unwrap()) {
        //     setGlobalError("Invalid username or password.")
        // } else {
        //     setGlobalError("Error validating credentials.");
        // }
    }

    return (
        <div className="w-full relative">
            <div className="h-[100vh] w-full flex flex-col items-center justify-center text-white">
                <div className="flex flex-col items-center justify-center p-5 rounded-lg w-[300px]">
                    <p className="text-3xl mb-10">Login</p>

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
                                    src={showPassword ? "/poth/svgs/show.svg" : "/poth/svgs/hide.svg"}
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