"use client";

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 bg-white p-5 shadow-md shadow-purple-200/50 lg:flex">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 md:py-2">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>
        
        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          <SignedIn>
            <ul className="w-full flex-col items-start gap-2 md:flex">
              {navLinks.slice(0,6).map((link) => {
                const isActive = link.route === pathname;
                    // console.log(navLinks)
                return (
                  <li
                    key={link.route}
                    className={`flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover transition-all hover:bg-purple-100 hover:shadow-inner group ${
                      isActive
                        ? "bg-purple-gradient text-black"
                        : "text-gray-700"
                    }`}
                  >
                    {/* <Link href={link.route} className="w-full block px-4 py-2"> */}
                      <Link className="p-16-semibold flex size-full gap-4 p-4" href={link.route}>
                        <Image 
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && 'brightness-200'}`}>

                          </Image>
                          {link.label}
                      </Link>
                    {/* </Link> */}
                  </li>
                );
              })}
            </ul>
            
            <ul className="w-full flex-col items-start gap-2 md:flex">
              {navLinks.slice( 6).map((link) => {
                const isActive = link.route === pathname;
                    // console.log(navLinks)
                return (
                  <li
                    key={link.route}
                    className={`flex-center p-16-semibold w-full whitespace-nowrap rounded-full bg-cover transition-all hover:bg-purple-100 hover:shadow-inner group ${
                      isActive
                        ? "bg-purple-gradient text-black"
                        : "text-gray-700"
                    }`}
                  >
                      <Link className="p-16-semibold flex size-full gap-4 p-4" href={link.route}>
                        <Image 
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && 'brightness-200'}`}>

                          </Image>
                          {link.label}
                      </Link>
                    {/* </Link> */}
                  </li>
                );
              })}
            
            <li className="flex-center cursor-pointer gap-2 p-4">
              <UserButton showName ></UserButton>
            </li>
            </ul>

          </SignedIn>


          <SignedOut>
            <Button asChild className=" bg-purple-600 hover:bg-amber-700">
              <Link href='/sign-in'>Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
