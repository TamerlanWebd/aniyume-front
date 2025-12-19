import { NextRequest, NextResponse } from "next/server";

// 👇 НОВАЯ РАБОЧАЯ ССЫЛКА (добавил /api/v1 в конец)
const BASE_URL = "https://dame-balance-sie-statistics.trycloudflare.com/api/v1";

async function handleProxy(req: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const resolvedParams = await params;
    const pathStr = resolvedParams.path.join("/"); // например "anime" или "auth/login"
    const searchParams = req.nextUrl.search;

    let finalUrl = "";

    // ЛОГИКА МАРШРУТОВ:
    // 1. Авторизация (вход/регистрация) -> /api/v1/auth/...
    if (pathStr.startsWith("auth")) {
        finalUrl = `${BASE_URL}/${pathStr}${searchParams}`;
    } 
    // 2. Всё остальное (аниме, жанры) -> /api/v1/public/...
    else {
        finalUrl = `${BASE_URL}/public/${pathStr}${searchParams}`;
    }

    const options: RequestInit = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    };

    // Передаем тело запроса (для POST)
    if (req.method !== "GET" && req.method !== "HEAD") {
      const body = await req.json();
      options.body = JSON.stringify(body);
    }

    console.log(`📡 [PROXY] ${pathStr} -> ${finalUrl}`);

    const response = await fetch(finalUrl, options);
    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error("🔥 PROXY ERROR:", error);
    return NextResponse.json({ error: "Proxy Error" }, { status: 500 });
  }
}

export { handleProxy as GET, handleProxy as POST };