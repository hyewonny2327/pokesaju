import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

//유저 정보를 받아서 쿠키에 저장
export async function POST(request: NextRequest) {
  const data = await request.json();

  const cookieStore = await cookies();
  cookieStore.set("userInfo", JSON.stringify(data), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1일 유지
  });

  return NextResponse.json({ ok: true });
}
