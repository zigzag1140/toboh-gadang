import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { getGradientForCategory } from "@/lib/umkmStorage";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const ADMIN_SESSION_TOKEN = "toboh_gadang_admin_auth_valid_session_2026";

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

    const gradient = body.kategori
      ? getGradientForCategory(body.kategori)
      : undefined;

    const updatedUmkm = await prisma.umkm.update({
      where: { id: id },
      data: {
        nama: body.nama,
        pemilik: body.pemilik,
        deskripsi: body.deskripsi,
        harga: body.harga,
        kategori: body.kategori,
        whatsapp: body.whatsapp,
        gambar: body.gambar, 
        gradient: gradient,
      },
    });

    return NextResponse.json({
      success: true,
      message: "UMKM berhasil diperbarui!",
      data: updatedUmkm,
    });
  } catch (err) {
    console.error("Error updating UMKM:", err);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui UMKM" },
      { status: 500 },
    );
  }
}

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

    await prisma.umkm.delete({
      where: { id: id },
    });

    return NextResponse.json({
      success: true,
      message: "UMKM berhasil dihapus!",
    });
  } catch (err) {
    console.error("Error deleting UMKM:", err);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus UMKM" },
      { status: 500 },
    );
  }
}
