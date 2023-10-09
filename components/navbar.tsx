"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { useEffect } from "react";
import { useAppDispatch } from "@/state/store";
import { fetchExpensesThank } from "@/state/features/expenses/thunks/expense-thunks";

const Navbar = () => {
    const data = useSession();
    const id = data?.data?.user?.id
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchExpensesThank(id))
        }
    }, [ id, dispatch ])

    return (
        <nav className="relative flex items-center py-4">
            <ul className="flex w-full justify-around ">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                {
                    id && <li>
                        <Link href={`/expenses/${id}`}>My expenses</Link>
                    </li>
                }
            </ul>
            <ProfileDropdown/>
        </nav>
    );
};
export default Navbar;
