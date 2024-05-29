'use client'
import { PanelLeft } from "lucide-react";
import Image from "next/image";
import { useSidebar } from "../Providers/SidebarContext";
import Navigation from "./_components/Navigation";
import Main from "./_components/MainContent/Main";
import { useEffect } from "react";

export default function Home() {
  const {selected, setSelected} = useSidebar()
    useEffect(() => {
        setSelected(0)
    }, [selected])
  return (
    <main className="w-full overflow-y-auto h-full transition-all ease-in-out min-h-screen">
      <Navigation header="Dashboard" />
      <Main />
    </main>
  );
}
