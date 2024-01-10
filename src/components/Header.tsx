"use client";

import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const { status, data } = useSession();

  const handleLoginClick = () => signIn();

  const handleLogoutClick = () => {
    setMenuIsOpen(false);
    signOut();
  };

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
      <div className="relative h-[32px] w-[182px]">
        <Link href="/">
        <h1 className="font-semibold text-2xl text-grayPrimary text-center">
        GO<span className="text-primary">TRIPS!</span>
      </h1>
        </Link>
      </div>

      {status === "authenticated" && data.user && (
        <div className="flex items-center gap-3 border-grayLighter border border-solid rounded-full p-2 px-3 relative">
          <AiOutlineMenu
            size={16}
            onClick={handleMenuClick}
            className="cursor-pointer"
          />

          <Image
            height={35}
            width={35}
            src={data.user.image!}
            alt={data.user.name!}
            className="rounded-full shadow-md"
          />

          {menuIsOpen && (
            <div className="z-50 absolute top-14 left-0 w-full h-[100px] bg-white rounded-xl shadow-md flex flex-col justify-center items-center ">
              <button
                className="text-primary pb-2  text-sm font-semibold border-b border-grayLighter p-4"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
              <Link href="/my-trips">
                <button
                  className="text-primary pt-2 text-sm font-semibold"
                >
                  Minhas viagens
                </button>
              </Link>
            </div>
          )}
        </div>
      )}

      {status === "unauthenticated" && (
        <button
          className="text-primary text-sm font-semibold"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
