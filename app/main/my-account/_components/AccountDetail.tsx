import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import General from "./General";
import Billing from "./Billing";
import System from "./System";

const Details = () => {
    return (
        <div className={cn("h-fit w-full flex flex-col items-center justify-center overflow-y-auto p-3 transition-all ease-in-out")}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.5 }}
                className="w-full min-h-screen border-2 border-black/10 p-5 lg:p-10 flex flex-col gap-10"
            >
                <General />
                <Billing />
                <System />
            </motion.div>
        </div>
    );
}

export default Details;