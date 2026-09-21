'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="Rapid SoftTech Solutions" className="h-10 w-auto" />
              <div>
                <span className="text-base sm:text-lg font-bold text-slate-900">Rapid SoftTech Solutions</span>
                <p className="text-[11px] text-slate-500">Websites that grow your business</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive(link.href)
                    ? 'text-[#2563EB] font-semibold'
                    : 'text-slate-700 hover:text-[#2563EB] font-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
              <button
                onClick={() => setProductsOpen((prev) => !prev)}
                className="inline-flex items-center gap-1 font-medium text-slate-700 transition-colors hover:text-[#2563EB]"
                aria-haspopup="true"
              >
                Products
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {productsOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <Link
                    href="/rapidlibrary360"
                    className="block rounded-xl p-3 transition hover:bg-slate-50"
                  >
                    <p className="font-semibold text-slate-900">RapidLibrary360</p>
                    <p className="text-sm text-slate-500">A complete library management system</p>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] px-4 py-2 font-semibold text-white shadow-lg shadow-blue-100 transition-transform hover:-translate-y-0.5"
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 hover:text-[#2563EB] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`transition-colors px-2 py-2 ${
                    isActive(link.href)
                      ? 'text-[#2563EB] font-semibold bg-blue-50 rounded-xl'
                      : 'text-slate-700 hover:text-[#2563EB]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="rounded-xl border border-slate-200 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Products</p>
                <Link
                  href="/rapidlibrary360"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 block text-slate-700 hover:text-[#2563EB]"
                >
                  RapidLibrary360
                </Link>
              </div>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] px-3 py-2 text-center font-semibold text-white"
              >
                Get Free Consultation
              </Link>
              <hr className="border-slate-200" />
              <Link
                href="/privacy"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-500 hover:text-[#2563EB] transition-colors px-2 py-2 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-500 hover:text-[#2563EB] transition-colors px-2 py-2 text-sm"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
