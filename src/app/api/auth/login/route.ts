import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "nagari2026";
const ADMIN_SESSION_TOKEN = "toboh_gadang_admin_auth_valid_session_2026";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("admin_session", ADMIN_SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({
        success: true,
        message: "Login admin berhasil.",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Username atau password salah. Silakan coba lagi.",
      },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server saat proses login.",
      },
      { status: 500 }
    );
  }
}
