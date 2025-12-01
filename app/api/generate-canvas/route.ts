import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { supabaseServer } from "../../../lib/supabase-server";

export async function POST(req: Request) {
  try {
    const { headlines, images, category } = await req.json();

    if (!headlines || !Array.isArray(headlines)) {
      return NextResponse.json(
        { error: "Headlines array is required" },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    const safeCategory = category.replace(/\s+/g, "-").toLowerCase();

    // 1️⃣ Check Supabase cache for existing images
    const { data: cached } = await supabaseServer
      .from("news_cache")
      .select("images")
      .eq("category", category)
      .maybeSingle();

    if (cached && cached.images && cached.images.length > 0) {
      console.log("Returning cached images for category:", category);
      return NextResponse.json({ images: cached.images, fromCache: true });
    }

    // 2️⃣ Launch Puppeteer
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const generatedImages: { publicUrl: string }[] = [];

    for (let i = 0; i < headlines.length; i++) {
      const headline = headlines[i];
      const imageUrl =
        images?.[i] || `${process.env.NEXT_PUBLIC_BASE_URL}/blackbg.png`;

      const page = await browser.newPage();

      const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /></head><body style="margin:0;padding:0;"><div style="width:1015px;height:1350px;display:flex;flex-direction:column;position:relative;overflow:hidden;"><div style="height:70%;background:url('${imageUrl}') center/cover no-repeat;"></div><div style="position:absolute;top:calc(70% - 65px);left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:10px;background:#fff;padding:10px 28px;border-radius:60px;box-shadow:0 6px 20px rgba(0,0,0,0.15);"><div style="font-size:70px;font-weight:900;color:#e41e26;font-family:Arial, sans-serif;text-transform:uppercase;">News</div><img src="${process.env.NEXT_PUBLIC_BASE_URL}/logo.jpg" style="width:105px;height:105px;object-fit:cover;background:#fff;border:4px solid #fff;" /></div><h1 style="font-size:70px;text-align:center;margin-top:80px;padding:0 40px;margin-bottom:30px;font-family:Arial, sans-serif;">${headline}</h1></div></body></html>`;

      await page.setContent(html);
      await page.setViewport({ width: 1015, height: 1350 });

      // Screenshot
      const buffer = await page.screenshot({ type: "png" });
      await page.close();

      // 3️⃣ Upload to Supabase storage with unique name
      const fileName = `headline-${safeCategory}-${i}-${Date.now()}.png`;

      const upload = await supabaseServer.storage
        .from("news-images")
        .upload(fileName, buffer, { contentType: "image/png", upsert: false });

      if (upload.error) {
        console.error("Upload error:", upload.error);
        continue;
      }

      // 4️⃣ Get public URL
      const { data: publicUrlData } = supabaseServer.storage
        .from("news-images")
        .getPublicUrl(fileName);

      console.log(`Uploaded ${fileName} -> ${publicUrlData.publicUrl}`);

      generatedImages.push({ publicUrl: publicUrlData.publicUrl });
    }

    await browser.close();

    // 5️⃣ Save generated images to Supabase cache table
    const { error: upsertError } = await supabaseServer
      .from("news_cache")
      .upsert(
        {
          category,
          images: generatedImages,
        },
        { onConflict: "category" }
      );

    if (upsertError) console.error("Supabase upsert error:", upsertError);

    return NextResponse.json({ images: generatedImages, fromCache: false });
  } catch (err) {
    console.error("Puppeteer error:", err);
    return NextResponse.json(
      { error: "Failed to generate images" },
      { status: 500 }
    );
  }
}
