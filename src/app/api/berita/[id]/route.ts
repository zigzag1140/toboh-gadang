import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getBeritaById, updateBerita, hapusBerita, getTagColorForCategory } from "@/lib/beritaStorage";

const ADMIN_SESSION_TOKEN = "toboh_gadang_admin_auth_valid_session_2026";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const berita = getBeritaById(id);

    if (!berita) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: berita });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Gagal memuat detail berita." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Anda harus login sebagai admin untuk mengedit berita." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { judul, ringkasan, konten, kategori, gambar, tanggal } = body;

    const updates: Record<string, any> = {};
    if (judul) updates.judul = judul;
    if (ringkasan) updates.ringkasan = ringkasan;
    if (konten) {
      updates.konten = konten;
      updates.readTime = `${Math.max(1, Math.ceil(konten.split(" ").length / 180))} menit baca`;
    }
    if (kategori) {
      updates.kategori = kategori;
      updates.tagColor = getTagColorForCategory(kategori);
    }
    if (gambar !== undefined) updates.gambar = gambar;
    if (tanggal) updates.tanggal = tanggal;

    const updated = updateBerita(id, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan untuk diperbarui." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Berita berhasil diperbarui!",
      data: updated,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat memperbarui berita." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Anda harus login sebagai admin untuk menghapus berita." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const deleted = hapusBerita(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan atau sudah dihapus." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dihapus.",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat menghapus berita." },
      { status: 500 }
    );
  }
}
