import React from "react";
import { getWhatsAppLink } from "@/lib/umkmStorage";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = "force-dynamic";

export default async function PotensiPage() {
  const umkmList = await prisma.umkm.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="py-12 space-y-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 uppercase tracking-widest">
          Potensi Ekonomi Lokal
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
          Sentra UMKM Unggulan Nagari
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Dukung dan beli produk-produk khas Nagari Toboh Gadang hasil karya
          kelompok tani, pengrajin songket, dan pelaku usaha lokal. Hubungi
          langsung penjual via WhatsApp.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-nagari-green-600 dark:text-nagari-gold-400 uppercase tracking-widest">
              Produk &amp; Usaha Lokal
            </span>
            <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white mt-1">
              Katalog Produk UMKM
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            Total {umkmList.length} UMKM Terdaftar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {umkmList.map((item) => {
            const waUrl = getWhatsAppLink(item.whatsapp, item.nama);

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-xl hover:border-slate-350 dark:hover:border-nagari-green-800 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                {item.gambar ? (
                  <div className="h-44 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 text-[10px] bg-slate-900/80 text-white backdrop-blur-md px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                      {item.kategori}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`h-44 bg-gradient-to-br ${item.gradient || "from-amber-800 to-amber-950"} p-5 flex flex-col justify-between text-white relative select-none overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    <span className="text-[10px] bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full font-bold uppercase tracking-wider w-fit z-10">
                      {item.kategori}
                    </span>
                    <h3 className="font-extrabold text-base tracking-tight leading-snug z-10">
                      {item.nama}
                    </h3>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {item.gambar && (
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-snug">
                        {item.nama}
                      </h3>
                    )}
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      📍 {item.pemilik}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {item.deskripsi}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-850">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Harga:</span>
                      <span className="text-nagari-green-700 dark:text-nagari-gold-400 font-bold">
                        {item.harga}
                      </span>
                    </div>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10 hover:shadow-lg transition-all"
                    >
                      <svg
                        className="w-4 h-4 fill-current shrink-0"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.57 4.187 1.564 5.941l-1.636 5.975 6.136-1.61c1.704.931 3.66 1.464 5.741 1.464 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>Hubungi Penjual (WA)</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
