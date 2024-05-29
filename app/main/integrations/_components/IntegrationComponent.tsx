import Image, { StaticImageData } from "next/image";
import { useIntegrationModal } from "../Providers/useIntegrationModal";

interface IntegrationComponentProps {
    logo: StaticImageData;
    nameOfIntegration: string;
}

const IntegrationComponent = ({ logo, nameOfIntegration }: IntegrationComponentProps) => {
    const { isOpen, toggleOpen, integrationName, setIntegrationName, image, setImage } = useIntegrationModal()
    return (
        <div className="flex flex-col gap-5 py-16 px-20 rounded-lg border border-brandGray/10 items-center justify-center">
            <Image src={logo} alt="logo" className="rounded-full min-w-fit min-h-fit shadow-md shadow-brandpurple/30 backdrop-blur-sm" />
            <p className="font-semibold text-[28px]">
                {nameOfIntegration}
            </p>
            <button onClick={() => {
                toggleOpen(true)
                setIntegrationName(nameOfIntegration)
                setImage(logo)
            }}
                className="text-lg font-semibold py-2 px-5 bg-brandpurple text-white rounded-lg"
            >
                Connect
            </button>
        </div>
    );
}

export default IntegrationComponent;