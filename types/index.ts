/**
 * Type Definitions untuk Aplikasi Berita Kini
 * Berisi semua tipe data yang digunakan dalam aplikasi
 */

// Tipe data untuk gambar berita
export interface NewsImage {
    small: string;  // URL gambar ukuran kecil
    large: string;  // URL gambar ukuran besar
}

// Tipe data untuk item berita
export interface NewsItem {
    title: string;           // Judul berita
    link: string;            // URL sumber berita
    contentSnippet: string;  // Cuplikan isi berita
    isoDate: string;         // Tanggal publikasi (format ISO)
    image: NewsImage;        // Objek gambar berita
}

// Tipe data untuk response API berita
export interface NewsApiResponse {
    message: string;   // Pesan dari API
    total: number;     // Total berita yang tersedia
    data: NewsItem[];  // Array data berita
}

// Tipe data untuk kategori navigasi
export interface NavCategory {
    name: string;  // Nama kategori yang ditampilkan
    slug: string;  // Slug untuk URL
    href: string;  // Path lengkap
}

// Tipe data untuk komentar (opsional, untuk pengembangan fitur komentar)
export interface Comment {
    id: number;       // ID unik komentar
    author: string;   // Nama pemberi komentar
    time: string;     // Waktu komentar
    content: string;  // Isi komentar
}

// Tipe data untuk props komponen pagination
export interface PaginationProps {
    currentPage: number;     // Halaman saat ini
    totalPages: number;      // Total halaman
    onPageChange: (page: number) => void;  // Callback saat halaman berubah
}
