import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// --- Setup Adapter Khusus Prisma 7 ---
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = "force-dynamic";

export default async function Home() {
  const newsItems = await prisma.berita.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <div className="relative overflow-hidden">
      {/* 1. HERO SLIDESHOW SECTION */}
      <HeroSlideshow />

      {/* 2. VISI & MISI SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 uppercase tracking-widest">
            Arah dan Komitmen
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
            Visi &amp; Misi Nagari
          </h2>
          <p className="text-sm text-slate-500">
            Landasan kerja roda pemerintahan Nagari Toboh Gadang untuk
            mewujudkan pelayanan yang berkelanjutan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Visi Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden flex flex-col justify-between group">
            {/* Ambient subtle glow inside card */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-nagari-green-500/5 rounded-full blur-2xl group-hover:bg-nagari-green-500/10 transition-colors" />
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 text-2xl">
                🎯
              </div>
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                Visi Nagari
              </h3>
              <p className="text-slate-700 dark:text-slate-200 leading-relaxed font-serif text-base sm:text-lg font-medium italic border-l-4 border-[#2E5A3E] dark:border-[#C5A85C] pl-4 py-1">
                &ldquo;Memberantas kemiskinan dengan meningkatkan ekonomi untuk
                mewujudkan masyarakat Nagari Toboh Gadang yang sejahtera,
                bahagia, dan mandiri yang berlandaskan agama.&rdquo;
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-850 text-xs text-slate-400 font-semibold">
              Rencana Pembangunan Jangka Menengah Nagari Toboh Gadang
            </div>
          </div>

          {/* Misi Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-nagari-gold-500/5 rounded-full blur-2xl group-hover:bg-nagari-gold-500/10 transition-colors" />
            <div className="space-y-5">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-2xl">
                ⚡
              </div>
              <h3 className="text-2xl font-bold text-slate-950 dark:text-white">
                Misi Nagari
              </h3>
              <ul className="space-y-3.5 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    1
                  </span>
                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                    Memperbaiki dan menambah sarana dan prasarana yang
                    dibutuhkan oleh masyarakat Nagari Toboh Gadang.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    2
                  </span>
                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                    Meningkatkan kualitas sumber daya manusia (SDM) melalui
                    pendidikan formal maupun informal.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    3
                  </span>
                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                    Meningkatkan hasil dan produktivitas pertanian melalui kerja
                    sama dengan petugas penyuluh lapangan serta pemanfaatan
                    potensi pertanian nagari.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    4
                  </span>
                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                    Meningkatkan dan mengembangkan usaha pertanian sebagai salah
                    satu sektor utama perekonomian masyarakat.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    5
                  </span>
                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                    Meningkatkan dan mengelola Pendapatan Asli Nagari (PAN)
                    secara optimal untuk mendukung pembangunan dan kesejahteraan
                    masyarakat.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    6
                  </span>
                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                    Mewujudkan pemerintahan yang baik, bersih, transparan, dan
                    berorientasi pada pelayanan masyarakat melalui pelaksanaan
                    pemerintahan yang efektif dan sesuai dengan ketentuan yang
                    berlaku.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                    7
                  </span>
                  <p className="text-xs sm:text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                    Membina mental, spiritual, dan kehidupan keagamaan
                    masyarakat, sehingga nilai-nilai agama dapat diamalkan dalam
                    kehidupan sehari-hari.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION BERITA & PENGUMUMAN TERKINI */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 uppercase tracking-widest">
              Informasi Terkini
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white mt-1">
              Kabar &amp; Pengumuman Nagari
            </h2>
          </div>
          <Link
            href="#"
            className="text-sm font-semibold text-nagari-green-700 dark:text-nagari-gold-400 hover:text-nagari-green-800 flex items-center gap-1.5 transition-colors group"
          >
            Lihat Semua Berita
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl hover:border-slate-300 dark:hover:border-nagari-green-800 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Image visual representation */}
              {item.gambar ? (
                <div className="h-44 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 text-xs bg-slate-900/80 text-slate-300 px-2 py-1 rounded backdrop-blur-sm">
                    {item.tanggal}
                  </span>
                </div>
              ) : (
                <div className="h-44 w-full bg-gradient-to-br from-nagari-green-800/80 to-slate-900 relative flex items-center justify-center text-white/20 select-none overflow-hidden">
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-300" />
                  <span className="text-6xl font-bold uppercase tracking-tighter opacity-10">
                    Kabar
                  </span>
                  <span className="absolute bottom-3 left-3 text-xs bg-slate-900/80 text-slate-300 px-2 py-1 rounded backdrop-blur-sm">
                    {item.tanggal}
                  </span>
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${item.tagColor || "bg-slate-100 text-slate-800"}`}
                  >
                    {item.kategori}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-2 hover:text-nagari-green-600 dark:hover:text-nagari-gold-400 transition-colors">
                    <Link href={`/berita/${item.id}`}>{item.judul}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {item.ringkasan}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span>{item.readTime}</span>
                  <Link
                    href={`/berita/${item.id}`}
                    className="font-semibold text-nagari-green-700 dark:text-nagari-gold-400 group-hover:underline flex items-center gap-1"
                  >
                    Selengkapnya
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* QUICK LAYANAN SECTIONS */}
      <section className="bg-slate-50 dark:bg-slate-900/20 py-16 border-t border-b border-slate-100 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 uppercase tracking-widest">
              Akses Cepat
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
              Layanan Publik &amp; Administrasi
            </h2>
            <p className="text-sm text-slate-500">
              Urus keperluan surat menyurat dan dapatkan panduan dokumen resmi
              secara online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-center space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-nagari-green-700 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl font-bold">
                📋
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Persyaratan Surat
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Cek alur dokumen dan syarat pengurusan SKU, SKTM, serta
                Pengantar Nikah.
              </p>
              <Link
                href="/layanan"
                className="inline-block text-xs font-semibold text-nagari-green-700 dark:text-nagari-gold-400 hover:underline"
              >
                Lihat Prosedur &rarr;
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-center space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center mx-auto text-2xl font-bold">
                📥
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Unduh Formulir
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Download file formulir permohonan dalam bentuk PDF untuk diisi
                di rumah.
              </p>
              <Link
                href="/layanan"
                className="inline-block text-xs font-semibold text-nagari-green-700 dark:text-nagari-gold-400 hover:underline"
              >
                Unduh Dokumen &rarr;
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800 text-center space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 flex items-center justify-center mx-auto text-2xl font-bold">
                ✍️
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Edit &amp; Cetak Surat
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Isi draf surat administrasi secara instan dan cetak sesuai
                format resmi.
              </p>
              <Link
                href="/layanan"
                className="inline-block text-xs font-semibold text-nagari-green-700 dark:text-nagari-gold-400 hover:underline"
              >
                Pilih Template &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
