import { useBot } from "@/app/_Providers/useBot";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface AgentComponentProps {
    agentTitle: string;
    agentName: string;
    agentImage: StaticImageData;
}

const AgentCompnent = ({ agentTitle, agentName, agentImage }: AgentComponentProps) => {
    const { botName, botRole, setBotName, setBotRole, botImage, setBotImage, images } = useBot()
    const router = useRouter()
    return (
        <div className="bg-gradient-to-br from-black/[.015] to-black/0 border-2 border-black/10 rounded-lg px-5 py-10 flex flex-col items-center justify-center gap-4 text-center">
            <Image src={agentImage} alt="Agent" className="drop-shadow-md backdrop-blur bg-white rounded-full h-[100px] w-fit" />
            <div className="flex flex-col gap-[6px]">
                <p className="text-3xl font-bold mt-5">{agentName}</p>
                <p className="text-xl font-[500]">{agentTitle}</p>
            </div>
            <button
            onClick={() => {
                setBotName(agentName)
                setBotRole(agentTitle)
                setBotImage(agentImage)
                if (agentName !== "Rio") {
                    router.push(`/main/chat/${agentName.toLowerCase()}`)
                } else {
                    setBotName("Olivia")
                    setBotRole("The Data Entry Agents")
                    setBotImage(images[0])
                }
            }}
            className={cn("bg-brandpurple text-white text-lg font-bold mt-5 py-4 px-7 rounded-lg", agentName === "Rio" && "opacity-50 cursor-not-allowed")}>Get Started</button>
        </div>

    );
}

export default AgentCompnent;