"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NewsCard, { NewsItem } from "@/components/NewsCard";
import { FaClock, FaChevronLeft, FaChevronRight, FaArrowRight, FaSearch } from 'react-icons/fa';

export default function HomeClient({ news }: { news: NewsItem[] }) {
    // State Hero Section
    const [heroIndex, setHeroIndex] = useState(0);

    if (!news || news.length === 0) {
        return (
            <div className="py-20 text-center text-gray-500">
                <p>Belum ada berita yang tersedia.</p>
            </div>
        );
    }

    const heroNews = news.slice(0, 5);
    const currentHero = heroNews[heroIndex];

    // Data Berita Populer
    const popularNews = news.slice(5, 8);

    // State Daftar Berita
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filter & Pagination
    const listNews = news.slice(5).filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(listNews.length / itemsPerPage);
    const paginatedNews = listNews.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // State CTA Banner
    const [bannerIndex, setBannerIndex] = useState(0);
    const banners = [
        { title: "Petualangan Edukasi Menanti Anda!", desc: "Jelajahi wawasan baru dan perluas pengetahuan Anda.", color: "bg-news-teal" },
        { title: "Berlangganan Newsletter Kami", desc: "Dapatkan berita terkini langsung di inbox Anda setiap pagi.", color: "bg-news-blue" },
        { title: "Bergabung dengan Komunitas", desc: "Diskusikan topik hangat bersama ribuan pembaca lainnya.", color: "bg-indigo-600" },
    ];

    // Event Handlers
    const nextHero = () => setHeroIndex((prev) => (prev + 1) % heroNews.length);
    const prevHero = () => setHeroIndex((prev) => (prev - 1 + heroNews.length) % heroNews.length);

    const nextBanner = () => setBannerIndex((prev) => (prev + 1) % banners.length);
    const prevBanner = () => setBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-white pb-20">
            {/* Hero Section */}
            <div className="bg-white py-16 lg:py-20">
                <div className="app-container">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                        {/* Teks Kiri */}
                        <div className="flex-1 space-y-8 animate-fade-in-up">
                            <span className="font-semibold text-gray-500">Headline</span>
                            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                                {currentHero.title}
                            </h1>
                            <p className="text-lg text-gray-600 line-clamp-3">
                                {currentHero.contentSnippet}
                            </p>
                            <div className="flex items-center gap-2 text-gray-500">
                                <FaClock className="h-5 w-5" />
                                {formatDate(currentHero.isoDate)}
                            </div>
                            <div>
                                <Link
                                    href={`/read/${heroIndex}`}
                                    className="inline-flex items-center text-news-blue font-semibold hover:underline"
                                >
                                    Baca Selengkapnya
                                    <FaArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Gambar Kanan */}
                        <div className="flex-1 animate-fade-in-up-delay-200">
                            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-xl">
                                <img
                                    src={currentHero.image.large}
                                    alt={currentHero.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Pagination Hero */}
                    <div className="mt-12 flex items-center gap-8 justify-center text-gray-500 font-medium">
                        <button onClick={prevHero} className="hover:text-black">
                            <FaChevronLeft />
                        </button>
                        <span>{heroIndex + 1} &nbsp; dari &nbsp; {heroNews.length}</span>
                        <button onClick={nextHero} className="hover:text-black">
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>

            {/* Berita Populer */}
            <div className="app-container pt-16 pb-8 animate-fade-in-up">
                <div className="border-l-4 border-news-blue pl-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Berita Terpopuler
                    </h2>
                </div>
            </div>

            <div className="app-container pb-20">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {popularNews.map((item, idx) => (
                        <div key={idx} className="relative flex gap-4 items-start">
                            {/* Badge Ranking */}
                            <div className="absolute -left-2 -top-2 h-8 w-8 rounded-full bg-news-blue text-white flex items-center justify-center font-bold text-sm shadow-lg z-10">
                                {idx + 1}
                            </div>
                            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                <img src={item.image.small} alt={item.title} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-sm font-bold text-gray-900 line-clamp-4 hover:text-news-blue">
                                    <Link href={`/read/${5 + idx}`}>{item.title}</Link>
                                </h3>
                                <span className="mt-10 text-xs text-news-blue font-semibold">
                                    Nasional &bull; {formatDate(item.isoDate)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Daftar Berita Utama */}
            <div className="bg-gray-50 py-16 lg:py-20">
                <div className="app-container">
                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in-up">
                        <div className="border-l-4 border-news-blue pl-4">
                            <h2 className="text-2xl font-bold text-gray-900">Rekomendasi Untuk Anda</h2>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari berita..."
                                className="w-full sm:w-64 rounded-md border border-gray-300 px-4 py-2 pr-10 text-sm focus:border-news-blue focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1); // Reset page on search
                                }}
                            />
                            <FaSearch className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Grid 4 Kolom */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {paginatedNews.map((item, index) => {
                            // Cari index asli di array news
                            const originalIndex = news.findIndex(n => n.link === item.link);
                            return (
                                <NewsCard key={index} item={item} href={`/read/${originalIndex}`} />
                            );
                        })}
                    </div>

                    {/* Kontrol Pagination */}
                    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, listNews.length)}</span> of <span className="font-medium">{listNews.length}</span> results
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-20 py-2 text-sm font-medium text-gray-700 hover:text-news-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                ← Previous
                            </button>

                            {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${currentPage === pageNum
                                        ? 'bg-news-blue text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            ))}

                            {totalPages > 8 && (
                                <span className="w-6 text-center text-gray-500">...</span>
                            )}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="w-20 py-2 text-sm font-medium text-gray-700 hover:text-news-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section CTA */}
            <div className="app-container py-20">
                <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 ease-in-out ${banners[bannerIndex].color} shadow-2xl`}>
                    <div className="px-6 py-6 sm:px-8 lg:px-12">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
                            {/* Konten Teks */}
                            <div className="flex-1 text-center lg:text-left text-white w-full lg:max-w-xl min-h-[160px] flex flex-col justify-center">
                                <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight transition-opacity duration-300">
                                    {banners[bannerIndex].title}
                                </h2>
                                <p className="mb-6 lg:mb-0 text-base sm:text-lg text-white/95 font-medium leading-relaxed transition-opacity duration-300">
                                    {banners[bannerIndex].desc}
                                </p>
                            </div>

                            {/* Area Kolase Gambar */}
                            <div className="flex-1 relative h-[320px] sm:h-[380px] lg:h-[400px] w-full max-w-md lg:max-w-lg flex items-center">
                                {/* Gambar 1: Museum */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-4 w-36 h-28 sm:w-44 sm:h-32 lg:w-48 lg:h-36 bg-white rounded-xl shadow-2xl transform -rotate-6 overflow-hidden transition-transform hover:scale-105 hover:-rotate-3 duration-300" style={{ marginTop: '-20px' }}>
                                    <img
                                        src="https://placehold.co/400x300?text=Museum+Brawijaya"
                                        alt="Museum Brawijaya"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-white/95 px-2 py-1.5 text-[10px] sm:text-xs font-bold text-gray-800 text-center">
                                        Museum Brawijaya
                                    </div>
                                </div>

                                {/* Gambar 2: Kayutangan */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-44 h-36 sm:w-52 sm:h-40 lg:w-56 lg:h-44 bg-white rounded-xl shadow-2xl z-20 overflow-hidden transition-transform hover:scale-105 duration-300">
                                    <img
                                        src="https://placehold.co/400x300?text=Kayutangan"
                                        alt="Kayutangan"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-white/95 px-2 py-1.5 text-[10px] sm:text-xs font-bold text-gray-800 text-center">
                                        Kayutangan
                                    </div>
                                </div>

                                {/* Gambar 3: Kebun Binatang */}
                                <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-4 w-36 h-28 sm:w-44 sm:h-32 lg:w-48 lg:h-36 bg-white rounded-xl shadow-2xl transform rotate-6 z-10 overflow-hidden transition-transform hover:scale-105 hover:rotate-3 duration-300" style={{ marginTop: '20px' }}>
                                    <img
                                        src="https://placehold.co/400x300?text=Kebun+Binatang"
                                        alt="Kebun Binatang"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-white/95 px-2 py-1.5 text-[10px] sm:text-xs font-bold text-gray-800 text-center">
                                        Kebun Binatang
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dots Navigasi */}
                        <div className="flex justify-center mt-8 lg:mt-12 gap-2.5">
                            {banners.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setBannerIndex(i)}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${i === bannerIndex
                                        ? "w-8 bg-white shadow-md"
                                        : "w-2.5 bg-white/50 hover:bg-white/70"
                                        }`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
