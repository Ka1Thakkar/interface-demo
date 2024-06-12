'use client'

import { cn } from "@/lib/utils";
import { useSidebar } from "../../Providers/SidebarContext";
import { Clipboard, MagnifyingGlass, PhoneCall, Sidebar } from "@phosphor-icons/react";
import { motion } from 'framer-motion'
import { VscSparkle } from 'react-icons/vsc'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useBot } from '@/app/_Providers/useBot'
import { ChevronsUpDown } from "lucide-react";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { getUserCredits } from "@/app/_Providers/getUserDetails";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/_Providers/useUser";

interface NavigationProps {
    header: string;
    bot: boolean;
}

const Navigation = ({ header, bot }: NavigationProps) => {
    const { botName, botRole, setBotName, setBotRole, botImage, setBotImage, images } = useBot()
    const { messages, handleSubmit, handleInputChange, input, setMessages, setInput } = useChat();
    // const [credits, setCredits] = useState(0)
    const { selected, setSelected } = useSidebar()
    const [fetched, setFetched] = useState(false)
    const router = useRouter()
    const { User, userCredits, userFullName, setUserCredits } = useUser()
    useEffect(() => {
        getUserCredits().then(details => {
            if (Array.isArray(details) && details.length > 0) {
                const user = details[0];
                setUserCredits(user.credits)
                // setCountry(user.country)
                // console.log(details)
            }
        });
    }, [])
    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.25 }}
            className={cn(" md:px-10 px-5 py-5 flex flex-grow justify-end w-full items-center h-fit border-b-2 border-black/10 bg-white sticky top-0 gap-20 z-[999] transition-all ease-in-out")}
        >
            <div className={cn("flex justify-between items-center gap-20 w-full")}>
                <div className="flex items-center gap-5">
                    <p className="text-brandpurple font-bold text-xl min-w-fit">
                        {header}
                    </p>
                    {bot === true && <p className="text-xl font-bold text-black/20">/</p>}
                    {bot === true &&
                        <DropdownMenu>
                            <DropdownMenuTrigger className="xl:text-xl font-bold flex gap-5 items-center min-w-fit">
                                <p>
                                    {botName} - {botRole}
                                </p>
                                <ChevronsUpDown size={20} className="text-black" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-full text-xl mt-2 font-bold p-5 flex flex-col gap-2 min-w-fit">
                                <DropdownMenuItem onClick={() => {
                                    router.push(`/main/chat/olivia`)
                                    setBotName("Olivia")
                                    setBotRole("Data Entry Agent")
                                    setBotImage(images[0])
                                    setMessages([])
                                    setInput("")
                                }}>
                                    <p>
                                        Olivia - Data Entry Agent
                                    </p>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    router.push(`/main/chat/astrid`)
                                    setBotName("Astrid")
                                    setBotRole("Data Scientist Agent")
                                    setBotImage(images[1])
                                    setMessages([])
                                    setInput("")
                                }}>
                                    <p>
                                        Astrid - Data Scientist Agent
                                    </p>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="opacity-50 cursor-not-allowed" onClick={() => {
                                    // setBotName("Rio")
                                    // setBotRole("Procurement Analyst")
                                    // setBotImage(images[2])
                                    // setMessages([])
                                    // setInput("")
                                }}>
                                    <p>
                                        Rio - Procurement Analyst
                                    </p>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>
                <div className="flex gap-5 text-sm font-semibold w-fit">
                    <p className="flex py-2 px-5 gap-2 items-center border border-black/10 rounded-lg min-w-fit">
                        <VscSparkle size={20} className="text-brandpurple" />
                        <span className="text-lg font-semibold">
                            {userCredits} credits
                        </span>
                    </p>
                    {/* <div className="bg-black/5 w-full flex items-center h-[100%] rounded-lg gap-2 px-5 py-2">
                        <MagnifyingGlass height={16} width={16} className="text-black/20" />
                        <input placeholder="Search" className="bg-transparent outline-none py-1 placeholder:text-black/20 w-full" />
                        <p className="text-black/20">
                            ⌘/
                        </p>
                    </div> */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center w-fit gap-2 border border-black/10 rounded-lg px-5 py-2">
                            <PhoneCall size={20} className="text-brandpurple" />
                            <p className="text-black text-lg font-semibold">
                                Contact Founder
                            </p>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-full text-xl mt-2 font-bold p-5 flex flex-col gap-2 min-w-fit">
                            <DropdownMenuItem className="flex gap-2 items-center" onClick={() => {
                                navigator.clipboard.writeText("+91 9080853690")
                            }}>
                                <p>
                                    Rebhav : +91 9080853690
                                </p>
                                <button className="">
                                    <Clipboard size={16} className="text-brandpurple" />
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </motion.nav>
    );
}

export default Navigation;