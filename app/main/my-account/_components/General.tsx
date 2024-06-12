import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ProfilePicture from '@/public/User.png'
import Image from 'next/image';
import { countryOptions } from './countryList'
import { CaretUpDown } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { getUserDetails } from '@/app/_Providers/getUserDetails';
// import { getUserDetails } from '@/app/_Providers/getUserDetails';
// import { getUserDetails } from '@/app/_Providers/getUserDetails';
// import { createClient } from '@/utils/supabase/server';
// import { getUserDetails } from '@/app/userDetails/actions';
// import { getUserDetails } from '@/app/userDetails/actions';

const General = () => {
    const [country, setCountry] = useState('India')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    useEffect(() => {
        getUserDetails().then(details => {
            if (Array.isArray(details) && details.length > 0) {
                const user = details[0];
                setFullName(user.company_name)
                setEmail(user.email)
                // setCountry(user.country)
                // console.log(details)
            }
        });
        // console.log(fullName)
    }, [])
    return (
        <div className='border-2 border-black/10 rounded-lg'>
            <div className='border-b-2 border-black/10 p-5'>
                <div className="text-brandpurple text-2xl font-semibold underline-offset-4 underline">General</div>
            </div>
            <div className="rounded-2xl p-5 flex flex-col gap-5">
                <div className='justify-start items-center gap-4 flex'>
                    <Image src={ProfilePicture} alt="Profile Picture" quality={100} className="rounded-full w-[100px] h-[100px] shadow-md shadow-black/10 border-1 border-black/10" />
                    <div className="rounded-2xl justify-center items-start gap-2 flex flex-col">
                        <div className="text-black text-2xl font-semibold leading-snug">Profile Picture</div>
                        {/* <button className="text-white bg-black text-base py-2 px-5 leading-snug rounded-lg">Upload picture</button> */}
                    </div>
                </div>
                <label className='flex flex-col gap-2 text-lg font-bold'>
                    Full Name
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" className="border border-brandGray/35 rounded-lg p-2 outline-none font-semibold" />
                </label>
                <label className='flex flex-col gap-2 text-lg font-bold'>
                    Email ID
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="border border-brandGray/35 rounded-lg p-2 outline-none font-semibold" />
                </label>
                <label className='flex flex-col gap-2 text-lg font-bold'>

                    Country of Residence
                    <div className='flex gap-2 items-center border border-brandGray/35 rounded-lg p-2'>
                        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className=" font-semibold outline-none w-full" />
                        <DropdownMenu>
                            <DropdownMenuTrigger className=''>
                                <CaretUpDown weight="light" size={20} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='h-40 overflow-y-auto mt-5 bg-white'>
                                {countryOptions.map((country, index) => (
                                    <DropdownMenuItem onClick={() => setCountry(country.label)} key={index} className='w-full'>{country.label}</DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </label>
            </div>
        </div>
    );
}

export default General;