import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-news-blue mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-news-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}
