import Link from 'next/link';

// Tipe data berita
export type NewsItem = {
  title: string;
  link: string;
  contentSnippet: string;
  isoDate: string;
  image: {
    small: string;
    large: string;
  };
};

type NewsCardProps = {
  item: NewsItem;
  href?: string;
};

export default function NewsCard({ item, href }: NewsCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

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

      {/* Metadata - Kategori dan Tanggal */}
      <div className="flex flex-col gap-1 mb-2">
        <span className="text-xs font-semibold text-news-blue">Nasional</span>
        <span className="text-xs text-gray-500">{formatDate(item.isoDate)}</span>
      </div>

      {/* Judul */}
      <h3 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-news-blue transition-colors line-clamp-2">
        {item.title}
      </h3>
    </Link>
  );
}
