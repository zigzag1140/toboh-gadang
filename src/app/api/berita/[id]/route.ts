import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { getTagColorForCategory } from "@/lib/beritaStorage";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const ADMIN_SESSION_TOKEN = "toboh_gadang_admin_auth_valid_session_2026";

// Fungsi untuk MENGEDIT (UPDATE) Berita
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak." },
        { status: 403 },
      );
    }

    const { id } = await params;
    const body = await request.json();

    const tagColor = body.kategori
      ? getTagColorForCategory(body.kategori)
      : undefined;

    const updatedBerita = await prisma.berita.update({
      where: { id: id },
      data: {
        judul: body.judul,
        ringkasan: body.ringkasan,
        konten: body.konten,
        kategori: body.kategori,
        gambar: body.gambar, // URL dari ImgBB akhirnya bisa tersimpan di sini!
        readTime: body.readTime,
        tagColor: tagColor,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil diperbarui!",
      data: updatedBerita,
    });
  } catch (err) {
    console.error("Error updating berita:", err);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui berita" },
      { status: 500 },
    );
  }
}

// Fungsi untuk MENGHAPUS (DELETE) Berita
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak." },
        { status: 403 },
      );
    }

    const { id } = await params;

    await prisma.berita.delete({
      where: { id: id },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dihapus!",
    });
  } catch (err) {
    console.error("Error deleting berita:", err);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus berita" },
      { status: 500 },
    );
  }
}
