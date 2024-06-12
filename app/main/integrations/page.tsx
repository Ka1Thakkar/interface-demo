'use client'

import { useEffect } from "react";
import { useSidebar } from "../Providers/SidebarContext";
import Navigation from "../dashboard/_components/Navigation";
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from "@/lib/utils";
import Integrations from "./_components/Integrations";
import IntegrationModal from "./_components/Modal";
import integration from '@/public/Agent_Rio.png'
import { useIntegrationModal } from "./Providers/useIntegrationModal";

const Main = () => {
    const { selected, setSelected } = useSidebar()
    useEffect(() => {
        setSelected(2)
    }, [selected])
    const { isOpen, toggleOpen } = useIntegrationModal()
    return (
        <>
            <div className={cn("w-full relative overflow-y-auto h-full transition-all ease-in-out")}>
                <Navigation bot={false} header="Integrations" />
                <div className={cn("h-fit w-full flex flex-col items-center justify-center overflow-y-auto p-3 transition-all ease-in-out relative")}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: 'easeInOut', duration: 0.5 }}
                        className="w-full border-2 border-black/10 p-5 lg:p-10 xl:px-16 2xl:px-[100px] min-h-screen"
                    >
                        <div className="flex flex-col justify-center items-center gap-[14px]">
                            <h1 className="font-semibold text-5xl tracking-tighter">
                                Integrations
                            </h1>
                            <p className="text-2xl font-semibold text-[#1C1C1C]/40 tracking-tight">
                                Connect our agents with your daily apps
                            </p>
                        </div>
                        <Integrations />
                    </motion.div>
                </div>
                <AnimatePresence>
                    {isOpen && <IntegrationModal />}
                </AnimatePresence>
            </div>
        </>
    );
}

export default Main;