import { NextResponse } from "next/server";
import { supabaseServer } from "../../../lib/supabase-server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");

  if (!category)
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );

  console.log("Requested category:", category);

  // 1️⃣ Check cache
  const { data: cached, error: cacheError } = await supabaseServer
    .from("news_cache")
    .select("*")
    .eq("category", category)
    .single();

  if (cacheError) console.log("Supabase error:", cacheError);
  if (cached) {
    console.log("Returning cached data:", cached);
    return NextResponse.json({ fromCache: true, ...cached });
  }

  // 2️⃣ Fetch news from your original API
  const newsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${category}`
  );
  const newsData = await newsRes.json();
  console.log("Fetched news from original API:", newsData);

  // 3️⃣ Shorten titles
  const shortenRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/shorten-title`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titles: newsData.titles }),
    }
  );
  const shortenData = await shortenRes.json();

  // 4️⃣ Generate images
  const canvasRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-canvas`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        headlines: shortenData.shortenedTitles,
        images: newsData.images,
        category: category, // MUST include category
      }),
    }
  );
  const canvasData = await canvasRes.json();

  // 5️⃣ Save to Supabase
  const { data, error: upsertError } = await supabaseServer
    .from("news_cache")
    .upsert(
      {
        category,
        titles: newsData.titles,
        descriptions: newsData.descriptions,
        shortened_titles: shortenData.shortenedTitles,
        images: canvasData.images,
      },
      { onConflict: "category" }
    );

  console.log("Upsert data:", data, "Error:", upsertError);

  if (upsertError) console.log("Supabase upsert error:", upsertError);

  // 6️⃣ Return data
  return NextResponse.json({
    fromCache: false,
    titles: newsData.titles,
    descriptions: newsData.descriptions,
    shortened_titles: shortenData.shortenedTitles,
    images: canvasData.images,
  });
}
