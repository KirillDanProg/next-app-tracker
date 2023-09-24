"use client"

import Link from "next/link";
import Image from "next/image";
import defaultProfileImg from "@/public/defaultProfileImg.jpeg"
import { useSession, signOut, signIn } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
    const { data } = useSession()
    console.log(data)
    const [ toggleDropDown, setToggleDropDown ] = useState(true)

    const profileImageSrc = data?.user.image || defaultProfileImg
    return <nav className='relative flex items-center py-4'>
        <ul className='flex w-full justify-around'>
            <li>
                <Link href='/'>Home</Link>
            </li>
            <li>
                <Link href='/about'>About</Link>
            </li>
        </ul>

        <Image
            src={profileImageSrc}
            width={35}
            height={35}
            className='rounded-full mr-8 cursor-pointer'
            alt='profile photo'
            onClick={() => setToggleDropDown(prev => setToggleDropDown(!prev))}
        />

        {
            toggleDropDown && <div className="dropdown gap-8">
                <ul className='flex flex-col gap-2 '>
                    <li>
                        <Link href={'/profile'} className={"dropdown_link"}>Profile</Link>
                    </li>
                    {
                        data?.user
                            ? <li><Link href={'/profile'} className={"dropdown_link"}>Sign out</Link></li>
                            : <li><Link href={'/profile'} className={"dropdown_link"}>Sign in</Link></li>
                    }
                </ul>
            </div>
        }
    </nav>
}
export default Navbar
