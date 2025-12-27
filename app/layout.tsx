import type { Metadata } from "next";
import { Poppins, Inter, Nunito_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Font untuk Logo "Berita Kini"
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Font untuk Navbar, Hero, dan Isi berita
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Font untuk Judul Berita Populer & Rekomendasi
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

// Font untuk CTA Section
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Berita Kini - Berita Terkini Indonesia",
  description: "Platform berita terpercaya yang menyajikan informasi terkini dan terlengkap dari berbagai sumber.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} ${inter.variable} ${nunitoSans.variable} ${montserrat.variable} font-inter antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
