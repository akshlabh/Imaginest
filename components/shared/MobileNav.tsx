"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import Link from "next/link";
  import Image from "next/image";
  import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
  
  const MobileNav = () => {
    const pathname = usePathname();
    return (
      <header className="flex items-center justify-evenly fixed h-16 w-full border-b-4 border-purple-100 bg-white px-5 lg:hidden">
        {/* Logo on the left */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
            priority
          />
        </Link>
  
        {/* User button on the right */}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger ><Image src="/assets/icons/menu.svg"
            alt="menu" width={32} height={32} className="cursor-pointer"></Image></SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
                <>
                <Image src="/assets/images/logo-text.svg" alt="logo" width={152} height={23}></Image>
                <ul className="w-full flex-col items-start gap-2 md:flex">
              {navLinks.map((link) => {
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
                      <Link className="p-16-semibold flex size-full gap-4 p-4 cursor-pointer" href={link.route}>
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
                </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
        <Button asChild className=" bg-purple-600 hover:bg-amber-700">
              <Link href='/sign-in'>Login</Link>
            </Button>
        </SignedOut>
      </header>
    );
  };
  
  export default MobileNav;
  