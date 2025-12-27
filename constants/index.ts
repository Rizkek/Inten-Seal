/**
 * Konstanta untuk URL API
 * Berisi semua endpoint API yang digunakan dalam aplikasi
 */

// Base URL untuk API Berita Indonesia
export const API_BASE_URL = 'https://berita-indo-api.vercel.app/v1';

// Endpoint untuk CNN News
export const API_ENDPOINTS = {
    CNN_NEWS: `${API_BASE_URL}/cnn-news`,
    CNN_NEWS_BY_CATEGORY: (category: string) => `${API_BASE_URL}/cnn-news/${category}`,
} as const;

// Kategori berita yang tersedia
export const NEWS_CATEGORIES = [
    { name: 'Beranda', slug: '', href: '/' },
    { name: 'Kesehatan', slug: 'kesehatan', href: '/berita/kesehatan' },
    { name: 'Kenegaraan', slug: 'kenegaraan', href: '/berita/kenegaraan' },
    { name: 'Olahraga', slug: 'olahraga', href: '/berita/olahraga' },
    { name: 'Politik', slug: 'politik', href: '/berita/politik' },
    { name: 'Nasional', slug: 'nasional', href: '/berita/nasional' },
    { name: 'Internasional', slug: 'internasional', href: '/berita/internasional' },
] as const;

// Social media links
export const SOCIAL_LINKS = {
    YOUTUBE: '#',
    INSTAGRAM: '#',
    FACEBOOK: '#',
} as const;

// Konfigurasi pagination
export const PAGINATION_CONFIG = {
    ITEMS_PER_PAGE: 8,
    MAX_VISIBLE_PAGES: 8,
} as const;

// Konfigurasi revalidasi cache (dalam detik)
export const CACHE_CONFIG = {
    NEWS_REVALIDATE: 60, // 1 menit
} as const;
