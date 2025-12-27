/**
 * Komponen NewsCard
 * 
 * Card untuk menampilkan preview berita.
 * Digunakan di halaman home dan kategori.
 * 
 * Fitur:
 * - Gambar berita yang responsive
 * - Hover effect (scale gambar & ubah warna judul)
 * - Judul dengan line-clamp (maksimal 2 baris)
 * - Metadata (kategori & tanggal)
 * 
 * Typography:
 * - Judul: Nunito Sans (font-nunito)
 * - Metadata: Inter (font-inter)
 */

// Import komponen Next.js
import Link from 'next/link';

/**
 * Type Definition: Struktur data gambar berita
 */
export type NewsImage = {
  small: string;  // URL gambar ukuran kecil (untuk thumbnail)
  large: string;  // URL gambar ukuran besar (untuk detail)
};

/**
 * Type Definition: Struktur data berita
 */
export type NewsItem = {
  title: string;           // Judul berita
  link: string;            // URL sumber berita asli
  contentSnippet: string;  // Ringkasan/cuplikan isi berita
  isoDate: string;         // Tanggal publikasi (format ISO 8601)
  image: NewsImage;        // Object gambar berita
};

/**
 * Type Definition: Props untuk komponen NewsCard
 */
type NewsCardProps = {
  item: NewsItem;   // Data berita yang akan ditampilkan
  href?: string;    // Optional: override link tujuan (default: item.link)
};

export default function NewsCard({ item, href }: NewsCardProps) {
  /**
   * Helper Function: Format tanggal ke bahasa Indonesia
   * @param dateStr - String tanggal ISO
   * @returns String tanggal format Indonesia (contoh: "28 Desember 2024")
   */
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Gunakan href custom jika ada, jika tidak gunakan item.link
  const linkHref = href || item.link;

  return (
    <Link href={linkHref} className="group block">
      {/* Gambar */}
      <div className="aspect-4/3 w-full overflow-hidden rounded-lg bg-gray-100 mb-3">
        <img
          src={item.image.small}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Metadata - Kategori dan Tanggal - Inter */}
      <div className="flex flex-col gap-1 mb-2 font-inter">
        <span className="text-xs font-semibold text-news-blue">Nasional</span>
        <span className="text-xs text-gray-500">{formatDate(item.isoDate)}</span>
      </div>

      {/* Judul - Nunito Sans */}
      <h3 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-news-blue transition-colors line-clamp-2 font-nunito">
        {item.title}
      </h3>
    </Link>
  );
}
