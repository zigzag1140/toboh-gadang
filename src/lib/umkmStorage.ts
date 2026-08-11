import fs from "fs";
import path from "path";

export interface UmkmItem {
  id: string;
  nama: string;
  pemilik: string; // e.g. "Ibu Nurhayati - Korong Koto"
  deskripsi: string;
  harga: string; // e.g. "Rp 85.000 / 250gr"
  kategori: string; // "Kuliner", "Camilan", "Kerajinan", "Herbal", "Pertanian", "Lainnya"
  whatsapp: string; // e.g. "08123456789" or "628123456789"
  gambar?: string;
  gradient?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "umkm.json");

const DEFAULT_UMKM: UmkmItem[] = [
  {
    id: "1",
    nama: "Rendang Daging Minang Asli",
    pemilik: "Ibu Nurhayati - Korong Toboh Apa",
    deskripsi: "Rendang daging sapi pilihan dengan bumbu rempah tradisional Minangkabau yang dimasak tungku kayu selama 8 jam.",
    harga: "Rp 85.000 / 250gr",
    kategori: "Kuliner",
    whatsapp: "081267890123",
    gambar: "",
    gradient: "from-amber-800 to-amber-950",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    nama: "Keripik Sanjai Balado Pedas Manis",
    pemilik: "Bapak Rian - Korong Olo",
    deskripsi: "Keripik singkong renyah khas Sumatera Barat dengan lumuran saus cabai balado basah merah merona dan wangi jeruk nipis.",
    harga: "Rp 25.000 / 500gr",
    kategori: "Camilan",
    whatsapp: "081378901234",
    gambar: "",
    gradient: "from-red-800 to-red-950",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    nama: "Sulam Bayang & Songket Halus",
    pemilik: "Kelompok Tenun Cantik - Korong Lua Parik",
    deskripsi: "Kain songket tenun tangan motif tradisional Minang bersulam benang emas berkualitas tinggi untuk pakaian formal adat.",
    harga: "Mulai Rp 450.000",
    kategori: "Kerajinan",
    whatsapp: "082189012345",
    gambar: "",
    gradient: "from-emerald-800 to-emerald-950",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    nama: "Minyak Atsiri Sereh Wangi Murni",
    pemilik: "Koperasi Tani Harau - Korong Kampuang Tangah",
    deskripsi: "Minyak sereh wangi hasil penyulingan mandiri kelompok tani Nagari sebagai bahan dasar aromaterapi dan sabun herbal.",
    harga: "Rp 50.000 / 100ml",
    kategori: "Herbal",
    whatsapp: "085290123456",
    gambar: "",
    gradient: "from-cyan-800 to-cyan-950",
    createdAt: new Date().toISOString(),
  },
];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_UMKM, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to ensure umkm data file:", err);
  }
}

export function getSemuaUmkm(): UmkmItem[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : DEFAULT_UMKM;
  } catch (err) {
    console.error("Error reading umkm JSON:", err);
    return DEFAULT_UMKM;
  }
}

export function getUmkmById(id: string): UmkmItem | undefined {
  const all = getSemuaUmkm();
  return all.find((u) => u.id === id);
}

export function getGradientForCategory(kategori: string): string {
  switch (kategori.toLowerCase()) {
    case "kuliner":
      return "from-amber-800 to-amber-950";
    case "camilan":
      return "from-red-800 to-red-950";
    case "kerajinan":
    case "fashion":
      return "from-emerald-800 to-emerald-950";
    case "herbal":
    case "kesehatan":
      return "from-cyan-800 to-cyan-950";
    case "pertanian":
    case "perkebunan":
      return "from-green-800 to-green-950";
    default:
      return "from-slate-800 to-slate-950";
  }
}

export function simpanUmkm(item: Omit<UmkmItem, "id" | "createdAt">): UmkmItem {
  const all = getSemuaUmkm();
  const newItem: UmkmItem = {
    ...item,
    id: Date.now().toString(),
    gradient: item.gradient || getGradientForCategory(item.kategori),
    createdAt: new Date().toISOString(),
  };

  const updated = [newItem, ...all];
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return newItem;
}

export function updateUmkm(id: string, updates: Partial<Omit<UmkmItem, "id" | "createdAt">>): UmkmItem | null {
  const all = getSemuaUmkm();
  const idx = all.findIndex((u) => u.id === id);
  if (idx === -1) return null;

  if (updates.kategori && !updates.gradient) {
    updates.gradient = getGradientForCategory(updates.kategori);
  }

  all[idx] = {
    ...all[idx],
    ...updates,
  };

  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
  return all[idx];
}

export function hapusUmkm(id: string): boolean {
  const all = getSemuaUmkm();
  const filtered = all.filter((u) => u.id !== id);
  if (filtered.length === all.length) return false;

  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

export function getWhatsAppLink(phone: string, namaProduk: string): string {
  // Format nomor WhatsApp: ganti 08... menjadi 628... dan hilangkan spasi/strip
  let cleaned = phone.replace(/[^0-9]/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  } else if (!cleaned.startsWith("62")) {
    cleaned = "62" + cleaned;
  }

  const message = `Halo, saya tertarik dengan produk *${namaProduk}* yang ada di website resmi Nagari Toboh Gadang. Boleh minta info pemesanan lebih lanjut?`;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}
