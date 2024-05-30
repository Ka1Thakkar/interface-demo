import Image from "next/image";
import Sidebar from "./_components/Sidebar";
import SignUp from "./_components/SignUp";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-start w-screen min-h-screen">
      <Sidebar />
      <div className="items-center justify-center flex w-full h-full flex-col gap-10 px-10">
        <SignUp />
        <p className="font-semibold text-lg text-center">
          By continuing, you agree to Interface&apos;s <Link href="" className="underline underline-offset-2">Terms of Service</Link> and <Link href="" className="underline underline-offset-2">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}