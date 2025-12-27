/**
 * Komponen Navbar
 * 
 * Navigasi utama aplikasi yang sticky di bagian atas.
 * Fitur:
 * - Responsive (desktop & mobile)
 * - Dynamic styling saat scroll (background & text berubah warna)
 * - Dynamic logo (berubah saat scroll dari 1.png ke 2.png)
 * - Active state detection untuk menandai halaman aktif
 * - Z-index tinggi (9999) agar selalu di depan
 */

"use client";

// Import komponen Next.js
import Link from 'next/link';
import Image from 'next/image';

// Import React hooks
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Import icons dari react-icons
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
    // State: mengontrol pembukaan/penutupan menu mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // State: mendeteksi apakah user sudah scroll atau belum
    const [isScrolled, setIsScrolled] = useState(false);

    // Hook: mendapatkan pathname saat ini untuk active link detection
    const pathname = usePathname();

    // Data: daftar kategori navigasi
    const categories = [
        { name: 'Beranda', href: '/' },
        { name: 'Terbaru', href: '/berita/terbaru' },
        { name: 'Hiburan', href: '/berita/hiburan' },
        { name: 'Gaya Hidup', href: '/berita/gaya-hidup' },
        { name: 'Olahraga', href: '/berita/olahraga' },
        { name: 'Nasional', href: '/berita/nasional' },
        { name: 'Internasional', href: '/berita/internasional' },
    ];


    /**
     * Effect: Deteksi scroll window
     * Menambahkan event listener untuk mendeteksi posisi scroll.
     * Jika scroll > 50px, navbar akan berubah style (background blue & text white).
     * Cleanup function dipanggil saat component unmount untuk menghindari memory leak.
     */
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    /**
     * Helper Function: Cek apakah link sedang aktif
     * @param href - Path yang akan dicek
     * @returns boolean - true jika link aktif
     * 
     * Logic:
     * - Untuk homepage ('/'), exact match
     * - Untuk halaman lain, cek apakah pathname dimulai dengan href
     */
    const isActiveLink = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <nav className={`sticky top-0 z-navbar transition-all duration-300 ${isScrolled
            ? 'bg-news-blue shadow-lg'
            : 'bg-white shadow-md'
            }`}>
            <div className="app-container">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo - Poppins Font */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src={isScrolled ? "/2.png" : "/1.png"}
                            alt="Berita Kini Logo"
                            width={32}
                            height={32}
                            className="object-contain transition-all duration-300"
                        />
                        <span className={`text-xl font-bold transition-colors font-poppins ${isScrolled ? 'text-white' : 'text-gray-900'
                            }`}>Berita Kini</span>
                    </Link>

                    {/* Navigasi Desktop */}
                    <div className="hidden md:flex md:items-center md:gap-6">
                        {categories.map((category) => {
                            const isActive = isActiveLink(category.href);
                            return (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    className={`text-sm font-medium transition-colors ${isScrolled
                                        ? isActive
                                            ? 'text-white'
                                            : 'text-white/80 hover:text-white'
                                        : isActive
                                            ? 'text-news-blue'
                                            : 'text-gray-700 hover:text-news-blue'
                                        }`}
                                >
                                    {category.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Tombol Menu Mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden p-2 rounded-md transition-colors ${isScrolled
                            ? 'text-white hover:bg-white/10'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
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
                    <div className={`md:hidden border-t py-4 ${isScrolled ? 'border-white/20' : 'border-gray-200'
                        }`}>
                        <div className="flex flex-col gap-4">
                            {categories.map((category) => {
                                const isActive = isActiveLink(category.href);
                                return (
                                    <Link
                                        key={category.name}
                                        href={category.href}
                                        className={`text-sm font-medium transition-colors px-2 ${isScrolled
                                            ? isActive
                                                ? 'text-white'
                                                : 'text-white/80 hover:text-white'
                                            : isActive
                                                ? 'text-news-blue'
                                                : 'text-gray-700 hover:text-news-blue'
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {category.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
