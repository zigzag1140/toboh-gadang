import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Nagari Toboh Gadang - Portal Resmi & Profil Pemerintahan Nagari",
  description: "Website resmi dan sistem informasi profil Nagari Toboh Gadang, Sumatera Barat. Akses transparansi APB Nagari dan potensi UMKM lokal secara online.",
  keywords: ["Nagari Toboh Gadang", "Wali Nagari", "Sumatera Barat", "APB Nagari"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#fcfdfe] text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
