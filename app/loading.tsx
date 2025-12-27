export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                {/* Spinner */}
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-news-blue border-r-transparent mb-4"></div>
                <p className="text-gray-600 font-medium">Memuat berita...</p>
            </div>
        </div>
    );
}
