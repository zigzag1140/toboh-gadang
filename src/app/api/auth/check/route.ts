import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_SESSION_TOKEN = "toboh_gadang_admin_auth_valid_session_2026";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;

  if (session === ADMIN_SESSION_TOKEN) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
