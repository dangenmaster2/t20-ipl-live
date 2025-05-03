'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navigation() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 mr-2"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            IPL Dashboard
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link href="#" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
              Teams
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
              Players
            </Link>
            <Link href="#" className="hover:text-blue-200 transition-colors">
              News
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-2 space-y-2">
            <Link href="#" className="block text-white hover:text-blue-200">
              Home
            </Link>
            <Link href="#" className="block text-white hover:text-blue-200">
              Teams
            </Link>
            <Link href="#" className="block text-white hover:text-blue-200">
              Players
            </Link>
            <Link href="#" className="block text-white hover:text-blue-200">
              News
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
