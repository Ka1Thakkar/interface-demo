import TrustedBy from "./TrustedBy";
import fnp from '@/public/fnp.png'
import PizzaBakery from '@/public/PizzaBakery.png'
import Basco from '@/public/Basco.png'
import ParisPanini from '@/public/ParisPanini.png'
import Link from "next/link";

const brands = [
    fnp,
    PizzaBakery,
    Basco,
    ParisPanini
]

const Sidebar = () => {
    return (
        <div className="min-w-[35%] bg-brandpurple flex flex-col items-center justify-center gap-40 px-5 lg:px-4 min-h-screen overflow-y-auto">
            <div className="flex flex-col items-center justify-center gap-10">
                <h1 className="text-white text-3xl lg:text-5xl font-semibold">
                    New Here?
                </h1>
                <Link target="_blank" href={"https://tally.so/r/npLeEy"}>
                    <button className="text-white py-3 w-fit lg:w-full px-5 lg:px-20 rounded-lg bg-brandGray text-lg lg:text-2xl font-semibold">
                        Join Waitlist
                    </button>
                </Link>
            </div>
            {/* <TrustedBy brands={brands} /> */}
        </div>
    );
}

export default Sidebar;