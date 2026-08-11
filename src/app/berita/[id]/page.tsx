import Link from "next/link";
import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// --- Setup Adapter Khusus Prisma 7 ---
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
// -------------------------------------

// Mematikan cache agar berita bisa langsung dibaca real-time
export const dynamic = "force-dynamic";

export default async function BeritaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Ambil detail berita dari database Neon berdasarkan ID
  const berita = await prisma.berita.findUnique({
    where: { id: id },
  });

  // Jika ID tidak ditemukan di Neon, barulah munculkan 404
  if (!berita) {
    notFound();
  }

  // 2. Ambil 3 berita lainnya dari database Neon (kecuali berita yang sedang dibaca)
  const beritaLainnya = await prisma.berita.findMany({
    where: {
      id: { not: id },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <div className="py-12 bg-[#FAFBF9]/50 dark:bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation back */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-nagari-green-600 dark:text-slate-400 dark:hover:text-nagari-gold-400 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>

        {/* Main Article Container */}
        <article className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8">
          {/* Article Header */}
          <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${berita.tagColor || "bg-slate-100 text-slate-800"}`}
              >
                {berita.kategori}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {berita.tanggal}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-400 font-medium">
                {berita.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
              {berita.judul}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-serif italic leading-relaxed border-l-4 border-nagari-green-600 pl-4 py-1">
              &ldquo;{berita.ringkasan}&rdquo;
            </p>
          </div>

          {/* Featured Image (If available) */}
          {berita.gambar ? (
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-850 shadow-inner max-h-[420px]">
              <img
                src={berita.gambar}
                alt={berita.judul}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-48 rounded-2xl bg-gradient-to-r from-nagari-green-800/80 to-slate-900 flex items-center justify-center text-white/20 select-none overflow-hidden relative">
              <span className="text-7xl font-bold uppercase tracking-tighter opacity-15">
                Kabar Nagari
              </span>
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base space-y-5">
            {berita.konten.split("\n\n").map((paragraf, index) => (
              <p key={index} className="leading-relaxed">
                {paragraf}
              </p>
            ))}
          </div>

          {/* Article Footer & Share */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-nagari-green-100 dark:bg-emerald-950/60 text-nagari-green-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                TG
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-white block">
                  Pemerintah Nagari Toboh Gadang
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Diterbitkan melalui Portal Resmi Nagari
                </span>
              </div>
            </div>

            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
            >
              Lihat Informasi Lainnya &rarr;
            </Link>
          </div>
        </article>

        {/* Other News Section */}
        {beritaLainnya.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Kabar Terkini Lainnya
              </h2>
              <Link
                href="/"
                className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 hover:underline"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {beritaLainnya.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.id}`}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-nagari-green-600/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${item.tagColor || "bg-slate-100 text-slate-800"}`}
                    >
                      {item.kategori}
                    </span>
                    <h3 className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-nagari-green-600 dark:group-hover:text-nagari-gold-400 line-clamp-2 transition-colors">
                      {item.judul}
                    </h3>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-3 block">
                    {item.tanggal}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
