"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const categories = [
        { name: 'Beranda', href: '/' },
        { name: 'Terbaru', href: '/berita/terbaru' },
        { name: 'Nasional', href: '/berita/nasional' },
        { name: 'Internasional', href: '/berita/internasional' },
        { name: 'Ekonomi', href: '/berita/ekonomi' },
        { name: 'Olahraga', href: '/berita/olahraga' },
        { name: 'Teknologi', href: '/berita/teknologi' },
        { name: 'Hiburan', href: '/berita/hiburan' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="app-container">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-news-blue to-news-teal flex items-center justify-center">
                            <span className="text-white font-bold text-lg">B</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Berita Kini</span>
                    </Link>

                    {/* Navigasi Desktop */}
                    <div className="hidden md:flex md:items-center md:gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                href={category.href}
                                className="text-sm font-medium text-gray-700 hover:text-news-blue transition-colors"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    {/* Tombol Menu Mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        {isMobileMenuOpen ? (
                            <FiX className="h-6 w-6" />
                        ) : (
                            <FiMenu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Navigasi Mobile */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col gap-4">
                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    className="text-sm font-medium text-gray-700 hover:text-news-blue transition-colors px-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
