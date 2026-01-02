import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "http://164.90.185.95/api/v1";

export async function handleProxy(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path } = await params;
    const pathStr = path.join("/");
    const searchParams = req.nextUrl.search;

    const privateKeywords = [
      "status",
      "profile",
      "favorites",
      "watch-history",
      "ratings",
      "bookmarks",
      "statistics",
      "auth",
      "studios",
      "comments",
      "my-anime-list",
    ];

    const isPrivate = privateKeywords.some((keyword) =>
      pathStr.includes(keyword)
    );

    const finalUrl = isPrivate
      ? `${BASE_URL}/${pathStr}${searchParams}`
      : `${BASE_URL}/public/${pathStr}${searchParams}`;

    let token = req.headers.get("authorization") || "";
    if (token && !token.startsWith("Bearer ")) {
      token = `Bearer ${token}`;
    }

    const contentType = req.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");

    if (isMultipart) {
      const upstreamHeaders = new Headers(req.headers);
      if (token) upstreamHeaders.set("Authorization", token);
      upstreamHeaders.delete("host");

      const upstreamReq = new Request(finalUrl, {
        method: req.method,
        headers: upstreamHeaders,
        body: req.body,
        // @ts-ignore
        duplex: "half",
      });

      const response = await fetch(upstreamReq);
      const text = await response.text();

      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text };
      }

      return NextResponse.json(data, { status: response.status });
    }

    const headers: Record<string, string> = {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(token ? { Authorization: token } : {}),
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      headers["Content-Type"] = "application/json";
    }

    const options: RequestInit = {
      method: req.method,
      headers,
      cache: "no-store",
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      const body = await req.text();
      if (body) options.body = body;
    }

    const response = await fetch(finalUrl, options);
    const text = await response.text();

    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Proxy Error",
        details:
          error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export {
  handleProxy as GET,
  handleProxy as POST,
  handleProxy as PATCH,
  handleProxy as DELETE,
  handleProxy as PUT,
};
