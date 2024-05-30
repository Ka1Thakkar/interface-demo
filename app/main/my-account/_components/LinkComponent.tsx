import { cn } from "@/lib/utils";
import { ArrowSquareOut } from "@phosphor-icons/react";
import Link from "next/link";

interface LinkComponentProps {
    label: string;
    link: string;
    variant: string;
}

const LinkComponent = ({ label, link, variant }: LinkComponentProps) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="text-lg font-bold">{label}</div>
            <Link href={link}>
                <div className={cn("text-[#384252] flex gap-2 text-lg font-[500] items-center border border-black rounded-lg py-1 px-2 w-fit", variant === "delete" && "bg-red-500 text-white border-none")}>
                    {variant === "delete" ? "Delete" : "Learn More"}
                    <ArrowSquareOut className={cn(variant === "delete" && "hidden")} />
                </div>
            </Link>
        </div>
    );

}


export default LinkComponent;