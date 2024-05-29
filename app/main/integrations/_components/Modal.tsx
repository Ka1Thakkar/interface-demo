import { X, XCircle } from "@phosphor-icons/react";
import Image, { StaticImageData } from "next/image";
import { useIntegrationModal } from "../Providers/useIntegrationModal";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

// interface ModalProps {
//     image: StaticImageData;
//     nam: string;
// }

const IntegrationModal = () => {
    const { isOpen, toggleOpen, integrationName, image } = useIntegrationModal()
    const [validated, setValidated] = useState(false)
    return (
        <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.15 }}
            className="absolute top-0 w-full h-full z-[999] flex items-center justify-center backdrop-blur-[2.5px] bg-white/5"
        >
            <div className="flex flex-col items-center justify-center gap-10 w-fit shadow-md shadow-black/25 p-16 rounded-xl bg-white relative">
                <button onClick={() => { toggleOpen(false) }} className="absolute top-5 right-5 text-black">
                    <X size={32} />
                </button>
                <h1 className="text-black font-semibold text-4xl tracking-tighter">
                    Validate your email address
                </h1>
                <Image src={image} alt="Integration" className="rounded-full h-[100px] w-[100px] shadow-md shadow-brandpurple/30 backdrop-blur-sm" />
                <p className=" font-semibold text-[28px]">
                    {integrationName}
                </p>
                <div className="flex flex-col gap-5 w-full">
                    <input id="email" type="email" placeholder="Email Address" className="border-2 border-black/50 py-3 px-5 rounded-xl w-full text-lg font-semibold" />
                    <input id="password" type="password" placeholder="Password" className="border-2 border-black/50 focus:border-black py-3 px-5 rounded-xl w-full text-lg font-semibold" />
                    <button onClick={() => {setValidated(!validated)}} className={cn("w-full text-center bg-brandpurple text-white py-4 rounded-lg text-lg font-semibold transition-all ease-in-out", validated ? "bg-[#ABE423] text-black" : "bg-brandpurple text-white")}>
                        {validated ? "Validated" : "Validate Email Address"}
                    </button>


                </div>
            </div>
        </motion.div>
    );
}

export default IntegrationModal;