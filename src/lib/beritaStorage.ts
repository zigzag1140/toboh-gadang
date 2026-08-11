import fs from "fs";
import path from "path";

export interface BeritaItem {
  id: string;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: string;
  gambar?: string;
  tanggal: string; // e.g. "10 Juli 2026"
  readTime: string;
  tagColor: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "berita.json");

const DEFAULT_BERITA: BeritaItem[] = [
  {
    id: "1",
    judul: "Musrenbang Nagari 2026: Peningkatan Infrastruktur Irigasi Korong",
    ringkasan: "Warga Nagari sepakat memprioritaskan perbaikan saluran irigasi sawah guna mendukung ketahanan pangan lokal di wilayah Toboh Gadang.",
    konten: `Musyawarah Perencanaan Pembangunan Nagari (Musrenbang) Toboh Gadang tahun anggaran 2026 sukses diselenggarakan di Aula Kantor Wali Nagari. Pertemuan ini dihadiri oleh jajaran perangkat nagari, Bamus, tokoh adat ninik mamak, alim ulama, cadiak pandai, serta perwakilan masyarakat dari seluruh korong.

Fokus utama pembangunan tahun ini diarahkan pada pembenahan saluran irigasi pertanian sawah basah yang membentang di beberapa korong produktif. Irigasi yang lancar diproyeksikan mampu meningkatkan hasil panen padi petani hingga 25% setiap musimnya.

Selain infrastruktur pertanian, musyawarah juga menyepakati alokasi dana desa untuk penguatan kapasitas digital generasi muda nagari dan bantuan sarana posyandu.`,
    kategori: "Pembangunan",
    gambar: "",
    tanggal: "10 Juli 2026",
    readTime: "4 menit baca",
    tagColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    judul: "Festival Seni Budaya Anak Nagari Minangkabau Pekan Depan",
    ringkasan: "Saksikan pertunjukan tari piring, randai, dan lomba pidato adat antar jorong dalam rangka pelestarian nilai tradisi lokal.",
    konten: `Dalam rangka melestarikan kearifan lokal dan tradisi Minangkabau, Pemerintah Nagari Toboh Gadang bekerja sama dengan Karang Taruna dan KAN akan menggelar Festival Seni Budaya Anak Nagari pekan depan.

Berbagai kegiatan menarik akan ditampilkan, mulai dari atraksi silek tradisional, pertunjukan tari piring di atas pecahan kaca, pertunjukan seni randai semalam suntuk, hingga lomba pasambahan adat antar generasi muda dari tiap korong.

Acara ini terbuka untuk seluruh masyarakat umum dan diharapkan mampu mempererat silaturahmi serta menumbuhkan rasa bangga generasi muda terhadap adat dan budaya Minang.`,
    kategori: "Kebudayaan",
    gambar: "",
    tanggal: "08 Juli 2026",
    readTime: "3 menit baca",
    tagColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    judul: "Pelatihan Digital Marketing UMKM Produk Olahan Makanan Lokal",
    ringkasan: "Pemerintahan Nagari memfasilitasi sertifikasi halal dan pemasaran digital bagi pelaku usaha kreatif khas nagari.",
    konten: `Sebanyak 30 pelaku usaha mikro, kecil, dan menengah (UMKM) di Nagari Toboh Gadang mengikuti bimbingan teknis pemasaran digital dan pengurusan sertifikasi halal yang difasilitasi oleh Pemerintah Nagari.

Pelatihan ini mencakup pembuatan konten promosi media sosial, fotografi produk menggunakan smartphone, manajemen toko online di marketplace nasional, hingga pengemasan produk yang menarik dan higienis.

Wali Nagari menyampaikan bahwa digitalisasi UMKM adalah langkah nyata untuk memperluas jangkauan pasar produk lokal Toboh Gadang hingga ke luar Sumatera Barat.`,
    kategori: "Ekonomi",
    gambar: "",
    tanggal: "05 Juli 2026",
    readTime: "5 menit baca",
    tagColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    judul: "Pengumuman: Jadwal Imunisasi Balita dan Posyandu Serentak Bulan Juli",
    ringkasan: "Diharapkan orang tua membawa balita ke poskesri korong masing-masing sesuai jadwal yang telah ditentukan bidan desa.",
    konten: `Diberitahukan kepada seluruh warga masyarakat Nagari Toboh Gadang yang memiliki balita usia 0–5 tahun, pelaksanaan Posyandu dan Imunisasi Rutin serentak akan dilaksanakan mulai tanggal 15 hingga 20 Juli 2026 di seluruh Poskesri korong.

Pelayanan yang diberikan meliputi penimbangan berat badan, pengukuran tinggi badan, pemberian vitamin A, imunisasi dasar lengkap, serta konsultasi gizi pencegahan stunting bersama Bidan Desa dan kader kesehatan nagari.

Mari kita jaga kesehatan dan tumbuh kembang anak-anak kita demi masa depan nagari yang lebih sehat dan cerdas.`,
    kategori: "Pengumuman",
    gambar: "",
    tanggal: "03 Juli 2026",
    readTime: "2 menit baca",
    tagColor: "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400",
    createdAt: new Date().toISOString(),
  },
];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_BERITA, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to ensure berita data file:", err);
  }
}

export function getSemuaBerita(): BeritaItem[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : DEFAULT_BERITA;
  } catch (err) {
    console.error("Error reading berita JSON:", err);
    return DEFAULT_BERITA;
  }
}

export function getBeritaById(id: string): BeritaItem | undefined {
  const all = getSemuaBerita();
  return all.find((b) => b.id === id);
}

export function simpanBerita(item: Omit<BeritaItem, "id" | "createdAt">): BeritaItem {
  const all = getSemuaBerita();
  const newItem: BeritaItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };

  const updated = [newItem, ...all];
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return newItem;
}

export function updateBerita(id: string, updates: Partial<Omit<BeritaItem, "id" | "createdAt">>): BeritaItem | null {
  const all = getSemuaBerita();
  const idx = all.findIndex((b) => b.id === id);
  if (idx === -1) return null;

  all[idx] = {
    ...all[idx],
    ...updates,
  };

  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return all[idx];
}

export function hapusBerita(id: string): boolean {
  const all = getSemuaBerita();
  const filtered = all.filter((b) => b.id !== id);
  if (filtered.length === all.length) return false;

  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export function getTagColorForCategory(category: string): string {
  switch (category.toLowerCase()) {
    case "pembangunan":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400";
    case "kebudayaan":
    case "adat":
      return "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400";
    case "ekonomi":
    case "umkm":
      return "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400";
    case "pengumuman":
      return "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400";
    case "sosial":
    case "keagamaan":
      return "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-400";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
  }
}
