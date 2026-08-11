import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const ADMIN_SESSION_TOKEN = "toboh_gadang_admin_auth_valid_session_2026";
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;

    if (session !== ADMIN_SESSION_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Anda harus login sebagai admin." },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File gambar tidak ditemukan." },
        { status: 400 }
      );
    }

    // Pastikan tipe file adalah gambar
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "File yang diunggah harus berformat gambar (JPG, PNG, WebP, dll)." },
        { status: 400 }
      );
    }

    // Pastikan folder uploads ada
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Generate nama file unik & aman
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFileName = `${Date.now()}-${sanitizedName}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFileName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      message: "Gambar berhasil diunggah!",
      url: publicUrl,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengunggah gambar ke server." },
      { status: 500 }
    );
  }
}
