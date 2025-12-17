import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://kong-presentations-computers-jar.trycloudflare.com/api/v1/public";

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  try {

    const resolvedParams = await params;
    const pathStr = resolvedParams.path.join("/");
    
    const searchParams = req.nextUrl.search;

    const finalUrl = `${API_URL}/${pathStr}${searchParams}`;
    
    console.log(`🚀 [PROXY] Запрос на: ${finalUrl}`);

    const response = await fetch(finalUrl, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`❌ [PROXY] Ошибка API: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: `API Error: ${response.status}` }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error("🔥 [PROXY] КРИТИЧЕСКАЯ ОШИБКА:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message }, 
      { status: 500 }
    );
  }
}
