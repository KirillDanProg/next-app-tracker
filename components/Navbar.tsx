"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfileDropdown from "@/components/ProfileDropdown";

const Navbar = () => {
  const data = useSession();

  return (
    <nav className="relative flex items-center py-4">
      <ul className="flex w-full justify-around">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <ProfileDropdown />
    </nav>
  );
};
export default Navbar;
