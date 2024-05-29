'use client'

import { useSidebar } from "../../Providers/SidebarContext";
import { MagnifyingGlass, Sidebar } from "@phosphor-icons/react";
import { motion } from 'framer-motion'
import { VscSparkle } from 'react-icons/vsc'

interface NavigationProps {
    header: string;
}

const Navigation = ({ header }: NavigationProps) => {
    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.25 }}
            className="xl:pr-10 xl:pl-0 md:px-10 px-5 py-5 flex flex-grow justify-end w-full items-center h-fit border-b-2 border-black/10 bg-white sticky top-0 gap-20 z-[99999] transition-all ease-in-out"
        >
            <div className="w-full lg:min-w-[52.5%] xl:w-[52.5%] flex justify-between items-center gap-20">
                <p className="text-brandpurple font-bold text-xl min-w-fit">
                    {header}
                </p>
                <div className="flex gap-5 items-center text-sm font-semibold">
                    <p className="flex py-2 px-5 gap-2 items-center border border-black/10 rounded-lg min-w-fit">
                        <VscSparkle className="text-brandpurple" />
                        <span>
                            125 credits
                        </span>
                    </p>
                    <div className="bg-black/5 h-fit flex items-center rounded-lg gap-2 md:w-fit px-2">
                        <MagnifyingGlass height={16} width={16} className="text-black/20" />
                        <input placeholder="Search" className="bg-transparent outline-none py-1 placeholder:text-black/20 w-full" />
                        <p className="text-black/20">
                            ⌘/
                        </p>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}

export default Navigation;