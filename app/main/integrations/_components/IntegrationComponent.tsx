import Image, { StaticImageData } from "next/image";
import { useIntegrationModal } from "../Providers/useIntegrationModal";
import { cn } from "@/lib/utils";

interface IntegrationComponentProps {
    logo: StaticImageData;
    nameOfIntegration: string;
}

const IntegrationComponent = ({ logo, nameOfIntegration }: IntegrationComponentProps) => {
    const { isOpen, toggleOpen, integrationName, setIntegrationName, image, setImage } = useIntegrationModal()
    return (
        <div className="flex flex-col gap-5 py-16 px-20 rounded-lg border border-brandGray/10 items-center justify-center">
            <div className="backdrop-blur-sm rounded-full min-w-fit min-h-fit bg-white">
                <Image loading="lazy" blurDataURL={logo.blurDataURL} src={logo} alt="logo" className="min-h-fit min-w-fit" />
            </div>
            <p className="font-semibold text-[28px]">
                {nameOfIntegration}
            </p>
            <button onClick={() => {
                if (nameOfIntegration === "Eagleowl") {
                    toggleOpen(true)
                    setIntegrationName(nameOfIntegration)
                    setImage(logo)
                }
            }}
                className={cn("text-lg font-semibold py-2 px-5 bg-brandpurple text-white rounded-lg", nameOfIntegration === "Eagleowl" ? "bg-brandpurple" : "bg-brandpurple/50 cursor-not-allowed")}
            >
                Connect
            </button>
        </div>
    );
}

export default IntegrationComponent;