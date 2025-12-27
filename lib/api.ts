/**
 * API Service Layer
 * Berisi semua fungsi untuk berkomunikasi dengan API
 * Memisahkan logic API dari komponen untuk maintainability yang lebih baik
 */

import { NewsApiResponse } from '@/types';
import { API_ENDPOINTS, CACHE_CONFIG } from '@/constants';

/**
 * Fetch semua berita terbaru dari CNN
 * @returns Promise dengan data berita atau null jika gagal
 */
export async function fetchAllNews(): Promise<NewsApiResponse | null> {
    try {
        const response = await fetch(API_ENDPOINTS.CNN_NEWS, {
            next: { revalidate: CACHE_CONFIG.NEWS_REVALIDATE },
        });

        if (!response.ok) {
            console.error('Failed to fetch news:', response.statusText);
            return null;
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching news:', error);
        return null;
    }
}

/**
 * Fetch berita berdasarkan kategori
 * @param category - Slug kategori berita (contoh: 'politik', 'olahraga')
 * @returns Promise dengan data berita atau null jika gagal
 */
export async function fetchNewsByCategory(
    category: string
): Promise<NewsApiResponse | null> {
    try {
        const response = await fetch(API_ENDPOINTS.CNN_NEWS_BY_CATEGORY(category), {
            next: { revalidate: CACHE_CONFIG.NEWS_REVALIDATE },
        });

        if (!response.ok) {
            console.error(`Failed to fetch ${category} news:`, response.statusText);
            return null;
        }

        return response.json();
    } catch (error) {
        console.error(`Error fetching ${category} news:`, error);
        return null;
    }
}
