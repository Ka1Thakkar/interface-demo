'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logo from '@/public/interface.png'
import GoogleLogo from '@/public/GoogleLogo.png'
import { useRouter } from "next/navigation";

const SignUp = () => {
    const router = useRouter()

    const onClick = () => {
        const username = (document.getElementById('email') as HTMLInputElement)?.value;
        const password = (document.getElementById('password') as HTMLInputElement)?.value;

        console.log(username, password)
        if (username === '1' && password === '123') {
            router.push('/main/dashboard')
        } else {
            console.log('Invalid credentials')
        }
    }
    return (
        <div className="flex flex-col items-center justify-center gap-10 w-full lg:w-fit shadow-md shadow-black/25 p-10 lg:p-16 rounded-3xl min-h-[600px]">
            <h1 className="text-brandpurple font-semibold text-5xl tracking-tighter">
                interface
            </h1>
            <div className="flex flex-col gap-5 w-full mt-20">
                {/* <input type="text" placeholder="Full Name" className="border-2 border-black/50 py-2 px-5 rounded-xl w-[25vw] text-sm" /> */}
                <input id="email" type="email" placeholder="Email Address" className="border-2 border-black/50 py-3 px-5 rounded-xl w-full lg:w-[25vw] text-lg font-semibold" />
                <input id="password" type="password" placeholder="Password" className="border-2 border-black/50 focus:border-black py-3 px-5 rounded-xl w-full lg:w-[25vw] text-lg font-semibold" />
                <button onClick={() => { onClick() }} className="w-full text-center bg-black text-white py-3 rounded-lg text-lg font-semibold">
                    Login
                </button>
                <div id="loginButton" className="flex gap-2 items-center">
                    <div className="w-full h-[0.75px] rounded-full bg-black"></div>
                    <p className="text-sm font-medium">or</p>
                    <div className="w-full h-[0.75px] rounded-full bg-black"></div>
                </div>
                <button onClick={() => { onClick() }} className="flex items-center text-lg w-full border-2 py-3 justify-center border-black gap-5 font-semibold rounded-lg">
                    <Image src={GoogleLogo} alt="Google Logo" />
                    Login with Google
                </button>
            </div>
        </div>
    );
}

export default SignUp;