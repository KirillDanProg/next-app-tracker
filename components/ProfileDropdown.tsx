import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import defaultProfileImg from "@/public/defaultProfileImg.jpeg";
import { signOut, useSession } from "next-auth/react";

type ProfileDropdownType = {};

const ProfileDropdown = (props: ProfileDropdownType) => {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const { data } = useSession();
  const profileImageSrc = data?.user.image || defaultProfileImg;

  const signOutHandler = async () => {
    await signOut();
  };

  return (
    <>
      <Image
        src={profileImageSrc}
        width={35}
        height={35}
        className="rounded-full mr-8 cursor-pointer"
        alt="profile photo"
        onClick={() => setToggleDropDown((prev) => setToggleDropDown(!prev))}
      />
      {toggleDropDown && (
        <div className="dropdown gap-8">
          <ul className="flex flex-col gap-2 ">
            <li>
              <Link href={"/profile"} className={"dropdown_link"}>
                Profile
              </Link>
            </li>
            {data?.user ? (
              <li>
                <button type="button" onClick={signOutHandler}>
                  Sign out
                </button>
              </li>
            ) : (
              <li>
                <Link href={"/api/auth/signin"} className={"dropdown_link"}>
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
