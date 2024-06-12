import { createClient } from "@/utils/supabase/server";
import Sidebar from "./_components/Sidebar";
import SignUp from "./_components/SignUp";
import Link from "next/link";
import { redirect } from "next/navigation";
import {Toaster} from 'react-hot-toast'

export default async function Home() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (data?.user) {
    redirect('/main/dashboard')
  }
  return (
    <main className="flex items-center justify-start w-screen h-screen overflow-hidden">
      <Sidebar />
      <div className="items-center justify-center flex w-full h-full flex-col gap-10 px-20">
        <SignUp />
        <p className="font-semibold text-center">
          By continuing, you agree to Interface&apos;s <Link href="" className="underline underline-offset-2">Terms of Service</Link> and <Link href="" className="underline underline-offset-2">Privacy Policy</Link>.
        </p>
      </div>
    </main>
  );
}