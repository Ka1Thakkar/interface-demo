import { cn } from "@/lib/utils";
import { CaretDown, Checks, PaperPlaneRight, Play } from "@phosphor-icons/react";
import { CircleDot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import temp from '@/public/chatTemp.png'
import { AnimatePresence, motion } from "framer-motion";
import { getUserDetails } from "@/app/_Providers/getUserDetails";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Fields = ({ missing_fields, user_outlets, userEmail, rcv_responses }: { missing_fields: string[], user_outlets: string[], userEmail: string, rcv_responses: any }) => {
    const [open, setOpen] = useState(false);
    const [closedFields, setClosedFields] = useState(0);
    // const innerArray = missing_fields[0].push("Select Outlet")
    const [Fields, setFields] = useState([...missing_fields, "Select Outlet"])
    const [length, setLength] = useState(Fields.length);
    const [submit, setSubmit] = useState(false)
    const [submitFields, setSubmitFields] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [Response, setResponse] = useState<any>(null)
    const [selectedOutlet, setSelectedOutlet] = useState<string>("Select Outlet")
    function encodeFormData(data: any) {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    }

    const updateFields = async () => {
        setLoading(true)
        const header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        const requestOptions = {
            method: 'POST',
            headers: header,
            body: encodeFormData({ ...submitFields, username: userEmail, rcv_responses: JSON.stringify(rcv_responses) })
        };
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/upload-extended`, requestOptions).then((res) => res.json());
        setResponse(response)
        if (response.stream_link) {
            setSubmit(true)
        } else {
            setSubmit(false)
        }
    }
    return (
        <div className="flex flex-col gap-5">
            <div className="border-2 border-brandpurple rounded-2xl rounded-bl-lg max-w-4xl">
                <div className="flex gap-5 bg-black/10 p-4 border-b-2 border-brandpurple">
                    <div className="flex gap-2 items-center">
                        <CircleDot size={20} />
                        <p className="text-lg font-semibold">
                            {length} open
                        </p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Checks size={20} weight="bold" />
                        <p className="text-lg font-semibold">
                            {closedFields} closed
                        </p>
                    </div>
                </div>
                <div className="p-4 flex flex-col gap-2">
                    {Fields.map((field: any, index: number) => {
                        const [open, setOpen] = useState(false);
                        const [fixed, setFixed] = useState(false);
                        return (
                            <div key={index} className="flex flex-col gap-2">
                                <div className="flex gap-10 items-center justify-between py-2">
                                    <div className="flex gap-4 items-center">
                                        {!fixed ? <CircleDot size={20} className={cn(field.toLowerCase().includes('warning') && 'text-orange-500', field.toLowerCase().includes('missing') && 'text-red-500')} /> : <Checks size={20} className="text-[#ABE423]" />}
                                        <p className="text-lg font-semibold">
                                            {field}
                                        </p>
                                    </div>
                                    {field !== "Select Outlet" && <button onClick={() => {
                                        setOpen(!open)
                                    }} className={cn("border-2 border-black px-4 py-1 rounded-lg flex gap-2 items-center", fixed && "bg-[#ABE423]")}>
                                        {fixed ? "Issue Fixed" : "Fix Issue"}
                                        {!fixed && <CaretDown size={20} className="text-black/50" />}
                                    </button>}
                                    {field === "Select Outlet" &&
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className={cn("border-2 border-black px-4 py-1 rounded-lg flex gap-2 items-center", fixed && "bg-[#ABE423]")}>
                                                <input type="text" className="hidden" value={selectedOutlet} onChange={(e) => {
                                                }} />
                                                {selectedOutlet}
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {user_outlets.map((outlet: string, index: number) => {
                                                    return <DropdownMenuItem key={index} onClick={() => {
                                                        setSelectedOutlet(outlet)
                                                        submitFields.selected_outlet = outlet
                                                        if (length !== 0) {
                                                            setClosedFields(closedFields + 1)
                                                            setLength(length - 1)
                                                            setFixed(true)
                                                        }
                                                    }}>{outlet}</DropdownMenuItem>
                                                })}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    }
                                </div>
                                {open && !fixed && <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        const input = document.getElementById(field) as HTMLInputElement
                                        const value = input.value
                                        setOpen(false)
                                        if (length !== 0) {
                                            setClosedFields(closedFields + 1)
                                            setLength(length - 1)
                                        }
                                        setFixed(true)
                                        setSubmitFields({ ...submitFields, [`${field === 'Select Outlet' ? 'selected_outlet' : `${index}_${index}_${field}`}`]: value })
                                    }}
                                    className="w-full border border-black rounded-lg flex items-center gap-2 px-5 py-2">
                                    <input id={field} type="text" className="w-full border-none focus:outline-none" />
                                    <button type="submit">
                                        <PaperPlaneRight size={20} weight="bold" />
                                    </button>
                                </form>}
                            </div>
                        )
                    })
                    }
                    <button onClick={async () => {
                        // setSubmitFields({ ...submitFields, "username": userEmail })
                        // console.log(Fields.length)
                        // console.log(submitFields)
                        if (closedFields === Fields.length && Object.keys(submitFields).length === Fields.length) {
                            // console.log("All issues fixed and fields submitted.");
                            // console.log(submitFields)
                            updateFields()
                        }
                    }} className={cn("border-2 font-semibold mt-4 w-fit border-black rounded-lg gap-2 px-5 py-2", submit && "bg-[#ABE423]")}>
                        Submit
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {loading &&
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="border-2 border-brandpurple text-white bg-brandpurple w-fit p-4 rounded-2xl rounded-bl-lg max-w-4xl">
                        <p className="text-lg font-semibold">
                            Thanks for the clarification, starting the workflow now!
                        </p>
                    </motion.div>}
                {submit &&
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="border-2 border-brandpurple w-fit p-4 rounded-2xl rounded-bl-lg max-w-xl flex flex-col gap-2">
                        <p className="text-lg font-semibold">
                            The task is being automated! Check it out here -
                        </p>
                        {Response.stream_link !== undefined ?
                            <Link target="_blank" href={Response.stream_link.toString()} className="text-lg font-semibold text-brandpurple underline underline-offset-2 decoration-brandpurple">
                                {"browse.getinterface.tech"}
                            </Link> :
                            <div className="text-lg font-semibold text-red-400 underline underline-offset-2 decoration-brandpurple">
                                "We are facing some issues, please try again later."
                            </div>
                        }
                        {Response.stream_link !== undefined &&
                            <div className="w-full flex justify-center relative rounded-2xl rounded-bl-lg overflow-hidden mt-5">
                                <Image src={temp} alt="stream_link" quality={100} className="w-full h-fit rounded-2xl rounded-bl-lg" />
                                <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center bg-black/15 z-1">
                                    {Response.stream_link !== undefined &&
                                        <Link target="_blank" href={Response.stream_link.toString()}>
                                            <div className="p-4 rounded-full bg-white flex items-center justify-center">
                                                <Play size={28} weight="duotone" className="text-black" />
                                            </div>
                                        </Link>
                                    }
                                </div>
                            </div>
                        }
                    </motion.div>}
                {submit &&
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="border-2 bg-brandpurple text-white border-brandpurple w-fit p-4 rounded-2xl rounded-bl-lg max-w-4xl flex flex-col gap-2">
                        <p className="text-lg font-semibold">
                            The task is done! Let me know if you need me to do anything else.
                        </p>
                    </motion.div>}
            </AnimatePresence>
        </div>
    );
}

export default Fields;