import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NewsItem } from '@/components/NewsCard';
import CommentsSection from '@/components/CommentsSection';

type ApiResponse = {
    message: string;
    total: number;
    data: NewsItem[];
};

async function getAllNews(): Promise<NewsItem[]> {
    try {
        const res = await fetch('https://berita-indo-api.vercel.app/v1/cnn-news/', {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return [];
        }

        const data: ApiResponse = await res.json();
        return data.data;
    } catch (error) {
        console.error('Failed to fetch all news:', error);
        return [];
    }
}

export default async function ReadPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const newsIndex = parseInt(id);
    const allNews = await getAllNews();

    if (isNaN(newsIndex) || newsIndex < 0 || newsIndex >= allNews.length) {
        return notFound();
    }

    const item = allNews[newsIndex];
    const popularNews = allNews.slice(0, 5);
    const relatedNews = allNews.slice(10, 13);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-gray-50 py-20">
            <div className="app-container">
                {/* Grid 2 Kolom: Konten Utama + Sidebar */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Kolom Kiri: Konten Utama */}
                    <div className="lg:col-span-2">
                        {/* Judul & Metadata */}
                        <div className="mb-6 animate-fade-in-up">
                            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
                                {item.title}
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="font-semibold text-news-blue">CNN Indonesia</span>
                                <span>&bull;</span>
                                <span>{formatDate(item.isoDate)}</span>
                            </div>
                        </div>

                        {/* Gambar Utama */}
                        <div className="mb-8 overflow-hidden rounded-xl bg-gray-100 animate-fade-in-up-delay-100">
                            <img
                                src={item.image.large}
                                alt={item.title}
                                className="w-full h-auto object-cover"
                            />
                            <p className="px-4 py-2 text-xs text-gray-600 italic bg-gray-50">
                                Sumber: CNN Indonesia
                            </p>
                        </div>

                        {/* Konten Artikel */}
                        <article className="text-gray-700 leading-relaxed mb-12 animate-fade-in-up-delay-200">
                            <p className="font-semibold text-lg mb-6 leading-8">
                                {item.contentSnippet}
                            </p>
                            <p className="mb-4">
                                Artikel lengkap dapat dibaca di sumber asli. Ini adalah pratinjau konten yang menampilkan ringkasan berita.
                            </p>
                            <p className="mb-4">
                                Untuk informasi lebih detail dan update terkini, silakan kunjungi halaman sumber berita.
                            </p>
                            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-news-blue rounded">
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-news-blue font-semibold hover:underline"
                                >
                                    Baca artikel lengkap di sumber →
                                </a>
                            </div>
                        </article>

                        {/* Section Komentar */}
                        <CommentsSection />

                        {/* Berita Terkait */}
                        <div className="mt-20 border-t border-gray-200 pt-10 animate-fade-in-up">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-1 bg-news-blue rounded-full"></div>
                                    <h3 className="text-lg font-bold text-gray-900">Berita Terkait</h3>
                                </div>
                                <Link href="/" className="text-sm text-news-blue font-semibold hover:underline">
                                    Lihat Semua →
                                </Link>
                            </div>

                            {/* Grid 3 Kolom untuk Related News */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {relatedNews.map((relItem, idx) => (
                                    <Link key={idx} href={`/read/${10 + idx}`} className="group block">
                                        <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100 mb-3">
                                            <img
                                                src={relItem.image.small}
                                                alt={relItem.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 mb-2">
                                            <span className="text-xs font-semibold text-news-blue">Nasional</span>
                                            <span className="text-xs text-gray-500">{formatDate(relItem.isoDate)}</span>
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-news-blue transition-colors line-clamp-2">
                                            {relItem.title}
                                        </h3>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 animate-fade-in-up-delay-300">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-6 w-1 bg-news-blue rounded-full"></div>
                                <h3 className="text-lg font-bold text-gray-900">Berita Terpopuler</h3>
                            </div>

                            <div className="space-y-6">
                                {popularNews.map((popItem, idx) => (
                                    <Link key={idx} href={`/read/${idx}`} className="group flex gap-3">
                                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                            <img
                                                src={popItem.image.small}
                                                alt={popItem.title}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-gray-900 line-clamp-3 group-hover:text-news-blue transition-colors leading-tight mb-2">
                                                {popItem.title}
                                            </h4>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(popItem.isoDate)}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
