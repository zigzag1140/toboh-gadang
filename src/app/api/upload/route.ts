import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_SESSION_TOKEN = "toboh_gadang_admin_auth_valid_session_2026";

// Pastikan API Key ImgBB Anda tetap dipasang di sini!
const IMGBB_API_KEY =
  process.env.IMGBB_API_KEY || "524c5c7d69ba6a66dc6c6c4693a8aced";

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

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File gambar tidak ditemukan." },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "File yang diunggah harus berformat gambar (JPG, PNG, dll).",
        },
        { status: 400 },
      );
    }

    // 1. Ubah file gambar menjadi teks sandi (Base64) agar Next.js tidak mengirim 0 byte
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    // 2. Gunakan FormData bawaan (Multipart) agar aman untuk file gambar yang besar
    const formDataImgBB = new FormData();
    formDataImgBB.append("key", IMGBB_API_KEY);
    formDataImgBB.append("image", base64Image); // Kirim teks sandinya

    // 3. Terbangkan ke ImgBB
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formDataImgBB,
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error?.message || "Gagal upload ke server ImgBB");
    }

    // Kembalikan link URL publik dari ImgBB ke form
    return NextResponse.json({
      success: true,
      message: "Gambar berhasil diunggah ke cloud!",
      url: data.data.url,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengunggah gambar ke server." },
      { status: 500 },
    );
  }
}
