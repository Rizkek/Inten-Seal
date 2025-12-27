/**
 * Utility Functions untuk Aplikasi Berita Kini
 * Berisi fungsi-fungsi helper yang digunakan di berbagai tempat
 */

/**
 * Format tanggal dari ISO string ke format Indonesia
 * @param dateStr - String tanggal dalam format ISO
 * @returns String tanggal dalam format Indonesia (contoh: "28 Desember 2024")
 */
export const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

/**
 * Format tanggal singkat
 * @param dateStr - String tanggal dalam format ISO
 * @returns String tanggal dalam format singkat (contoh: "28 Des 2024")
 */
export const formatDateShort = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

/**
 * Kapitalisasi string dan replace dash dengan spasi
 * @param str - String yang akan diformat
 * @returns String yang sudah diformat (contoh: "berita-kini" -> "Berita Kini")
 */
export const capitalize = (str: string): string => {
    return str
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Truncate text dengan ellipsis
 * @param text - Text yang akan dipotong
 * @param maxLength - Panjang maksimal
 * @returns Text yang sudah dipotong dengan ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

/**
 * Hitung range halaman untuk pagination
 * @param currentPage - Halaman saat ini
 * @param totalPages - Total halaman
 * @param maxVisible - Maksimal halaman yang ditampilkan
 * @returns Object berisi startPage dan endPage
 */
export const calculatePaginationRange = (
    currentPage: number,
    totalPages: number,
    maxVisible: number
): { startPage: number; endPage: number } => {
    let startPage = 1;
    let endPage = Math.min(totalPages, maxVisible);

    if (totalPages > maxVisible) {
        const halfWindow = Math.floor(maxVisible / 2);

        if (currentPage > halfWindow) {
            startPage = currentPage - halfWindow;
            endPage = currentPage + halfWindow - 1;

            if (endPage > totalPages) {
                endPage = totalPages;
                startPage = totalPages - maxVisible + 1;
            }
        }
    }

    return { startPage, endPage };
};
