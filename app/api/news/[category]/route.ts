import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await context.params;

    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&country=in&lang=en&max=10&apikey=${process.env.GNEWS_API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch news");

    const data = await res.json();

    return NextResponse.json({
      articles: data.articles,
      titles: data.articles.map((a: any) => a.title),
      descriptions: data.articles.map((a: any) => a.description),
      images: data.articles.map((a: any) => a.image),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
