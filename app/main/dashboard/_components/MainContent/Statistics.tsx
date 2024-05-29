import { TrendUp } from "@phosphor-icons/react";
import CountUp from "react-countup";

interface StatisticsProps {
    title: string;
    value: number;
    percentage: number;
}

const Statistics = ({ title, value, percentage }: StatisticsProps) => {
    return (
        <div className="border-2 border-black/10 px-5 py-7 rounded-lg text-left flex flex-col gap-2 bg-gradient-to-br from-black/[.015] to-black/0 h-full justify-center w-1/2">
            <p className="font-semibold text-2xl">
                {title}
            </p>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    {/* <span className="text-xl font-medium">$</span> */}
                    {/* <AnimatedCounter value={value} incrementColor="#ABE423" fontSize="25px" decrementColor="#E42323" includeDecimals={false} containerStyles={{ textAlign: 'left', width: 'fit-content' }} /> */}
                    <CountUp start={0}
                        end={value}
                        duration={1.5}
                        separator=", "
                        prefix=""
                        suffix="hr"
                        className="text-4xl font-bold"
                        useEasing={true}
                        />
                </div>
                <div className="flex flex-col text-[#ABE423] items-end">
                    <p>
                        <span className="text-2xl">+</span>
                        <span className="text-2xl font-semibold">
                            {percentage}
                        </span><span className="text-2xl"> %</span>
                    </p>
                    <TrendUp weight="fill" size={32} />
                </div>
            </div>
        </div>
    );
}

export default Statistics;