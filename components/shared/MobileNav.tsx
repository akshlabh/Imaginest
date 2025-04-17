"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-purple-100 bg-white px-5 shadow-md lg:hidden">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={160}
          height={28}
          priority
        />
      </Link>

      {/* User Button + Menu */}
      <nav className="flex items-center gap-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger asChild>
              <button aria-label="Menu">
                <Image
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={28}
                  height={28}
                  className="cursor-pointer"
                />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64 bg-white">
              <div className="flex flex-col gap-6 mt-4">
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={140}
                  height={20}
                />

                <ul className="flex flex-col gap-4 mt-6">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;

                    return (
                      <li key={link.route}>
                        <Link
                          href={link.route}
                          className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-purple-100 ${
                            isActive ? "bg-purple-200 text-purple-800" : "text-gray-700"
                          }`}
                        >
                          <Image
                            src={link.icon}
                            alt={link.label}
                            width={20}
                            height={20}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </SignedIn>

        <SignedOut>
          <Button asChild className="bg-purple-600 text-white hover:bg-purple-700">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
