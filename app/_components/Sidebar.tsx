import TrustedBy from "./TrustedBy";
import fnp from '@/public/fnp.png'
import PizzaBakery from '@/public/PizzaBakery.png'
import Basco from '@/public/Basco.png'
import ParisPanini from '@/public/ParisPanini.png'

const brands = [
    fnp,
    PizzaBakery,
    Basco,
    ParisPanini
]

const Sidebar = () => {
    return (
        <div className="min-w-[35%] bg-brandpurple flex flex-col items-center justify-center gap-40 px-7 lg:px-4 h-screen">
            <div className="flex flex-col items-center justify-center gap-10">
                <h1 className="text-white text-5xl font-semibold">
                    New Here?
                </h1>
                <button className="text-white py-3 px-20 rounded-lg bg-brandGray text-2xl font-semibold">
                    Join Waitlist
                </button>
            </div>
            <TrustedBy brands={brands} />
        </div>
    );
}

export default Sidebar;