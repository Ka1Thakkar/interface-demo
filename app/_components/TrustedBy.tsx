import Image, { StaticImageData } from "next/image";

interface TrustedByProps {
    brands: StaticImageData[]
}

const TrustedBy = ({ brands }: TrustedByProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-10">
            <p className="text-white text-lg font-semibold text-center">
                Trusted by teams at
            </p>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
                {brands.map((brand, index) => {
                    return (
                        <div key={index} className="">
                            <Image src={brand} alt={"Brand"} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default TrustedBy;