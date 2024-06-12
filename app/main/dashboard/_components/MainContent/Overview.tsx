'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import Statistics from "./Statistics";
import { Area, CartesianGrid, ComposedChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Agents from "./Agents";
import { motion } from 'framer-motion';
import { getUserCredits } from "@/app/_Providers/getUserDetails";

const Ranges = [
    'Today',
    'Yesterday',
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
    'This Year',
    'Last Year',
]

const Overview = () => {
    const [range, setRange] = useState('Today')
    const [time, setTime] = useState(0)
    const [workflows, setWorkflows] = useState(0)
    useEffect(() => {
        getUserCredits().then(details => {
            if (Array.isArray(details) && details.length > 0) {
                const user = details[0];
                setWorkflows(user.threads + user.bills_uploaded + user.csvs_uploaded)
                setTime((user.threads + user.bills_uploaded + user.csvs_uploaded)*10/60)
            }
        });
    }, [])
    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ease: 'easeInOut', duration : 0.5 }}
            className="w-full min-h-screen border-2 border-black/10 p-5 lg:p-10"
        >
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">
                    Overview
                </h1>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-5">
                        <span className="text-lg font-semibold">{range}</span>
                        <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white">
                        <DropdownMenuLabel>Select Range</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {Ranges.map((item, index) => {
                            return (
                                <DropdownMenuItem role="button" key={index} onClick={() => setRange(item)}>
                                    {item}
                                </DropdownMenuItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex gap-10 mt-10 lg:flex-row flex-col">
                <div className=" flex flex-col xl:flex-row gap-5 w-full">
                    <Statistics title="Time Optimised" value={time} percentage={11.02} />
                    <Statistics title="Workflows Automated" value={workflows} percentage={18.04} />
                </div>
            </div>
            <Agents />
        </motion.div>
    );
}

export default Overview;