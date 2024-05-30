'use client'

import { cn } from "@/lib/utils";
import Navigation from "../dashboard/_components/Navigation";
import { motion } from "framer-motion";
import { useSidebar } from "../Providers/SidebarContext";
import { useEffect } from "react";
import { useChat } from 'ai/react';
import { PaperPlaneRight } from "@phosphor-icons/react";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import User from "@/public/User.png"
import Olivia from "@/public/Agent_Olivia.png"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehype from 'rehype'

const Main = () => {

    const { selected, setSelected } = useSidebar()
    useEffect(() => {
        setSelected(1)
    }, [selected])
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    return (
        <div className="w-full overflow-y-auto h-full transition-all ease-in-out">
            <Navigation header="Chat" />
            <div className={cn("h-fit w-full flex flex-col items-center justify-center overflow-y-auto p-3 transition-all ease-in-out")}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: 'easeInOut', duration: 0.5 }}
                    className="w-full border-2 flex flex-col items-center border-black/10 p-5 lg:p-10 xl:px-10 min-h-screen relative"
                >
                    <div className={cn("flex flex-col w-full pb-10 gap-10")}>
                        {messages.map(m => (
                            <div key={m.id} className={cn("flex flex-col gap-5", m.role === 'user' ? "items-end" : "items-start")}>
                                <div className={cn("flex items-center gap-5", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                                    <Image src={m.role === 'user' ? User : Olivia} width={40} height={40} alt={m.role === 'user' ? 'Rebhav Bharadwaj' : 'Olivia'} className="rounded-full h-[50px] w-[50px]" />
                                    <div>
                                        <p className="font-semibold text-xl">{m.role === 'user' ? 'Rebhav Bharadwaj ' : 'Olivia '}</p>
                                        <p className="font-medium">{m.role === 'user' ? 'Inteface AI ' : 'Data Entry Agent'}</p>
                                    </div>
                                </div>
                                <Markdown remarkPlugins={[remarkGfm]} remarkRehypeOptions={{ allowDangerousHtml: true }} className={cn("p-4 w-fit border border-brandpurple text-wrap max-w-3xl overflow-auto", m.role === 'user' ? "text-black rounded-2xl rounded-br-lg font-semibold" : "text-white bg-brandpurple rounded-2xl rounded-bl-lg")}>
                                    {m.content}
                                </Markdown>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center fixed bottom-0 mb-8 w-[60%]">
                        <div className="items-center justify-around flex gap-5 border border-brandpurple rounded-lg shadow-md px-4 py-3 bg-white w-full">
                            <Paperclip />
                            <input
                                className="outline-none text-lg font-semibold h-fit w-full text-wrap"
                                value={input}
                                placeholder="Type a message"
                                onChange={handleInputChange}
                            />
                            <button onClick={(e) => {
                                handleSubmit(e as any)
                            }}>
                                <PaperPlaneRight size={32} />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default Main;