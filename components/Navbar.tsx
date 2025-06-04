import React from 'react'
import Link from 'next/link'


import MobileNav from './MobileNav'

export const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/report', label: 'Kayıp Başvurusu' },
  { href: '/overview', label: 'kayıp Eşyalar' },
  { href: '/question', label: 'SSS' }
]

const Navbar = () => {
  return (
    <header className='w-full h-15 fixed z-10 bg-gray-50 shadow-2xl'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 bg-transparent'>
        {/* Logo */}
        <Link href='/' className='flex justify-center items-center'>
          <div className='font-extrabold text-blue-600 text-3xl mt-2'>FinderApp</div>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden sm:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative mt-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <span className="after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation - Only visible on mobile */}
        <div className="sm:hidden flex items-center">
          <MobileNav user="" />
        </div>
      </nav>
    </header>
  )
}

export default Navbar