"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Profil Nagari", href: "/profil" },
    { name: "Peta & Geografis", href: "/peta" },
    { name: "Layanan Administrasi & Publik", href: "/layanan" },
    { name: "Potensi & Transparansi", href: "/potensi" },
  ];

  // Sembunyikan navbar utama saat berada di halaman admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-nagari-green-950/80 backdrop-blur-md border-b border-slate-200 dark:border-nagari-green-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img
              src="/images/logo_padang_pariaman.png"
              alt="Logo Kabupaten Padang Pariaman"
              className="w-10 h-11 object-contain shrink-0"
            />
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-nagari-green-700 to-nagari-green-500 dark:from-nagari-gold-400 dark:to-nagari-gold-200">
                Nagari Toboh Gadang
              </span>
              <p className="text-[10px] text-slate-500 dark:text-nagari-green-300 font-semibold tracking-widest uppercase">
                Portal Resmi
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-nagari-green-700 dark:text-nagari-gold-400 bg-nagari-green-50 dark:bg-nagari-green-900/40 font-bold"
                      : "text-slate-600 hover:text-nagari-green-600 dark:text-slate-300 dark:hover:text-nagari-gold-400 hover:bg-slate-50 dark:hover:bg-nagari-green-900/20"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Login Admin Button in Navbar */}
            <Link
              href="/admin/login"
              className="ml-2 px-4 py-2 rounded-xl bg-nagari-green-700 hover:bg-nagari-green-800 text-white dark:bg-nagari-gold-500 dark:hover:bg-nagari-gold-600 dark:text-slate-950 text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Login Admin
            </Link>
          </div>



          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-nagari-green-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-nagari-gold-400 dark:hover:bg-nagari-green-900/30 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 border-t border-slate-100 dark:border-nagari-green-900" : "max-h-0 opacity-0 overflow-hidden"}`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white dark:bg-nagari-green-950 shadow-inner">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "text-nagari-green-700 dark:text-nagari-gold-400 bg-nagari-green-50 dark:bg-nagari-green-900/40"
                    : "text-slate-600 hover:text-nagari-green-600 dark:text-slate-300 dark:hover:text-nagari-gold-400 hover:bg-slate-50 dark:hover:bg-nagari-green-900/20"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-2 px-2">
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full py-3 rounded-xl bg-nagari-green-700 hover:bg-nagari-green-800 text-white text-sm font-bold shadow-sm"
            >
              Login Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
