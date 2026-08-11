import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getUmkmById, updateUmkm, hapusUmkm } from "@/lib/umkmStorage";

const ADMIN_SESSION_TOKEN = "toboh_gadang_admin_auth_valid_session_2026";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const umkm = getUmkmById(id);

    if (!umkm) {
      return NextResponse.json(
        { success: false, message: "Data UMKM tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: umkm });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Gagal memuat data UMKM." },
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
        { success: false, message: "Akses ditolak. Anda harus login sebagai admin untuk mengubah data UMKM." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const updated = updateUmkm(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "UMKM tidak ditemukan untuk diperbarui." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data UMKM berhasil diperbarui!",
      data: updated,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat memperbarui data UMKM." },
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
        { success: false, message: "Akses ditolak. Anda harus login sebagai admin untuk menghapus data UMKM." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const deleted = hapusUmkm(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Data UMKM tidak ditemukan atau sudah dihapus." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data UMKM berhasil dihapus.",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat menghapus data UMKM." },
      { status: 500 }
    );
  }
}
