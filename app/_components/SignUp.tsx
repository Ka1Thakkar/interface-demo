import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logo from '@/public/interface.png'
import { login, signInWithGoogle, signup } from '@/app/login/actions'
import GoogleLogo from '@/public/GoogleLogo.png'
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
    // const router = useRouter()
    // const supabase = createClient()
    // supabase.auth.signInWithOAuth({
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    // const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.currentTarget);
    //     const email = formData.get('email') as string;
    //     const password = formData.get('password') as string;
    //     try {
    //         await login(formData).then((error) => {
    //             // setError(error);
    //             console.log(error);
    //             toast(error);
    //         });
    //     } catch (error: any) {
    //         // setError(error.message);
    //         console.error(error.message)
    //         toast(error.message);
    //     }
    // };
    return (
        <div className="flex flex-col items-center justify-center gap-10 w-full xl:w-fit lg:min-w-[70%] 2xl:min-w-[50%] shadow-md shadow-black/25 p-10 lg:p-16 rounded-3xl">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1 className="text-brandpurple font-semibold text-5xl tracking-tighter">
                interface
            </h1>
            <div className="flex flex-col gap-5 w-full mt-5">
                {/* <input type="text" placeholder="Full Name" className="border-2 border-black/50 py-2 px-5 rounded-xl w-[25vw] text-sm" /> */}
                <form className='flex flex-col items-center justify-center gap-5'>
                    {/* <label htmlFor="email" className='text-xl font-bold'>Email:</label> */}
                    <input id="email" placeholder="Email Id" name="email" type="email" required className='border-2 text-lg font-semibold border-black/25 rounded-md p-2 w-full' />
                    {/* <label htmlFor="password" className='text-xl font-bold'>Password:</label> */}
                    <input id="password" placeholder="Password" name="password" type="password" required className='border-2 text-lg font-semibold border-black/25 rounded-md p-2 w-full' />
                    <button formAction={login} className='bg-black text-white p-2 text-lg font-semibold rounded-lg w-full'>Log in</button>
                    {/* <button formAction={signup} className='bg-black/25 hover:bg-black/50 text-white font-bold p-2 rounded-md'>Sign up</button> */}
                </form>
                {/* <div id="loginButton" className="flex gap-2 items-center">
                    <div className="w-full h-[0.75px] rounded-full bg-black"></div>
                    <p className="text-sm font-medium">or</p>
                    <div className="w-full h-[0.75px] rounded-full bg-black"></div>
                </div>
                <button className="flex items-center text-lg w-full border-2 py-3 justify-center border-black gap-5 font-semibold rounded-lg">
                    <Image src={GoogleLogo} alt="Google Logo" />
                    Login with Google
                </button> */}
            </div>
        </div>
    );
}
export default SignUp;