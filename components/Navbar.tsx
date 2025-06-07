"use client";

import Link from 'next/link'
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MobileNav from './MobileNav'

// ModeToggle komponenti
export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Navigation linkleri
export const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/report', label: 'Kayıp Başvurusu' },
  { href: '/overview', label: 'Kayıp Eşyalar' },
  { href: '/question', label: 'SSS' }
]

// Ana Navbar komponenti
const Navbar = () => {
  return (
    <header className='w-full h-16 fixed top-0 z-50 bg-white dark:bg-gray-950 shadow-lg border-b border-gray-200 dark:border-gray-700'>
      <nav className='max-w-7xl mx-auto flex justify-between items-center h-full px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href='/' className='flex justify-center items-center'>
          <div className='font-extrabold text-blue-600 dark:text-blue-400 text-2xl sm:text-3xl'>
            FinderApp
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
            >
              <span className="relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">
                {link.label}
              </span>
            </Link>
          ))}
          
          {/* Theme Toggle - Desktop */}
          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          <ModeToggle />
          <MobileNav user="" />
        </div>
      </nav>
    </header>
  )
}

export default Navbar