import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from 'next/link';
import { navLinks } from './Navbar';
import { RxHamburgerMenu } from "react-icons/rx";

interface MobileNavProps {
  user: string;
}

const MobileNav = ({ user }: MobileNavProps) => {
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2">
            <RxHamburgerMenu className='cursor-pointer text-black w-6 h-6' />
          </button>
        </SheetTrigger>
        
        <SheetContent side="left" className="border-none bg-white">
          <SheetHeader>
            <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
              <h1 className="text-3xl font-bold text-blue-700">FinderApp</h1>
            </Link>
          </SheetHeader>
          
          <div className="mt-8">
            <SheetClose asChild>
              <nav className='flex h-full flex-col gap-6 pt-16'>
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                        href={link.href}
                        className="relative mt-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 px-4"
                        >
                        <span className="relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                            {link.label}
                        </span>
                    </Link>
                  </SheetClose>
                ))}
                
                {/* Optional: Add user info if needed */}
                {user && (
                  <div className="mt-auto px-4 py-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Welcome, {user}</p>
                  </div>
                )}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;