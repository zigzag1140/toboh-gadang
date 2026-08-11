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

export async function GET() {
  try {
    const umkmList = await prisma.umkm.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: umkmList });
  } catch (err) {
    console.error("Error fetching UMKM:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data UMKM." },
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
          message:
            "Akses ditolak. Anda harus login sebagai admin untuk menambah UMKM.",
        },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { nama, pemilik, deskripsi, harga, kategori, whatsapp, gambar } =
      body;

    if (!nama || !pemilik || !deskripsi || !harga || !kategori || !whatsapp) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Mohon lengkapi seluruh data wajib UMKM (Nama, Pemilik, Deskripsi, Harga, Kategori, Nomor WhatsApp).",
        },
        { status: 400 },
      );
    }

    const gradient = getGradientForCategory(kategori);

    const newUmkm = await prisma.umkm.create({
      data: {
        nama,
        pemilik,
        deskripsi,
        harga,
        kategori,
        whatsapp,
        gambar: gambar || "",
        gradient,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data UMKM berhasil ditambahkan!",
      data: newUmkm,
    });
  } catch (err) {
    console.error("Error creating UMKM:", err);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server saat menyimpan data UMKM.",
      },
      { status: 500 },
    );
  }
}
