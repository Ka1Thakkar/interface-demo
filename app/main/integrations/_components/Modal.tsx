import { X, XCircle } from "@phosphor-icons/react";
import Image, { StaticImageData } from "next/image";
import { useIntegrationModal } from "../Providers/useIntegrationModal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { addIntegration, checkIntegration, updateIntegration } from "@/app/_Providers/getUserDetails";

// interface ModalProps {
//     image: StaticImageData;
//     nam: string;
// }

const IntegrationModal = () => {
    const { isOpen, toggleOpen, integrationName, image } = useIntegrationModal()
    const [validated, setValidated] = useState(false)
    const [userEmail, setUserEmail] = useState<any>(null)
    const [userPassword, setUserPassword] = useState<any>(null)
    // useEffect(() => {
    //     if (validated) {
    //         setTimeout(() => {
    //             toggleOpen(false)
    //         }, 3000)
    //     }
    // }, [validated])
    useEffect(() => {
        checkIntegration().then(details => {
            if (Array.isArray(details) && details.length > 0) {
                const user = details[0];
                setUserEmail(user.email)
                setUserPassword(user.password)
                setValidated(true)
            }
        });
    }, [isOpen])
    return (
        <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(2.5px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ ease: 'easeInOut', duration: 0.2 }}
            className="absolute top-0 w-full h-full z-[999] flex items-center justify-center backdrop-blur-[2.5px]"
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
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const integrationEmail = document.getElementById("email") as HTMLInputElement;
                    const integrationPassword = document.getElementById("password") as HTMLInputElement;
                    if (integrationEmail && integrationPassword) {
                        addIntegration(integrationEmail.value, integrationPassword.value).then(() => {
                            setValidated(true);
                        });
                        // if (await checkIntegration()) {
                        //     updateIntegration(integrationEmail.value, integrationPassword.value).then(() => {
                        //         setValidated(true);
                        //     });
                        // } else {
                        //     addIntegration(integrationEmail.value, integrationPassword.value).then(() => {
                        //         setValidated(true);
                        //     });
                        // }
                    }
                }} className="flex flex-col gap-5 w-full">
                    <input value={userEmail} id="email" type="email" placeholder="Email Address" className="border-2 border-black/50 py-3 px-5 rounded-xl w-full text-lg font-semibold" />
                    <input value={userPassword} id="password" type="password" placeholder="Password" className="border-2 border-black/50 focus:border-black py-3 px-5 rounded-xl w-full text-lg font-semibold" />
                    <button onClick={() => { setValidated(!validated) }} className={cn("w-full text-center bg-brandpurple text-white py-4 rounded-lg text-lg font-semibold transition-all ease-in-out", validated ? "bg-[#ABE423] text-black" : "bg-brandpurple text-white")}>
                        {validated ? "Validated" : "Validate Email Address"}
                    </button>
                </form>
            </div>
        </motion.div>
    );
}

export default IntegrationModal;