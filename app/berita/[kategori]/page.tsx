import Link from 'next/link';
import { notFound } from 'next/navigation';
import NewsCard, { NewsItem } from '@/components/NewsCard';

type ApiResponse = {
    message: string;
    total: number;
    data: NewsItem[];
};

async function getNews(kategori: string): Promise<ApiResponse | null> {
    const isTerbaru = kategori === 'terbaru';
    const url = isTerbaru
        ? 'https://berita-indo-api.vercel.app/v1/cnn-news/'
        : `https://berita-indo-api.vercel.app/v1/cnn-news/${kategori}`;

    try {
        const res = await fetch(url, {
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return null;
        }

        return res.json();
    } catch (error) {
        console.error('Failed to fetch category news:', error);
        return null;
    }
}

export default async function CategoryPage({ params }: { params: Promise<{ kategori: string }> }) {
    const { kategori } = await params;
    const data = await getNews(kategori);

    if (!data) {
        return notFound();
    }

    return (
        <div className="bg-gray-50 py-20">
            <div className="app-container">
                {/* Breadcrumb & Title */}
                <div className="mb-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between animate-fade-in-up">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                            <Link href="/" className="hover:text-news-blue">Beranda</Link>
                            <span>/</span>
                            <span className="capitalize text-news-blue">{kategori.replace('-', ' ')}</span>
                        </div>
                        <h1 className="text-3xl font-bold capitalize text-gray-900 md:text-4xl">
                            Berita {kategori.replace('-', ' ')}
                        </h1>
                    </div>
                </div>

                {/* Grid Berita */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up-delay-200">
                    {data.data.map((item, index) => (
                        <NewsCard key={index} item={item} href={`/read/${index}`} />
                    ))}
                </div>
            </div>
        </div>
    );
}
