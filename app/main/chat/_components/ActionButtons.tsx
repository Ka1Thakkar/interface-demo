import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ActionButtonsProps {
    onClick: (e: any | undefined) => void;
    name: string;
    icon: React.ReactNode;
}

const ActionButtons = ({ onClick, icon, name }: ActionButtonsProps) => {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            role="button" onClick={(e: any) => { onClick(e); }} className={cn((name === "Bulk Upload" || name === "Upload CSV") && "cursor-not-allowed")}>
            <div className={cn("flex bg-white flex-col items-center text-lg border-2 justify-start border-brandpurple text-brandpurple gap-5 font-semibold rounded-lg p-5 xl:p-10 w-full h-full", (name === "Bulk Upload" || name === "Upload CSV") && "opacity-50")}>
                {icon}
                <span className="xl:text-lg text-sm text-black font-semibold text-center">{name}</span>
            </div>
        </motion.div>
    );
}

export default ActionButtons;