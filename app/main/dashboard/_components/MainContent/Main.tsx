import { useEffect, useRef, useState } from "react";
import Overview from "./Overview";
import { useSidebar } from "../../../Providers/SidebarContext";
import { cn } from "@/lib/utils";

const Main = () => {
    return (
        <div className={cn("h-fit w-full flex flex-col items-center justify-center overflow-y-auto p-3 transition-all ease-in-out")}>
            <Overview />
        </div>
    );
}
 
export default Main;