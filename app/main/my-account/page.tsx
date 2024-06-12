'use client'
import { useEffect } from "react";
import { useSidebar } from "../Providers/SidebarContext";
import Navigation from "../dashboard/_components/Navigation";
import Details from "./_components/AccountDetail";

const MyAccount = () => {
    const {selected, setSelected} = useSidebar()
    useEffect(() => {
        setSelected(100)
    }, [selected])
    return (
        <main className="w-full overflow-y-auto h-full transition-all ease-in-out">
            <Navigation bot={false} header="My Account" />
            <Details />
        </main>
    );
}

export default MyAccount;