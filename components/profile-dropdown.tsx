import {
    LogOut,
    User,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import Link from "next/link";
import defaultProfileImg from "@/public/defaultProfileImg.jpeg";
import { signOut, useSession } from "next-auth/react";

export function ProfileDropdown() {
    const { data } = useSession();
    const profileImageSrc = data?.user?.image || defaultProfileImg;
    const logOutHandler = async () => {
        await signOut();
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Image
                    src={profileImageSrc}
                    width={35}
                    height={35}
                    className="rounded-full mr-8 cursor-pointer"
                    alt="profile photo"
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4"/>
                        <Link href={"/profile"} className={"dropdown_link"}>
                            Profile
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    {data?.user ? (
                        <>
                            <LogOut className="mr-2 h-4 w-4"/>
                            <button type="button" onClick={logOutHandler}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <Link href={"/api/auth/signin"} className={"dropdown_link"}>
                            Sign in
                        </Link>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
