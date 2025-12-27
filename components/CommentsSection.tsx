"use client";

import { useState } from 'react';

type Comment = {
    id: number;
    author: string;
    time: string;
    content: string;
};

export default function CommentsSection() {
    const mockComments: Comment[] = [
        { id: 1, author: "Budi Santoso", time: "2 jam yang lalu", content: "Artikel yang sangat informatif! Terima kasih telah membagikan informasi ini." },
        { id: 2, author: "Siti Nurhaliza", time: "5 jam yang lalu", content: "Saya setuju dengan poin-poin yang disampaikan. Sangat relevan dengan kondisi saat ini." },
        { id: 3, author: "Ahmad Dhani", time: "1 hari yang lalu", content: "Menarik sekali pembahasan ini. Semoga ada artikel lanjutan." },
        { id: 4, author: "Dewi Lestari", time: "1 hari yang lalu", content: "Bagus, tapi ada beberapa hal yang perlu diperjelas." },
        { id: 5, author: "Rizky Pratama", time: "2 hari yang lalu", content: "Terima kasih atas wawasannya!" },
        { id: 6, author: "Linda Wijaya", time: "2 hari yang lalu", content: "Artikel yang mencerahkan dan mudah dipahami." },
        { id: 7, author: "Eko Prasetyo", time: "3 hari yang lalu", content: "Saya suka sudut pandang yang diambil dalam artikel ini." },
        { id: 8, author: "Maya Sari", time: "3 hari yang lalu", content: "Informasi yang sangat berguna, ditunggu artikel berikutnya." },
    ];

    const [comments, setComments] = useState<Comment[]>(mockComments);
    const [newComment, setNewComment] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment: Comment = {
                id: comments.length + 1,
                author: "Anonymous",
                time: "Baru saja",
                content: newComment.trim()
            };
            setComments([comment, ...comments]);
            setNewComment("");
        }
    };

    // Logic Pagination
    const totalPages = Math.ceil(comments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentComments = comments.slice(startIndex, endIndex);

    // Reset ke halaman 1 jika melebihi total halaman
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(1);
    }

    return (
        <div className="mt-16 border-t border-gray-200 pt-10">
            {/* Header Komentar */}
            <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-1 bg-news-blue rounded-full"></div>
                <h3 className="text-lg font-bold text-gray-900">
                    Komentar ({comments.length})
                </h3>
            </div>

            {/* Form Tambah Komentar */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <textarea
                    placeholder="Tulis komentar Anda..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-news-blue"
                ></textarea>
                <div className="flex justify-end mt-3">
                    <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="px-6 py-2 bg-news-blue text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        Kirim
                    </button>
                </div>
            </div>

            {/* Daftar Komentar */}
            <div className="space-y-6 mb-6">
                {currentComments.map((comment, index) => {
                    const avatarColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500'];
                    const avatarColor = avatarColors[index % avatarColors.length];

                    return (
                        <div key={comment.id} className="flex gap-4">
                            <div className={`shrink-0 h-10 w-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold`}>
                                {comment.author.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-gray-900">{comment.author}</span>
                                    <span className="text-xs text-gray-500">{comment.time}</span>
                                </div>
                                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                                    {comment.content}
                                </p>
                                <button className="text-xs text-news-blue font-medium hover:underline">
                                    Balas
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Komentar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Item per page :</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to first page
                        }}
                        className="border-2 border-gray-300 rounded-md px-3 py-1.5 text-sm focus:border-news-blue focus:outline-none hover:border-gray-400 transition-colors bg-white cursor-pointer"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                    <span className="ml-2">of {comments.length}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        ←
                    </button>

                    {(() => {
                        // Smart pagination logic - maksimal 8 halaman yang bergeser
                        const maxVisiblePages = 8;
                        let startPage = 1;
                        let endPage = Math.min(totalPages, maxVisiblePages);

                        if (totalPages > maxVisiblePages) {
                            const halfWindow = Math.floor(maxVisiblePages / 2);

                            if (currentPage > halfWindow) {
                                startPage = currentPage - halfWindow;
                                endPage = currentPage + halfWindow - 1;

                                if (endPage > totalPages) {
                                    endPage = totalPages;
                                    startPage = totalPages - maxVisiblePages + 1;
                                }
                            }
                        }

                        const pages = [];
                        for (let i = startPage; i <= endPage; i++) {
                            pages.push(i);
                        }

                        return (
                            <>
                                {startPage > 1 && (
                                    <>
                                        <button
                                            onClick={() => setCurrentPage(1)}
                                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            1
                                        </button>
                                        {startPage > 2 && (
                                            <span className="px-2 text-gray-500">...</span>
                                        )}
                                    </>
                                )}

                                {pages.map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${currentPage === pageNum
                                                ? 'bg-news-blue text-white border-news-blue'
                                                : 'border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}

                                {endPage < totalPages && (
                                    <>
                                        {endPage < totalPages - 1 && (
                                            <span className="px-2 text-gray-500">...</span>
                                        )}
                                        <button
                                            onClick={() => setCurrentPage(totalPages)}
                                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            {totalPages}
                                        </button>
                                    </>
                                )}
                            </>
                        );
                    })()}

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}
