"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Clean Typographic Wordmark */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex flex-col focus-visible:outline-2 focus-visible:outline-neutral-950 py-1"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 uppercase">
              Graceful Plans
            </span>
            <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-500">
              Universitas • Bloemfontein
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors py-2"
            >
              Overview
            </Link>
            <Link
              href="/#properties"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors py-2"
            >
              Properties
            </Link>
            <Link
              href="/#amenities"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors py-2"
            >
              Amenities
            </Link>
            <Link
              href="/#apply"
              className="inline-flex items-center justify-center gap-1.5 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-sm px-5 py-2.5 rounded-md transition-colors min-h-10"
            >
              Apply Now
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden inline-flex items-center justify-center p-2.5 text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors min-h-11 min-w-11"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile navigation"
          className="md:hidden bg-white border-t border-neutral-200 px-4 pt-3 pb-6 space-y-1"
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="block px-3 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-100 rounded-md"
          >
            Overview
          </Link>
          <Link
            href="/#properties"
            onClick={closeMenu}
            className="block px-3 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-100 rounded-md"
          >
            Properties
          </Link>
          <Link
            href="/#amenities"
            onClick={closeMenu}
            className="block px-3 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-100 rounded-md"
          >
            Amenities
          </Link>
          <div className="pt-3">
            <Link
              href="/#apply"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-sm px-5 py-3.5 rounded-md transition-colors"
            >
              Apply Now
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
