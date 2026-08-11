"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BeritaItem } from "@/lib/beritaStorage";
import { UmkmItem } from "@/lib/umkmStorage";

const KATEGORI_BERITA = [
  "Pembangunan",
  "Kebudayaan",
  "Ekonomi",
  "Pengumuman",
  "Sosial & Keagamaan",
  "Kesehatan",
];

const KATEGORI_UMKM = [
  "Kuliner",
  "Camilan",
  "Kerajinan",
  "Herbal",
  "Pertanian",
  "Fashion",
  "Lainnya",
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"berita" | "umkm">("berita");

  // BERITA STATES
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([]);
  const [isLoadingBerita, setIsLoadingBerita] = useState(true);
  const [searchBerita, setSearchBerita] = useState("");
  const [kategoriBeritaFilter, setKategoriBeritaFilter] = useState("Semua");
  const [isFormBeritaOpen, setIsFormBeritaOpen] = useState(false);
  const [editingBerita, setEditingBerita] = useState<BeritaItem | null>(null);
  const [deleteBeritaId, setDeleteBeritaId] = useState<string | null>(null);

  // Form Fields Berita
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState(KATEGORI_BERITA[0]);
  const [gambar, setGambar] = useState("");
  const [ringkasan, setRingkasan] = useState("");
  const [konten, setKonten] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [isUploadingBeritaImg, setIsUploadingBeritaImg] = useState(false);
  const fileInputBeritaRef = useRef<HTMLInputElement | null>(null);

  // UMKM STATES
  const [umkmList, setUmkmList] = useState<UmkmItem[]>([]);
  const [isLoadingUmkm, setIsLoadingUmkm] = useState(true);
  const [searchUmkm, setSearchUmkm] = useState("");
  const [kategoriUmkmFilter, setKategoriUmkmFilter] = useState("Semua");
  const [isFormUmkmOpen, setIsFormUmkmOpen] = useState(false);
  const [editingUmkm, setEditingUmkm] = useState<UmkmItem | null>(null);
  const [deleteUmkmId, setDeleteUmkmId] = useState<string | null>(null);

  // Form Fields UMKM
  const [namaUmkm, setNamaUmkm] = useState("");
  const [pemilikUmkm, setPemilikUmkm] = useState("");
  const [deskripsiUmkm, setDeskripsiUmkm] = useState("");
  const [hargaUmkm, setHargaUmkm] = useState("");
  const [kategoriUmkm, setKategoriUmkm] = useState(KATEGORI_UMKM[0]);
  const [whatsappUmkm, setWhatsappUmkm] = useState("");
  const [gambarUmkm, setGambarUmkm] = useState("");
  const [isUploadingUmkmImg, setIsUploadingUmkmImg] = useState(false);
  const fileInputUmkmRef = useRef<HTMLInputElement | null>(null);

  // General States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // 1. Check Auth & Load Data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check");
        if (res.ok) {
          setIsAuthenticated(true);
          fetchBerita();
          fetchUmkm();
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [router]);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 2. Fetchers
  const fetchBerita = async () => {
    setIsLoadingBerita(true);
    try {
      const res = await fetch("/api/berita");
      const json = await res.json();
      if (json.success) setBeritaList(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingBerita(false);
    }
  };

  const fetchUmkm = async () => {
    setIsLoadingUmkm(true);
    try {
      const res = await fetch("/api/umkm");
      const json = await res.json();
      if (json.success) setUmkmList(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingUmkm(false);
    }
  };

  // 3. Image Upload Handler
  // 3. Image Upload Handler (JALAN TOL LANGSUNG KE IMGBB)
  const handleFileUpload = async (
    file: File,
    setImageUrl: (url: string) => void,
    setIsUploading: (state: boolean) => void,
  ) => {
    setIsUploading(true);
    try {
      const formData = new FormData();

      // MASUKKAN API KEY IMGBB ANDA DI SINI
      formData.append("key", "524c5c7d69ba6a66dc6c6c4693a8aced");

      // Masukkan file mentahnya langsung
      formData.append("image", file);

      // Terbangkan dari browser LANGSUNG ke ImgBB, bypass Vercel!
      const res = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setImageUrl(data.data.url); // Berhasil dapat link!
        showToast("Foto berhasil diunggah!");
      } else {
        showToast(
          data.error?.message || "Gagal mengunggah foto ke server.",
          "error",
        );
      }
    } catch (err) {
      showToast("Gagal menghubungi server ImgBB.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // ===================== BERITA HANDLERS =====================
  const handleOpenCreateBerita = () => {
    setEditingBerita(null);
    setJudul("");
    setKategori(KATEGORI_BERITA[0]);
    setGambar("");
    setRingkasan("");
    setKonten("");
    setTanggal(
      new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    );
    setIsFormBeritaOpen(true);
  };

  const handleOpenEditBerita = (item: BeritaItem) => {
    setEditingBerita(item);
    setJudul(item.judul);
    setKategori(item.kategori);
    setGambar(item.gambar || "");
    setRingkasan(item.ringkasan);
    setKonten(item.konten);
    setTanggal(item.tanggal);
    setIsFormBeritaOpen(true);
  };

  const handleSubmitBerita = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingBerita) {
        const res = await fetch(`/api/berita/${editingBerita.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            judul,
            kategori,
            gambar,
            ringkasan,
            konten,
            tanggal,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showToast("Berita berhasil diperbarui!");
          setIsFormBeritaOpen(false);
          fetchBerita();
        } else {
          showToast(data.message || "Gagal memperbarui berita.", "error");
        }
      } else {
        const res = await fetch("/api/berita", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            judul,
            kategori,
            gambar,
            ringkasan,
            konten,
            tanggal,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showToast("Berita berhasil ditambahkan!");
          setIsFormBeritaOpen(false);
          fetchBerita();
        } else {
          showToast(data.message || "Gagal menambah berita.", "error");
        }
      }
    } catch (err) {
      showToast("Kesalahan jaringan.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBerita = async (id: string) => {
    try {
      const res = await fetch(`/api/berita/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Berita berhasil dihapus.");
        setDeleteBeritaId(null);
        fetchBerita();
      } else {
        showToast(data.message || "Gagal menghapus.", "error");
      }
    } catch (err) {
      showToast("Kesalahan server.", "error");
    }
  };

  // ===================== UMKM HANDLERS =====================
  const handleOpenCreateUmkm = () => {
    setEditingUmkm(null);
    setNamaUmkm("");
    setPemilikUmkm("");
    setDeskripsiUmkm("");
    setHargaUmkm("");
    setKategoriUmkm(KATEGORI_UMKM[0]);
    setWhatsappUmkm("");
    setGambarUmkm("");
    setIsFormUmkmOpen(true);
  };

  const handleOpenEditUmkm = (item: UmkmItem) => {
    setEditingUmkm(item);
    setNamaUmkm(item.nama);
    setPemilikUmkm(item.pemilik);
    setDeskripsiUmkm(item.deskripsi);
    setHargaUmkm(item.harga);
    setKategoriUmkm(item.kategori);
    setWhatsappUmkm(item.whatsapp);
    setGambarUmkm(item.gambar || "");
    setIsFormUmkmOpen(true);
  };

  const handleSubmitUmkm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingUmkm) {
        const res = await fetch(`/api/umkm/${editingUmkm.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nama: namaUmkm,
            pemilik: pemilikUmkm,
            deskripsi: deskripsiUmkm,
            harga: hargaUmkm,
            kategori: kategoriUmkm,
            whatsapp: whatsappUmkm,
            gambar: gambarUmkm,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showToast("Data UMKM berhasil diperbarui!");
          setIsFormUmkmOpen(false);
          fetchUmkm();
        } else {
          showToast(data.message || "Gagal memperbarui UMKM.", "error");
        }
      } else {
        const res = await fetch("/api/umkm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nama: namaUmkm,
            pemilik: pemilikUmkm,
            deskripsi: deskripsiUmkm,
            harga: hargaUmkm,
            kategori: kategoriUmkm,
            whatsapp: whatsappUmkm,
            gambar: gambarUmkm,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showToast("UMKM baru berhasil ditambahkan!");
          setIsFormUmkmOpen(false);
          fetchUmkm();
        } else {
          showToast(data.message || "Gagal menambah UMKM.", "error");
        }
      }
    } catch (err) {
      showToast("Kesalahan jaringan.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUmkm = async (id: string) => {
    try {
      const res = await fetch(`/api/umkm/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Data UMKM berhasil dihapus.");
        setDeleteUmkmId(null);
        fetchUmkm();
      } else {
        showToast(data.message || "Gagal menghapus UMKM.", "error");
      }
    } catch (err) {
      showToast("Kesalahan server.", "error");
    }
  };

  // Filtered Berita
  const filteredBerita = beritaList.filter((item) => {
    const matchSearch =
      item.judul.toLowerCase().includes(searchBerita.toLowerCase()) ||
      item.ringkasan.toLowerCase().includes(searchBerita.toLowerCase());
    const matchKategori =
      kategoriBeritaFilter === "Semua" ||
      item.kategori.toLowerCase() === kategoriBeritaFilter.toLowerCase();
    return matchSearch && matchKategori;
  });

  // Filtered UMKM
  const filteredUmkm = umkmList.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchUmkm.toLowerCase()) ||
      item.pemilik.toLowerCase().includes(searchUmkm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchUmkm.toLowerCase());
    const matchKategori =
      kategoriUmkmFilter === "Semua" ||
      item.kategori.toLowerCase() === kategoriUmkmFilter.toLowerCase();
    return matchSearch && matchKategori;
  });

  if (isAuthenticated === null) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-nagari-green-600/30 border-t-nagari-green-600 rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-500">
            Memeriksa hak akses admin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/40 py-10 md:py-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-xl border text-sm font-bold flex items-center gap-3 ${
              toastMessage.type === "success"
                ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-950/20"
                : "bg-rose-600 text-white border-rose-500 shadow-rose-950/20"
            }`}
          >
            <span>{toastMessage.type === "success" ? "✓" : "!"}</span>
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Tab & Action Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-slate-800 gap-4">
          {/* Tab Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("berita")}
              className={`pb-3.5 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "berita"
                  ? "border-nagari-green-600 text-nagari-green-700 dark:border-nagari-gold-400 dark:text-nagari-gold-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <span>Kelola Berita &amp; Kabar Nagari</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {beritaList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("umkm")}
              className={`pb-3.5 px-4 font-bold text-sm border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "umkm"
                  ? "border-nagari-green-600 text-nagari-green-700 dark:border-nagari-gold-400 dark:text-nagari-gold-400"
                  : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <span>Kelola UMKM Unggulan</span>
              <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {umkmList.length}
              </span>
            </button>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2.5 pb-2 sm:pb-0">
            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <span>Lihat Website</span>
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-semibold border border-rose-200 dark:border-rose-900/50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Keluar</span>
            </button>
          </div>
        </div>

        {/* ===================== TAB 1: KELOLA BERITA ===================== */}
        {activeTab === "berita" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative flex-1 min-w-[240px] max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchBerita}
                    onChange={(e) => setSearchBerita(e.target.value)}
                    placeholder="Cari judul berita..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-nagari-green-600 shadow-sm"
                  />
                </div>

                <select
                  value={kategoriBeritaFilter}
                  onChange={(e) => setKategoriBeritaFilter(e.target.value)}
                  className="py-2.5 px-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-nagari-green-600 shadow-sm"
                >
                  <option value="Semua">Semua Kategori</option>
                  {KATEGORI_BERITA.map((kat) => (
                    <option key={kat} value={kat}>
                      {kat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenCreateBerita}
                className="py-3 px-5 bg-gradient-to-r from-nagari-green-700 to-nagari-green-600 hover:from-nagari-green-800 hover:to-nagari-green-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span className="text-base">+</span>
                <span>Tambah Berita Baru</span>
              </button>
            </div>

            {/* Table Berita */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
              {isLoadingBerita ? (
                <div className="p-12 text-center text-slate-400">
                  <div className="w-8 h-8 border-3 border-nagari-green-600/30 border-t-nagari-green-600 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-xs">Memuat berita...</p>
                </div>
              ) : filteredBerita.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <span className="text-4xl block">📰</span>
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                    Tidak ada berita ditemukan.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-4 px-6">Foto &amp; Judul Berita</th>
                        <th className="py-4 px-6 hidden sm:table-cell">
                          Kategori
                        </th>
                        <th className="py-4 px-6 hidden md:table-cell">
                          Tanggal Rilis
                        </th>
                        <th className="py-4 px-6 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                      {filteredBerita.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {item.gambar ? (
                                <img
                                  src={item.gambar}
                                  alt={item.judul}
                                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-base shrink-0">
                                  📰
                                </div>
                              )}
                              <div className="space-y-0.5 max-w-md">
                                <h2 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">
                                  {item.judul}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 line-clamp-1 text-xs">
                                  {item.ringkasan}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 hidden sm:table-cell whitespace-nowrap">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${item.tagColor}`}
                            >
                              {item.kategori}
                            </span>
                          </td>
                          <td className="py-4 px-6 hidden md:table-cell whitespace-nowrap text-slate-500">
                            {item.tanggal}
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-right space-x-2">
                            <Link
                              href={`/berita/${item.id}`}
                              target="_blank"
                              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs inline-block"
                            >
                              Lihat
                            </Link>
                            <button
                              onClick={() => handleOpenEditBerita(item)}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold text-xs cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteBeritaId(item.id)}
                              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-semibold text-xs cursor-pointer"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB 2: KELOLA UMKM ===================== */}
        {activeTab === "umkm" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative flex-1 min-w-[240px] max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchUmkm}
                    onChange={(e) => setSearchUmkm(e.target.value)}
                    placeholder="Cari nama produk / pemilik UMKM..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-nagari-green-600 shadow-sm"
                  />
                </div>

                <select
                  value={kategoriUmkmFilter}
                  onChange={(e) => setKategoriUmkmFilter(e.target.value)}
                  className="py-2.5 px-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-nagari-green-600 shadow-sm"
                >
                  <option value="Semua">Semua Kategori</option>
                  {KATEGORI_UMKM.map((kat) => (
                    <option key={kat} value={kat}>
                      {kat}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleOpenCreateUmkm}
                className="py-3 px-5 bg-gradient-to-r from-nagari-green-700 to-nagari-green-600 hover:from-nagari-green-800 hover:to-nagari-green-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span className="text-base">+</span>
                <span>Tambah UMKM Baru</span>
              </button>
            </div>

            {/* Table UMKM */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
              {isLoadingUmkm ? (
                <div className="p-12 text-center text-slate-400">
                  <div className="w-8 h-8 border-3 border-nagari-green-600/30 border-t-nagari-green-600 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-xs">Memuat katalog UMKM...</p>
                </div>
              ) : filteredUmkm.length === 0 ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <span className="text-4xl block">🛍️</span>
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                    Belum ada data UMKM terdaftar.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-4 px-6">Foto &amp; Produk</th>
                        <th className="py-4 px-6">Kategori &amp; Harga</th>
                        <th className="py-4 px-6">Kontak WhatsApp</th>
                        <th className="py-4 px-6 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                      {filteredUmkm.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {item.gambar ? (
                                <img
                                  src={item.gambar}
                                  alt={item.nama}
                                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-base shrink-0">
                                  🛍️
                                </div>
                              )}
                              <div className="space-y-0.5">
                                <h2 className="font-bold text-slate-900 dark:text-white text-sm">
                                  {item.nama}
                                </h2>
                                <p className="text-slate-400 text-xs">
                                  📍 {item.pemilik}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mr-2">
                              {item.kategori}
                            </span>
                            <span className="font-bold text-nagari-green-700 dark:text-nagari-gold-400">
                              {item.harga}
                            </span>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap">
                            <a
                              href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, "").replace(/^0/, "62")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1.5"
                            >
                              <span>📱</span>
                              <span>{item.whatsapp}</span>
                            </a>
                          </td>
                          <td className="py-4 px-6 whitespace-nowrap text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditUmkm(item)}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold text-xs cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteUmkmId(item.id)}
                              className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-semibold text-xs cursor-pointer"
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===================== MODAL FORM BERITA ===================== */}
      {isFormBeritaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingBerita ? "Edit Berita / Kabar" : "Tambah Berita Baru"}
              </h3>
              <button
                onClick={() => setIsFormBeritaOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitBerita} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Judul Berita <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: Musrenbang Nagari 2026..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nagari-green-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Kategori <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nagari-green-600"
                  >
                    {KATEGORI_BERITA.map((kat) => (
                      <option key={kat} value={kat}>
                        {kat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Tanggal Publikasi
                  </label>
                  <input
                    type="text"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    placeholder="Contoh: 10 Juli 2026"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nagari-green-600"
                  />
                </div>
              </div>

              {/* UPLOAD FOTO BERITA */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Upload Foto Berita (Opsional)
                </label>
                <input
                  type="file"
                  ref={fileInputBeritaRef}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(
                        e.target.files[0],
                        setGambar,
                        setIsUploadingBeritaImg,
                      );
                    }
                  }}
                  className="hidden"
                />

                {gambar ? (
                  <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                    <img
                      src={gambar}
                      alt="Preview Foto Berita"
                      className="w-16 h-16 object-cover rounded-xl border border-slate-300 dark:border-slate-600 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                        {gambar}
                      </p>
                      <span className="text-[10px] text-emerald-600 font-bold">
                        ✓ Foto siap dipublikasikan
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputBeritaRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer"
                      >
                        Ganti
                      </button>
                      <button
                        type="button"
                        onClick={() => setGambar("")}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputBeritaRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-nagari-green-600 dark:hover:border-nagari-gold-400 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl p-6 text-center cursor-pointer transition-colors group"
                  >
                    {isUploadingBeritaImg ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-2 border-nagari-green-600/30 border-t-nagari-green-600 rounded-full animate-spin"></div>
                        <span className="text-xs text-slate-500 font-medium">
                          Sedang mengunggah foto...
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 text-slate-500 group-hover:text-nagari-green-600 dark:group-hover:text-nagari-gold-400 flex items-center justify-center mx-auto text-lg transition-colors">
                          📷
                        </div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          Klik untuk memilih &amp; upload foto dari komputer /
                          HP
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Format: JPG, PNG, WebP (Maks. 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Ringkasan Singkat <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={ringkasan}
                  onChange={(e) => setRingkasan(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nagari-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Isi Konten Berita <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={konten}
                  onChange={(e) => setKonten(e.target.value)}
                  placeholder="Tuliskan berita lengkap di sini..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nagari-green-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFormBeritaOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploadingBeritaImg}
                  className="px-6 py-2.5 bg-gradient-to-r from-nagari-green-700 to-nagari-green-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Menyimpan..."
                    : editingBerita
                      ? "Simpan Perubahan"
                      : "Publikasikan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL FORM UMKM ===================== */}
      {isFormUmkmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingUmkm ? "Edit Data UMKM" : "Tambah UMKM Unggulan Baru"}
              </h3>
              <button
                onClick={() => setIsFormUmkmOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitUmkm} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Nama Produk / Usaha UMKM{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={namaUmkm}
                  onChange={(e) => setNamaUmkm(e.target.value)}
                  placeholder="Contoh: Rendang Daging Minang Asli"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nagari-green-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Nama Pemilik &amp; Korong{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={pemilikUmkm}
                    onChange={(e) => setPemilikUmkm(e.target.value)}
                    placeholder="Contoh: Ibu Nurhayati - Korong Toboh Apa"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nagari-green-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Nomor WhatsApp Penjual{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={whatsappUmkm}
                    onChange={(e) => setWhatsappUmkm(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nagari-green-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Kategori Produk <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={kategoriUmkm}
                    onChange={(e) => setKategoriUmkm(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nagari-green-600"
                  >
                    {KATEGORI_UMKM.map((kat) => (
                      <option key={kat} value={kat}>
                        {kat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Harga / Kisaran Harga{" "}
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={hargaUmkm}
                    onChange={(e) => setHargaUmkm(e.target.value)}
                    placeholder="Contoh: Rp 85.000 / 250gr"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nagari-green-600"
                  />
                </div>
              </div>

              {/* UPLOAD FOTO PRODUK UMKM */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Upload Foto Produk UMKM (Opsional)
                </label>
                <input
                  type="file"
                  ref={fileInputUmkmRef}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(
                        e.target.files[0],
                        setGambarUmkm,
                        setIsUploadingUmkmImg,
                      );
                    }
                  }}
                  className="hidden"
                />

                {gambarUmkm ? (
                  <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl">
                    <img
                      src={gambarUmkm}
                      alt="Preview Foto UMKM"
                      className="w-16 h-16 object-cover rounded-xl border border-slate-300 dark:border-slate-600 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                        {gambarUmkm}
                      </p>
                      <span className="text-[10px] text-emerald-600 font-bold">
                        ✓ Foto siap dipublikasikan
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputUmkmRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 text-xs font-semibold cursor-pointer"
                      >
                        Ganti
                      </button>
                      <button
                        type="button"
                        onClick={() => setGambarUmkm("")}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputUmkmRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-nagari-green-600 dark:hover:border-nagari-gold-400 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl p-6 text-center cursor-pointer transition-colors group"
                  >
                    {isUploadingUmkmImg ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-2 border-nagari-green-600/30 border-t-nagari-green-600 rounded-full animate-spin"></div>
                        <span className="text-xs text-slate-500 font-medium">
                          Sedang mengunggah foto...
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 text-slate-500 group-hover:text-nagari-green-600 dark:group-hover:text-nagari-gold-400 flex items-center justify-center mx-auto text-lg transition-colors">
                          🛍️
                        </div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          Klik untuk memilih &amp; upload foto produk dari
                          komputer / HP
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Format: JPG, PNG, WebP (Maks. 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Deskripsi Singkat &amp; Keunggulan Produk{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={deskripsiUmkm}
                  onChange={(e) => setDeskripsiUmkm(e.target.value)}
                  placeholder="Jelaskan keistimewaan rasa, bahan baku, atau pembuatan produk..."
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-nagari-green-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFormUmkmOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploadingUmkmImg}
                  className="px-6 py-2.5 bg-gradient-to-r from-nagari-green-700 to-nagari-green-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Menyimpan..."
                    : editingUmkm
                      ? "Simpan Perubahan"
                      : "Tambahkan UMKM"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== CONFIRM DELETE MODAL ===================== */}
      {(deleteBeritaId || deleteUmkmId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center text-xl mx-auto">
              🗑️
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Hapus Data Ini?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tindakan ini permanen dan akan menghapus item dari website.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setDeleteBeritaId(null);
                  setDeleteUmkmId(null);
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (deleteBeritaId) handleDeleteBerita(deleteBeritaId);
                  if (deleteUmkmId) handleDeleteUmkm(deleteUmkmId);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
