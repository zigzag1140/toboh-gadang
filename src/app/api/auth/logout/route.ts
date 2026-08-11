import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");

    return NextResponse.json({
      success: true,
      message: "Logout berhasil.",
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memproses logout.",
      },
      { status: 500 }
    );
  }
}
