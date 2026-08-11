import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSemuaBerita, simpanBerita, getTagColorForCategory } from "@/lib/beritaStorage";

const ADMIN_SESSION_TOKEN = "toboh_gadang_admin_auth_valid_session_2026";

export async function GET() {
  try {
    const beritaList = getSemuaBerita();
    return NextResponse.json({ success: true, data: beritaList });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data berita." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // 1. Verifikasi Session Admin
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Anda harus login sebagai admin untuk menambah berita." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { judul, ringkasan, konten, kategori, gambar, tanggal, readTime } = body;

    if (!judul || !ringkasan || !konten || !kategori) {
      return NextResponse.json(
        { success: false, message: "Mohon lengkapi judul, ringkasan, konten, dan kategori berita." },
        { status: 400 }
      );
    }

    // Format tanggal Indonesia otomatis jika tidak diisi manual
    const formattedDate = tanggal || new Date().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const calculatedReadTime = readTime || `${Math.max(1, Math.ceil(konten.split(" ").length / 180))} menit baca`;
    const tagColor = getTagColorForCategory(kategori);

    const newBerita = simpanBerita({
      judul,
      ringkasan,
      konten,
      kategori,
      gambar: gambar || "",
      tanggal: formattedDate,
      readTime: calculatedReadTime,
      tagColor,
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dipublikasikan!",
      data: newBerita,
    });
  } catch (err) {
    console.error("Error creating berita:", err);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat menyimpan berita." },
      { status: 500 }
    );
  }
}
