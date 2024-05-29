import Image, { StaticImageData } from "next/image";

interface AgentComponentProps {
    agentTitle: string;
    agentRoute: string;
    agentName: string;
    agentImage: StaticImageData;
}

const AgentCompnent = ({ agentTitle, agentRoute, agentName, agentImage }: AgentComponentProps) => {
    return (
        <div className="bg-gradient-to-br from-black/[.015] to-black/0 border-2 border-black/10 rounded-lg px-5 py-10 flex flex-col items-center justify-center gap-4 text-center">
            <Image src={agentImage} alt="Agent" className="drop-shadow-md backdrop-blur bg-white rounded-full h-[100px] w-fit" />
            <div className="flex flex-col gap-[6px]">
                <p className="text-3xl font-bold mt-5">{agentName}</p>
                <p className="text-xl font-[500]">{agentTitle}</p>
            </div>
            <button className="bg-brandpurple text-white text-lg font-bold mt-5 py-4 px-7 rounded-lg">Get Started</button>
        </div>
    );
}

export default AgentCompnent;