import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaSearch } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-news-navy text-white">
            <div className="app-container py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Kolom Brand - Span 2 kolom */}
                    <div className="lg:col-span-2">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-news-blue to-news-teal flex items-center justify-center">
                                <span className="text-white font-bold text-xl">B</span>
                            </div>
                            <span className="text-2xl font-bold">Berita Kini</span>
                        </div>
                        <p className="mb-6 text-sm text-gray-300 leading-relaxed">
                            Platform berita terpercaya yang menyajikan informasi terkini dan terlengkap dari berbagai sumber.
                        </p>

                        {/* Social Media */}
                        <div className="mb-6">
                            <p className="mb-3 text-sm font-semibold">Ikuti Kami:</p>
                            <div className="flex gap-3">
                                <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-news-blue transition-colors">
                                    <FaFacebookF className="h-4 w-4" />
                                </a>
                                <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-news-blue transition-colors">
                                    <FaInstagram className="h-4 w-4" />
                                </a>
                                <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-news-blue transition-colors">
                                    <FaTwitter className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        {/* Copyright */}
                        <p className="text-xs text-gray-400">
                            © 2024 Berita Kini. All rights reserved.
                        </p>
                    </div>

                    {/* Telusuri */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Telusuri</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Beranda</Link></li>
                            <li><Link href="/berita/kesehatan" className="text-gray-300 hover:text-white transition-colors">Kesehatan</Link></li>
                            <li><Link href="/berita/kenegaraan" className="text-gray-300 hover:text-white transition-colors">Kenegaraan</Link></li>
                            <li><Link href="/berita/olahraga" className="text-gray-300 hover:text-white transition-colors">Olahraga</Link></li>
                            <li><Link href="/berita/demografi" className="text-gray-300 hover:text-white transition-colors">Demografi</Link></li>
                        </ul>
                    </div>

                    {/* Bantuan */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Bantuan</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Pusat Bantuan</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Laporan Pendidikan</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Kebijakan Privasi</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>

                    {/* Berlangganan */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Berlangganan Berita Terbaru</h3>
                        <p className="mb-4 text-sm text-gray-300">
                            Dapatkan update berita langsung ke email Anda.
                        </p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email Anda"
                                className="w-full rounded-md bg-white/10 border border-white/20 px-4 py-2 pr-10 text-sm text-white placeholder:text-gray-400 focus:border-news-blue focus:outline-none"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded bg-news-blue flex items-center justify-center hover:bg-blue-700 transition-colors">
                                <FaSearch className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
