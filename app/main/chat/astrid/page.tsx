'use client'

import { cn } from "@/lib/utils";
import Navigation from "../../dashboard/_components/Navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "../../Providers/SidebarContext";
import { useEffect, useState, useRef } from "react";
import { useChat } from 'ai/react';
import { Checks, Files, PaperPlaneRight, Pencil, Play, Trash, X } from "@phosphor-icons/react";
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
import csvIcon from '@/public/csvIcon.png'
import Link from "next/link";
import temp from '@/public/chatTemp.png'

const Main = () => {
    const { selected, setSelected } = useSidebar()
    const { globalMessages, setGlobalMessages } = useMessages()
    const [show, setShow] = useState(false);
    const { User, userCredits, userFullName, setUserCredits, setUser, userEmail, setUserEmail, setUserFullName } = useUser()
    const { messages, handleSubmit, handleInputChange, input, setMessages, setInput, stop, isLoading, append } = useChat({
        api: "/api/chat/astrid",
        // initialMessages: [{ id: (Math.random() + 1).toString(), role: "assistant", content: "Hey, I'm Olivia, you Data Entry Agent. I can add procurement bill invoices to procurement module of EagleOwl for you. Please share the invoice with me. Thanks!" }],
    });
    const { botName, botRole, botImage, setBotName, setBotRole, setBotImage, images } = useBot();
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false)
    // const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        setBotName("Astrid")
        setBotRole("The Data Scientist Agent")
        setBotImage(images[1])
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
            // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/file-upload`, {
            //     method: "POST",
            //     body: formData,
            // });
            const response = await fetch(`https://backend.getinterface.tech/file-upload`, {
                method: "POST",
                body: formData,
            });
            // if (response.ok) {
            //     // This means the status code is not 500
            //     append({ role: "user", content: file.name })
            // }
            const result = await response.text();
            return result;
        } catch (error) {
            console.log('An error occurred while uploading the file.');
        }
    };
    useEffect(() => {
        stop()
        setMessages([])
    }, [botName, botRole])
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
                                Hey, I'm Astrid, your personal Data Scientist, How can I help you?
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
                                {m.content.endsWith('.csv') && (
                                    <div className="w-fit max-w-3xl text-wrap border-2 h-fit border-brandpurple rounded-2xl rounded-br-lg p-5 bg-white">
                                        <div className="w-full h-full p-16 rounded-lg rounded-br-lg border-2 border-black/40 flex flex-col items-center justify-center">
                                            <Image src={csvIcon} alt="pdf icon" quality={100} className="h-16 w-16" />
                                        </div>
                                        <div className="flex gap-2 items-start justify-center py-5 h-fit">
                                            <Checks size={20} />
                                            <p className="text-lg font-semibold text-wrap">
                                                {m.content}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {m.content.endsWith('.xlsx') && (
                                    <div className="w-fit max-w-3xl text-wrap border-2 h-fit border-brandpurple rounded-2xl rounded-br-lg p-5 bg-white">
                                        <div className="w-full h-full p-16 rounded-lg rounded-br-lg border-2 border-black/40 flex flex-col items-center justify-center">
                                            <Image src={csvIcon} alt="pdf icon" quality={100} className="h-16 w-16" />
                                        </div>
                                        <div className="flex gap-2 items-start justify-center py-5 h-fit">
                                            <Checks size={20} />
                                            <p className="text-lg font-semibold text-wrap">
                                                {m.content}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {!m.content.endsWith('pdf') && !m.content.endsWith('csv') && !m.content.endsWith('xlx') && !m.content.startsWith("{") && !m.content.startsWith("http") && (
                                    <Markdown remarkPlugins={[remarkGfm]} remarkRehypeOptions={{ allowDangerousHtml: true }} className={cn("p-4 w-fit border border-brandpurple text-wrap max-w-3xl overflow-auto", m.role === 'user' ? "text-black rounded-2xl rounded-br-lg font-semibold" : "text-white bg-brandpurple rounded-2xl rounded-bl-lg")}>
                                        {m.content}
                                    </Markdown>
                                )}
                                {m.content.startsWith("http") && !isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="border-2 border-brandpurple w-fit p-4 rounded-2xl rounded-bl-lg max-w-xl flex flex-col gap-2">
                                        <p className="text-lg font-semibold">
                                            The task is being automated! Check it out here -
                                        </p>
                                        <Link target="_blank" href={m.content} className="text-lg font-semibold text-brandpurple underline underline-offset-2 decoration-brandpurple">
                                            <p>{"browse.getinterface.tech"}</p>
                                        </Link>
                                        <div className="w-full flex justify-center relative rounded-2xl rounded-bl-lg overflow-hidden mt-5">
                                            <Image src={temp} alt="stream_link" quality={100} className="w-full h-fit rounded-2xl rounded-bl-lg" />
                                            <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center bg-black/15 z-1">
                                                <Link target="_blank" href={m.content}>
                                                    <div className="p-4 rounded-full bg-white flex items-center justify-center">
                                                        <Play size={28} weight="duotone" className="text-black" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center justify-center fixed bottom-0 mb-8 w-[70%] lg:w-[55%]">
                        {messages.length < 1 &&
                            <div className="grid grid-cols-3 gap-5 w-full">
                                <ActionButtons name="Manipulate CSV" icon={<Files size={40} weight="duotone" />}
                                    onClick={(e: any) => {
                                        const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
                                        fileUpload.click()
                                        fileUpload.onchange = async () => {
                                            if (fileUpload.files && fileUpload.files[0] && userEmail !== "") {
                                                append({ role: "user", content: fileUpload.files[0].name })
                                                const response = await uploadDocument(fileUpload.files[0]);
                                                fileUpload.value = ""
                                            } else {
                                                setMessages([...messages, { id: (Math.random() + 1).toString(36).substring(7), role: "assistant", content: "We are initializing the chat. Please try uploading the document again." }]);
                                                fileUpload.value = ""
                                            }
                                        };
                                        // setTimeout(() => {
                                        //     setMessages([...messages, { id: (Math.random() + 1).toString(36).substring(7), role: "assistant", content: "http://34.47.136.25:8080/?password=CHANGE_IT" }]);
                                        // }, 10000)
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
                                <ActionButtons name="Upload CSV" icon={<Pencil size={35} weight="duotone" />}
                                    onClick={() => {
                                        // const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
                                        // fileUpload.click()
                                        // fileUpload.onchange = async () => {
                                        //     if (fileUpload.files && fileUpload.files[0] && userEmail !== "") {
                                        //         append({ role: "user", content: fileUpload.files[0].name })
                                        //         const response = await uploadDocument(fileUpload.files[0]);
                                        //         fileUpload.value = ""
                                        //     } else {
                                        //         setMessages([...messages, { id: (Math.random() + 1).toString(36).substring(7), role: "assistant", content: "We are initializing the chat. Please try uploading the document again." }]);
                                        //         fileUpload.value = ""
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
                                            append({ role: "user", content: fileUpload.files[0].name })
                                            const response = await uploadDocument(fileUpload.files[0]);
                                            fileUpload.value = ""
                                        } else {
                                            setMessages([...messages, { id: (Math.random() + 1).toString(36).substring(7), role: "assistant", content: "We are initializing the chat. Please try uploading the document again." }]);
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
                                    accept=".csv,.xlsx"
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
                                {messages.length > 1 &&
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ ease: "easeInOut", duration: 0.1 }}
                                        onClick={() => { stop(); setGlobalMessages([]); setMessages([]) }} className="border bg-white border-brandpurple text-black rounded-lg p-2 shadow shadow-brandpurple/50">
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

// 'use client'

// import { cn } from "@/lib/utils";
// import Navigation from "../../dashboard/_components/Navigation";
// import { AnimatePresence, motion } from "framer-motion";
// import { useSidebar } from "../../Providers/SidebarContext";
// import { useEffect, useState, useRef } from "react";
// import { useAssistant, useChat } from 'ai/react';
// import { CaretDown, ChatsTeardrop, Checks, Files, LightbulbFilament, MapTrifold, PaperPlaneRight, Pencil, Trash, X } from "@phosphor-icons/react";
// import { CircleDot, Paperclip } from "lucide-react";
// import Image from "next/image";
// import User from "@/public/User.png"
// import Olivia from "@/public/Agent_Olivia.png"
// import Markdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import rehype from 'rehype'
// import ActionButtons from "../_components/ActionButtons";
// import { useBot } from "@/app/_Providers/useBot";
// import { useMessages } from "@/app/_Providers/useMessages";
// import pdfIcon from '@/public/pdf.png'
// import Fields from "../_components/Fields";
// import { getUserDetails } from "@/app/_Providers/getUserDetails";

// const Main = () => {
//     const {threadId} = useAssistant({
//         api  :'/api/chat',
//         threadId : 'thread_fxocoYVwd2EZwyOGfgkzTxsp'
//     })
//     const { selected, setSelected } = useSidebar()
//     const { globalMessages, setGlobalMessages } = useMessages()
//     const [show, setShow] = useState(false);
//     const { messages, handleSubmit, handleInputChange, input, setMessages, setInput, stop, isLoading, append } = useChat({
//         api: "/api/chat/astrid",
//         initialMessages: [...globalMessages],
//         // generateId: () => {
//         //     return (parseInt(messages[messages.length].id) + 1).toString();
//         // }
//     });
//     const { botName, botRole, botImage, setBotName, setBotRole, setBotImage, images } = useBot();
//     const [files, setFiles] = useState<File[]>([]);
//     const [userName, setUserName] = useState<string>("");
//     const [userEmail, setUserEmail] = useState<string>("");

//     useEffect(() => {
//         setBotName("Astrid")
//         setBotRole("The Data Scientist Agent")
//         setBotImage(images[1])
//     }, [])

//     useEffect(() => {
//         getUserDetails().then(details => {
//             if (Array.isArray(details) && details.length > 0) {
//                 const user = details[0];
//                 setUserName(user.company_name)
//                 setUserEmail(user.email)
//                 // setCountry(user.country)
//                 console.log(details)
//             }
//         });
//         console.log(userName)
//     }, [selected === 1])

//     const uploadDocument = async (file: File) => {
//         const formData = new FormData();
//         formData.append("document", file, file.name);
//         formData.append("username", userEmail)
//         try {
//             const response = await fetch("https://backend.getinterface.tech/file-upload", {
//                 method: "POST",
//                 body: formData,
//             });
//             const result = await response.text();
//             console.log(result)
//             setMessages([...messages, { id: (Math.random() + 1).toString(), role: "assistant", content: result }]);
//             return result;
//         } catch (error) {
//             return 'An error occurred while uploading the file.';
//         }
//     };

//     const uploadDocuments = async (files: FileList) => {
//         const fileArray = Array.from(files)
//         const formData = new FormData();
//         for (let i = 0; i < fileArray.length; i++) {
//             formData.append("documents", fileArray[i], fileArray[i].name);
//         }
//         try {
//             const response = await fetch("https://backend.getinterface.tech/upload", {
//                 method: "POST",
//                 body: formData,
//             });
//             const result = await response.text();
//             console.log(result);
//             setMessages([...messages, { id: (Math.random() + 1).toString(), role: "assistant", content: result }]);
//             return result;
//         } catch (error) {
//             console.error(error);
//             return 'An error occurred while uploading the file.';
//         }
//     };

//     useEffect(() => {
//         setSelected(1)
//     }, [selected])
//     useEffect(() => {
//         stop()
//         setMessages([])
//     }, [botName, botRole])
//     // useEffect(() => {
//     //     if (messages.length > 0) {
//     //         setGlobalMessages([...messages])
//     //     }
//     //     else {
//     //         setMessages(globalMessages)
//     //     }
//     // }, [isLoading, messages])
//     useEffect(() => {
//         const chat = document.getElementById('chat') as HTMLDivElement;
//         if (chat) {
//             chat.scrollIntoView({ behavior: 'smooth' });
//         }
//         setMessages(globalMessages)
//     }, [selected === 1])
//     useEffect(() => {
//         const chat = document.getElementById('chat') as HTMLDivElement;
//         if (chat) {
//             chat?.scrollIntoView({ behavior: 'smooth' });
//         }
//         if (globalMessages.length > 50) {
//             setShow(true)
//         }
//     }, [messages, isLoading])
//     if (botName === "Astrid") {
//     return (
//         <div className="w-full overflow-y-auto h-full transition-all ease-in-out">
//             <Navigation bot={true} header="Chat" />
//             {messages.length > 50 && show == true &&
//                 <div role="button" onClick={() => setShow(false)} className="sticky left-0 top-32 z-[99999] w-full h-10 flex items-center justify-center">
//                     <div className="text-lg font-semibold py-2 px-5 rounded-full text-brandpurple bg-white border border-brandpurple flex items-center gap-2">
//                         Load {messages.length} + messages
//                         <X />
//                     </div>
//                 </div>
//             }
//             <div className={cn("h-fit w-full flex flex-col relative items-center justify-center overflow-y-auto p-3 transition-all ease-in-out", show == true ? "-mt-10" : "mt-0")}>
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ ease: 'easeInOut', duration: 0.5 }}
//                     className="w-full border-2 flex flex-col items-center border-black/10 p-5 lg:p-10 xl:px-10 min-h-screen relative"
//                 >
//                     <div className={cn("flex flex-col w-full pb-32 gap-10 relative")}>
//                         {messages.map((m, index) => (
//                             <div id={index === globalMessages.length - 1 && index > 0 ? 'chat' : ''} key={index} className={cn("flex flex-col gap-5", m.role === 'user' ? "items-end" : "items-start")}>
//                                 <div className={cn("flex items-center gap-5", m.role === 'user' ? "flex-row-reverse text-right" : "flex-row")}>
//                                     <Image src={m.role === 'user' ? User : botImage} width={40} height={40} alt={m.role === 'user' ? userName : botName} className="rounded-full h-[50px] w-[50px]" />
//                                     <div>
//                                         <p className="font-semibold text-xl">{m.role === 'user' ? userName : botName}</p>
//                                         <p className="font-medium">{m.role === 'user' ? userEmail : botRole}</p>
//                                     </div>
//                                 </div>
//                                 {m.content.endsWith('.pdf') && (
//                                     <div className="w-fit max-w-3xl text-wrap border-2 h-fit border-brandpurple rounded-2xl rounded-br-lg p-5 bg-white">
//                                         <div className="w-full h-full p-20 rounded-lg rounded-br-lg border-2 border-black/40 flex flex-col items-center justify-center">
//                                             <Image src={pdfIcon} alt="pdf icon" quality={100} className="" />
//                                         </div>
//                                         <div className="flex gap-2 items-start justify-center py-5 h-fit">
//                                             <Checks size={20} />
//                                             <p className="text-lg font-semibold text-wrap">
//                                                 {m.content}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 )}
//                                 {/* {m.content.startsWith("{") &&
//                                     (
//                                         <Fields user_outlets={JSON.parse(m.content).user_outlets} missing_fields={JSON.parse(m.content).missing_fields[0]} />
//                                     )
//                                 } */}
//                                 {!m.content.endsWith('pdf') && !m.content.startsWith("{") && (
//                                     <Markdown remarkPlugins={[remarkGfm]} remarkRehypeOptions={{ allowDangerousHtml: true }} className={cn("p-4 w-fit border border-brandpurple text-wrap max-w-3xl overflow-auto", m.role === 'user' ? "text-black rounded-2xl rounded-br-lg font-semibold" : "text-white bg-brandpurple rounded-2xl rounded-bl-lg")}>
//                                         {m.content}
//                                     </Markdown>
//                                 )}
//                                 {/* {m.content.endsWith('.pdf') ? (
//                                     <div className="w-fit max-w-3xl text-wrap border-2 h-fit border-brandpurple rounded-2xl rounded-br-lg p-5 bg-white">
//                                         <div className="w-full h-full p-20 rounded-lg rounded-br-lg border-2 border-black/40 flex flex-col items-center justify-center">
//                                             <Image src={pdfIcon} alt="pdf icon" quality={100} className="" />
//                                         </div>
//                                         <div className="flex gap-2 items-start justify-center py-5 h-fit">
//                                             <Checks size={20} />
//                                             <p className="text-lg font-semibold text-wrap">
//                                                 {m.content}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <Markdown remarkPlugins={[remarkGfm]} remarkRehypeOptions={{ allowDangerousHtml: true }} className={cn("p-4 w-fit border border-brandpurple text-wrap max-w-3xl overflow-auto", m.role === 'user' ? "text-black rounded-2xl rounded-br-lg font-semibold" : "text-white bg-brandpurple rounded-2xl rounded-bl-lg")}>
//                                         {m.content}
//                                     </Markdown>
//                                 )} */}
//                             </div>
//                         ))}
//                     </div>
//                     <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center justify-center fixed bottom-0 mb-8 w-[70%] lg:w-[55%]">
//                         {messages.length < 1 &&
//                             <div className="grid grid-cols-3 gap-5 w-full">
//                                 <ActionButtons name="Upload CSV" icon={<Pencil size={35} weight="duotone" />}
//                                     onClick={() => {
//                                         const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
//                                         fileUpload.click()
//                                         fileUpload.onchange = async () => {
//                                             if (fileUpload.files && fileUpload.files[0]) {
//                                                 append({ role: "user", content: fileUpload.files[0].name })
//                                                 const response = await uploadDocument(fileUpload.files[0]);
//                                             }
//                                         };
//                                     }}
//                                 />
//                                 <ActionButtons name="Manipulate CSV" icon={<Files size={40} weight="duotone" />}
//                                     onClick={(e: any) => {
//                                         // const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
//                                         // fileUpload.click()
//                                         // fileUpload.onchange = async () => {
//                                         //     if (fileUpload.files && fileUpload.files[0]) {
//                                         //         setMessages([...messages, { id: (Math.random() + 1).toString(36).substring(7), role: "user", content: fileUpload.files[0].name }]);
//                                         //         const response = await uploadDocuments(fileUpload.files);
//                                         //     }
//                                         // };
//                                     }}
//                                 />
//                                 <ActionButtons name="Clear Conversation" icon={<Trash size={40} weight="duotone" />} onClick={() => { stop(); setMessages([]) }} />
//                             </div>
//                         }
//                         <div className="flex items-center gap-2 w-full">
//                             <div className="flex items-center gap-5 border-2 border-brandpurple bg-white rounded-lg w-full py-2 px-5 shadow shadow-brandpurple/50">
//                                 <button id="fileButton" type="button" onClick={() => {
//                                     const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
//                                     fileUpload.click()
//                                     fileUpload.onchange = async () => {
//                                         if (fileUpload.files && fileUpload.files[0]) {
//                                             append({ role: "user", content: fileUpload.files[0].name })
//                                             const response = await uploadDocument(fileUpload.files[0]);
//                                         }
//                                     };
//                                 }}>
//                                     <Paperclip />
//                                 </button>
//                                 <input
//                                     id="file-upload"
//                                     type="file"
//                                     className="hidden"
//                                     accept=".csv"
//                                 />
//                                 <input
//                                     className="outline-none text-lg font-semibold h-fit w-full text-wrap"
//                                     value={input}
//                                     placeholder="Type a message"
//                                     onChange={handleInputChange}
//                                 />
//                                 <button type="submit">
//                                     <PaperPlaneRight size={32} />
//                                 </button>
//                             </div>
//                             <AnimatePresence>
//                                 {messages.length > 1 &&
//                                     <motion.button
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         exit={{ opacity: 0 }}
//                                         transition={{ ease: "easeInOut", duration: 0.1 }}
//                                         onClick={() => { stop(); setGlobalMessages([]); setMessages([]) }} className="border-2 border-brandpurple text-black rounded-lg p-2 shadow shadow-brandpurple/50">
//                                         <Trash size={32} />
//                                     </motion.button>
//                                 }
//                             </AnimatePresence>
//                         </div>
//                     </form>
//                 </motion.div>
//             </div>
//         </div>
//     )};
// }

// export default Main;