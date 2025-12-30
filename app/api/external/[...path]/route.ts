import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "http://164.90.185.95/api/v1";

async function handleProxy(req: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const resolvedParams = await params;
    const pathStr = resolvedParams.path.join("/");
    const searchParams = req.nextUrl.search;


    const isPrivate = 
      pathStr.includes("auth") || 
      pathStr.includes("profile") || 
      pathStr.includes("favorites") || 
      pathStr.includes("watch-history") || 
      pathStr.includes("ratings") || 
      pathStr.includes("statistics") || 
      pathStr.includes("user-status") || 
      pathStr.includes("status") || 
      pathStr.includes("episodes-watched");

    const finalUrl = isPrivate 
      ? `${BASE_URL}/${pathStr}${searchParams}` 
      : `${BASE_URL}/public/${pathStr}${searchParams}`;

    console.log(`[PROXY] ${req.method} -> ${finalUrl}`);

    const token = req.headers.get("authorization");

    const options: RequestInit = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(token ? { "Authorization": token } : {}),
      },
      cache: "no-store",
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      try {
        const body = await req.clone().json();
        options.body = JSON.stringify(body);
      } catch (e) {
      }
    }

    const response = await fetch(finalUrl, options);
    

    if (response.status === 500) {
        console.error(`[BACKEND ERROR 500] на урл: ${finalUrl}`);
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });

  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Proxy Error" }, { status: 500 });
  }
}

export { handleProxy as GET, handleProxy as POST, handleProxy as PATCH, handleProxy as DELETE, handleProxy as PUT };