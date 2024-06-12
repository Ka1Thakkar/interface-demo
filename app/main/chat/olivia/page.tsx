'use client'

import { cn } from "@/lib/utils";
import Navigation from "../../dashboard/_components/Navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "../../Providers/SidebarContext";
import { useEffect, useState, useRef } from "react";
import { useChat } from 'ai/react';
import { Checks, Files, PaperPlaneRight, Pencil, Trash, X } from "@phosphor-icons/react";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import UserImage from "@/public/User.png"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ActionButtons from "../_components/ActionButtons";
import { useBot } from "@/app/_Providers/useBot";
import { useMessages } from "@/app/_Providers/useMessages";
import pdfIcon from '@/public/pdf.png'
import Fields from "../_components/Fields";
import { getUserDetails } from "@/app/_Providers/getUserDetails";
import { useUser } from "@/app/_Providers/useUser";
import { PulseLoader, SyncLoader } from 'react-spinners'
import imageIcon from '@/public/Image Icon.png'

const Main = () => {
    const { selected, setSelected } = useSidebar()
    const { globalMessages, setGlobalMessages } = useMessages()
    const [show, setShow] = useState(false);
    const { User, userCredits, userFullName, setUserCredits, setUser, userEmail, setUserEmail, setUserFullName } = useUser()
    const { messages, handleSubmit, handleInputChange, input, setMessages, setInput, stop, isLoading, append } = useChat({
        api: "/api/chat/olivia",
        // initialMessages: [{ id: (Math.random() + 1).toString(), role: "assistant", content: "Hey, I'm Olivia, you Data Entry Agent. I can add procurement bill invoices to procurement module of EagleOwl for you. Please share the invoice with me. Thanks!" }],
    });
    const { botName, botRole, botImage, setBotName, setBotRole, setBotImage, images } = useBot();
    const [files, setFiles] = useState<File[]>([]);
    // const [userName, setUserName] = useState<string>("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setBotName("Olivia")
        setBotRole("The Data Entry Agent")
        setBotImage(images[0])
        setSelected(1)
    }, [])
    useEffect(() => {
        getUserDetails().then(details => {
            if (Array.isArray(details) && details.length > 0) {
                const user = details[0];
                setUserFullName(user.company_name)
                setUserEmail(user.email)
            }
        });
    }, [])
    const uploadDocument = async (file: File) => {
        const formData = new FormData();
        formData.append("document", file, file.name);
        formData.append("username", userEmail)
        try {
            append({ role: "user", content: file.name })
            setLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/upload`, {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                const result = "Network Error"
                setMessages([...messages, { id: (Math.random() + 1).toString(), role: "assistant", content: result }]);
                throw new Error('Network response was not ok');
                // setLoading(false)
            } else {
                const result = await response.text();
                // console.log(result)
                setMessages([...messages, { id: (Math.random() + 1).toString(), role: "assistant", content: result }]);
                // setLoading(false)
                return result;
            }
        } catch (error) {
            return 'An error occurred while uploading the file.';
        }
    };
    const uploadDocuments = async (files: FileList) => {
        const fileArray = Array.from(files)
        const formData = new FormData();
        for (let i = 0; i < fileArray.length; i++) {
            formData.append("documents", fileArray[i], fileArray[i].name);
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/upload`, {
                method: "POST",
                body: formData,
            });
            const result = await response.text();
            // console.log(result);
            setMessages([...messages, { id: (Math.random() + 1).toString(), role: "assistant", content: result }]);
            return result;
        } catch (error) {
            console.error(error);
            return 'An error occurred while uploading the file.';
        }
    };
    useEffect(() => {
        stop()
        setMessages([])
    }, [botName, botRole])
    // useEffect(() => {
    //     const chat = document.getElementById('chat') as HTMLDivElement;
    //     if (chat) {
    //         chat.scrollIntoView({ behavior: 'smooth' });
    //     }
    //     // setMessages(globalMessages)
    // }, [messages])
    useEffect(() => {
        const chat = document.getElementById('chat') as HTMLDivElement;
        if (chat) {
            chat?.scrollIntoView({ behavior: 'smooth' });
        }
        if (globalMessages.length > 50) {
            setShow(true)
        }
    }, [messages, isLoading])
    return (
            <div className="w-full overflow-y-auto h-full transition-all ease-in-out">
                <Navigation bot={true} header="Chat" />
                {messages.length > 50 && show == true &&
                    <div role="button" onClick={() => setShow(false)} className="sticky left-0 top-32 z-[99999] w-full h-10 flex items-center justify-center">
                        <div className="text-lg font-semibold py-2 px-5 rounded-full text-brandpurple bg-white border border-brandpurple flex items-center gap-2">
                            Load {messages.length} + messages
                            <X />
                        </div>
                    </div>
                }
                <div className={cn("h-fit w-full flex flex-col relative items-center justify-center overflow-y-auto p-3 transition-all ease-in-out", show == true ? "-mt-10" : "mt-0")}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: 'easeInOut', duration: 0.5 }}
                        className="w-full border-2 flex flex-col items-center border-black/10 p-5 lg:p-10 xl:px-10 min-h-screen relative"
                    >
                        <div className={cn("flex flex-col w-full pb-32 gap-10 relative")}>
                            <div className={cn("flex flex-col gap-5 items-start")}>
                                <div className={cn("flex items-center gap-5 flex-row")}>
                                    <Image loading="lazy" blurDataURL={botImage.blurDataURL} src={botImage} width={40} height={40} alt={botName} className="rounded-full h-[50px] w-[50px]" />
                                    <div>
                                        <p className="font-semibold text-xl">{botName}</p>
                                        <p className="font-medium">{botRole}</p>
                                    </div>
                                </div>
                                <Markdown remarkPlugins={[remarkGfm]} remarkRehypeOptions={{ allowDangerousHtml: true }} className={cn("p-4 w-fit border border-brandpurple text-wrap max-w-3xl overflow-auto text-white bg-brandpurple rounded-2xl rounded-bl-lg")}>
                                    Hey, I'm Olivia, your Data Entry Agent. I can add procurement bill invoices to procurement module of EagleOwl for you. Please share the invoice with me. Thanks!
                                </Markdown>
                            </div>
                            {messages.map((m, index) => (
                                <div id={index === messages.length - 1 && index > 0 ? 'chat' : ''} key={index} className={cn("flex flex-col gap-5", m.role === 'user' ? "items-end" : "items-start")}>
                                    <div className={cn("flex items-center gap-5", m.role === 'user' ? "flex-row-reverse text-right" : "flex-row")}>
                                        <Image loading="lazy" blurDataURL={m.role === 'user' ? UserImage.blurDataURL : botImage.blurDataURL} src={m.role === 'user' ? UserImage : botImage} width={40} height={40} alt={m.role === 'user' ? userFullName : botName} className="rounded-full h-[50px] w-[50px]" />
                                        <div>
                                            <p className="font-semibold text-xl">{m.role === 'user' ? userFullName : botName}</p>
                                            <p className="font-medium">{m.role === 'user' ? userEmail : botRole}</p>
                                        </div>
                                    </div>
                                    {m.content.endsWith('.pdf') && (
                                        <div className="w-fit max-w-3xl text-wrap border-2 h-fit border-brandpurple rounded-2xl rounded-br-lg p-5 bg-white">
                                            <div className="w-full h-full p-20 rounded-lg rounded-br-lg border-2 border-black/40 flex flex-col items-center justify-center">
                                                <Image src={pdfIcon} alt="pdf icon" quality={100} className="" />
                                            </div>
                                            <div className="flex gap-2 items-start justify-center py-5 h-fit">
                                                <Checks size={20} />
                                                <p className="text-lg font-semibold text-wrap">
                                                    {m.content}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {(m.content.endsWith('.png') || m.content.endsWith('.jpg') || m.content.endsWith('.jpeg')) && (
                                        <div className="w-fit max-w-3xl text-wrap border-2 h-fit border-brandpurple rounded-2xl rounded-br-lg p-5 bg-white">
                                            <div className="w-full h-full p-20 rounded-lg rounded-br-lg border-2 border-black/40 flex flex-col items-center justify-center">
                                                <Image src={imageIcon} alt="pdf icon" quality={100} className="h-16 w-16 opacity-50" />
                                            </div>
                                            <div className="flex gap-2 items-start justify-center py-5 h-fit">
                                                <Checks size={20} />
                                                <p className="text-lg font-semibold text-wrap">
                                                    {m.content}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {m.content.startsWith("{") && userEmail !== " " && JSON.parse(m.content).missing_fields &&
                                        (
                                            <Fields rcv_responses={JSON.parse(m.content).rcv_responses} userEmail={userEmail} user_outlets={JSON.parse(m.content).user_outlets} missing_fields={JSON.parse(m.content).missing_fields[0]} />
                                        )
                                    }
                                    {!m.content.endsWith('pdf') && !m.content.startsWith("{") && !m.content.endsWith('Loading.') && !m.content.endsWith('.png') && !m.content.endsWith('.jpg') && !m.content.endsWith('.jpeg') && (
                                        <Markdown remarkPlugins={[remarkGfm]} remarkRehypeOptions={{ allowDangerousHtml: true }} className={cn("p-4 w-fit border border-brandpurple text-wrap max-w-3xl overflow-auto", m.role === 'user' ? "text-black rounded-2xl rounded-br-lg font-semibold" : "text-white bg-brandpurple rounded-2xl rounded-bl-lg")}>
                                            {m.content}
                                        </Markdown>
                                    )}
                                    {loading && m.content.endsWith("Loading.") && (
                                        <div className={cn("flex flex-col gap-2 items-start")}>
                                            <Markdown remarkPlugins={[remarkGfm]} remarkRehypeOptions={{ allowDangerousHtml: true }} className={cn("p-4 w-fit border border-brandpurple text-wrap max-w-3xl overflow-auto", m.role === 'user' ? "text-black rounded-2xl rounded-br-lg font-semibold" : "text-white bg-brandpurple rounded-2xl rounded-bl-lg")}>
                                                {m.content.split("Loading.")[0]}
                                            </Markdown>
                                            <div className={cn("p-4 w-fit border border-brandpurple text-wrap max-w-3xl overflow-auto", m.role === 'user' ? "text-black rounded-2xl rounded-br-lg font-semibold" : "text-white bg-brandpurple rounded-2xl rounded-bl-lg")}>
                                                <PulseLoader color="#FFFFFF" size={8} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center justify-center fixed bottom-0 mb-8 w-[70%] lg:w-[55%]">
                            {messages.length < 1 &&
                                <div className="grid grid-cols-3 gap-5 w-full">
                                    <ActionButtons name="Add Invoices" icon={<Pencil size={35} weight="duotone" />}
                                        onClick={() => {
                                            const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
                                            fileUpload.click()
                                            fileUpload.onchange = async () => {
                                                if (fileUpload.files && fileUpload.files[0] && userEmail !== "") {
                                                    const response = await uploadDocument(fileUpload.files[0]);
                                                    setLoading(false)
                                                    fileUpload.value = ""
                                                } else {
                                                    const response = "We are initializing the chat. Please try uploading the document again."
                                                    setMessages([...messages, { id: (Math.random() + 1).toString(), role: "assistant", content: response }]);
                                                    fileUpload.value = ""
                                                }
                                            };
                                        }}
                                    />
                                    <ActionButtons name="Bulk Upload" icon={<Files size={40} weight="duotone" />}
                                        onClick={(e: any) => {
                                            // const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
                                            // fileUpload.click()
                                            // fileUpload.onchange = async () => {
                                            //     if (fileUpload.files && fileUpload.files[0]) {
                                            //         setMessages([...messages, { id: (Math.random() + 1).toString(36).substring(7), role: "user", content: fileUpload.files[0].name }]);
                                            //         const response = await uploadDocuments(fileUpload.files);
                                            //     }
                                            // };
                                        }}
                                    />
                                    <ActionButtons name="Clear Conversation" icon={<Trash size={40} weight="duotone" />} onClick={() => { stop(); setMessages([]) }} />
                                </div>
                            }
                            <div className="flex items-center gap-2 w-full">
                                <div className="flex items-center gap-5 border border-brandpurple bg-white rounded-lg w-full py-2 px-5 shadow shadow-brandpurple/50">
                                    <button id="fileButton" type="button" onClick={() => {
                                        const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
                                        fileUpload.click()
                                        fileUpload.onchange = async () => {
                                            if (fileUpload.files && fileUpload.files[0] && userEmail !== "") {
                                                // setLoading(true)
                                                const response = await uploadDocument(fileUpload.files[0]);
                                                setLoading(false)
                                                fileUpload.value = ""
                                            } else {
                                                const response = "We are initializing the chat. Please try uploading the document again."
                                                setMessages([...messages, { id: (messages.length+1).toString(), role: "assistant", content: response }]);
                                                fileUpload.value = ""
                                            }
                                        };
                                    }}>
                                        <Paperclip />
                                    </button>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*, application/pdf"
                                    />
                                    <input
                                        className="outline-none text-lg font-semibold h-fit w-full text-wrap"
                                        value={input}
                                        placeholder="Type a message"
                                        onChange={handleInputChange}
                                    />
                                    <button type="submit">
                                        <PaperPlaneRight size={32} />
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {messages.length > 0 &&
                                        <motion.button
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ ease: "easeInOut", duration: 0.1 }}
                                            onClick={() => { stop(); setGlobalMessages([]); setMessages([]); scrollTo({top: 0, behavior: 'smooth'}) }} className="border bg-white border-brandpurple text-black rounded-lg p-2 shadow shadow-brandpurple/50">
                                            <Trash size={32} />
                                        </motion.button>
                                    }
                                </AnimatePresence>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
    );
}

export default Main;