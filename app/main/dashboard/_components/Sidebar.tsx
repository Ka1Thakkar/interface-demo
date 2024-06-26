'use client'
import Logo from '@/public/interface.png'
import Image from 'next/image';
import { useSidebar } from '../../Providers/SidebarContext';
import { cn } from '@/lib/utils';
import { Barbell, Basket, BookOpen, ChartPieSlice, ChatsTeardrop, ClockCounterClockwise, Fingerprint, Folder, Network, ShareNetwork, SignOut, Sun, Table, Trash, UserCircle, XCircle } from '@phosphor-icons/react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { useIntegrationModal } from '../../integrations/Providers/useIntegrationModal';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { logout } from '@/app/login/actions';
import { useBot } from '@/app/_Providers/useBot';


const routeElements = [
    {
        name: 'Dashboard',
        icon: ChartPieSlice,
    },
    {
        name: 'Chat',
        icon: ChatsTeardrop,
    },
    {
        name: 'Integrations',
        icon: Folder,
    },
    {
        name: 'Forecasts',
        icon: BookOpen,
    },
    {
        name: 'Purchase Order',
        icon: Table,
    },
    {
        name: 'Logs',
        icon: ClockCounterClockwise,
    },
    {
        name: 'Configure Workflows',
        icon: Network,
    },
    {
        name: 'Vendors',
        icon: Basket,
    },
    {
        name: 'Pending Approval',
        icon: Fingerprint,
    },
    {
        name: 'Train Agents',
        icon: Barbell,
    },
]

const settingsElement = [
    {
        name: 'My Account',
        icon: UserCircle,
        link: '/main/my-account'
    },
    // {
    //     name: 'Clear conversations',
    //     icon: Trash,
    // },
    // {
    //     name: 'Light Mode',
    //     icon: Sun,
    // },
    {
        name: 'Updates & FAQ',
        icon: ShareNetwork,
        link: 'https://theinterfacecompany.notion.site/Getting-started-with-Interface-v0-11-f8fbd8dad147431591fe8b6caf97bd4c'
    },
]

const Sidebar = () => {
    const {botName} = useBot()
    const { selected, setSelected } = useSidebar()
    const router = useRouter()
    const { isOpen, toggleOpen } = useIntegrationModal()
    // const supabase = createClient()
    return (
        <aside

            className={cn('h-screen bg-white min-w-fit border-r-2 border-black/10 px-5 xl:px-7 py-5 transition-all ease-in-out xl:py-10 overflow-y-auto')}>
            <div className='flex flex-col justify-between h-full gap-10'>
                <div>
                    <div className='pl-5 xl:flex justify-between items-center hidden transition-all ease-in-out'>
                        <Image src={Logo} alt="Interface" />
                    </div>
                    <div className='xl:mt-10 flex flex-col gap-1 transition-all ease-in-out'>
                        {routeElements.map((element, index) => {
                            return (
                                <div role='button'
                                    key={index}
                                    className={cn("flex items-center gap-5 w-full p-4 xl:py-2 xl:px-5 rounded-lg transition-all ease-in-out", index === selected && "bg-brandpurple text-white", index !== selected && "hover:bg-[#E4E4E4] transition-all ease-in-out cursor-not-allowed opacity-50", index === 0 && " cursor-pointer opacity-100", index === 1 && " cursor-pointer opacity-100", index === 2 && " cursor-pointer opacity-100")}
                                    onClick={() => {
                                        if (index === 0 || index === 1 || index === 2) {

                                            if(element.name === 'Chat'){
                                                router.push(`/main/${element.name.toLowerCase()}/${botName.toLowerCase()}`)
                                            }
                                            else{
                                                router.push(`/main/${element.name.toLowerCase()}`)
                                            }
                                            setSelected(index)
                                            toggleOpen(false)
                                        }
                                    }}
                                >
                                    <element.icon weight='duotone' className="h-7 w-7" />
                                    <span className='md:text-xl font-medium hidden xl:block'>{element.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    {settingsElement.map((element, index) => {
                        return (
                            <Link key={index} target={element.link.includes('https') ? '_blank' : undefined} href={element.link}>
                                <div role='button'
                                    className={cn("flex items-center gap-5 w-full p-4 xl:py-2 xl:px-5 rounded-lg transition-all ease-in-out", index === (selected - 100) && "bg-brandpurple text-white", index !== (selected - 100) && "hover:bg-[#E4E4E4] transition-all")}
                                    onClick={() => {
                                        setSelected(100)
                                        // console.log('Selected', selected)
                                    }}
                                >
                                    <element.icon weight='duotone' className="h-7 w-7" />
                                    <span className='md:text-xl font-medium hidden xl:block'>{element.name}</span>
                                </div>
                            </Link>
                        )
                    })}
                    <div role='button' onClick={() => {
                        logout()
                    }} className='flex items-center gap-5 w-full p-4 xl:py-2 xl:px-5 rounded-lg transition-all ease-in-out'>
                        <SignOut weight='duotone' className="h-7 w-7" />
                        <span className='md:text-xl font-medium hidden xl:block'>Log out</span>
                    </div>
                </div>
            </div>

        </aside>
    );
}

export default Sidebar;