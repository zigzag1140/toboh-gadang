import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { getTagColorForCategory } from "@/lib/beritaStorage";

// --- Setup Adapter Khusus Prisma 7 ---
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
// -------------------------------------

const ADMIN_SESSION_TOKEN = "toboh_gadang_admin_auth_valid_session_2026";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const beritaList = await prisma.berita.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json({ success: true, data: beritaList });
  } catch (err) {
    console.error("Error fetching berita:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data berita." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          message: "Akses ditolak. Anda harus login sebagai admin.",
        },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { judul, ringkasan, konten, kategori, gambar, tanggal, readTime } =
      body;

    if (!judul || !ringkasan || !konten || !kategori) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Mohon lengkapi judul, ringkasan, konten, dan kategori berita.",
        },
        { status: 400 },
      );
    }

    const formattedDate =
      tanggal ||
      new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

    const calculatedReadTime =
      readTime ||
      `${Math.max(1, Math.ceil(konten.split(" ").length / 180))} menit baca`;
    const tagColor = getTagColorForCategory(kategori);

    const newBerita = await prisma.berita.create({
      data: {
        judul,
        ringkasan,
        konten,
        kategori,
        gambar: gambar || "",
        tanggal: formattedDate,
        readTime: calculatedReadTime,
        tagColor,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dipublikasikan!",
      data: newBerita,
    });
  } catch (err) {
    console.error("Error creating berita:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server saat menyimpan berita.",
      },
      { status: 500 },
    );
  }
}
