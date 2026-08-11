import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSemuaUmkm, simpanUmkm, getGradientForCategory } from "@/lib/umkmStorage";

const ADMIN_SESSION_TOKEN = "toboh_gadang_admin_auth_valid_session_2026";

export async function GET() {
  try {
    const umkmList = getSemuaUmkm();
    return NextResponse.json({ success: true, data: umkmList });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data UMKM." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Anda harus login sebagai admin untuk menambah UMKM." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { nama, pemilik, deskripsi, harga, kategori, whatsapp, gambar } = body;

    if (!nama || !pemilik || !deskripsi || !harga || !kategori || !whatsapp) {
      return NextResponse.json(
        { success: false, message: "Mohon lengkapi seluruh data wajib UMKM (Nama, Pemilik, Deskripsi, Harga, Kategori, Nomor WhatsApp)." },
        { status: 400 }
      );
    }

    const newUmkm = simpanUmkm({
      nama,
      pemilik,
      deskripsi,
      harga,
      kategori,
      whatsapp,
      gambar: gambar || "",
      gradient: getGradientForCategory(kategori),
    });

    return NextResponse.json({
      success: true,
      message: "Data UMKM berhasil ditambahkan!",
      data: newUmkm,
    });
  } catch (err) {
    console.error("Error creating UMKM:", err);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat menyimpan data UMKM." },
      { status: 500 }
    );
  }
}
