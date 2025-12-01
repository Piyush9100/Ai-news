import { NextResponse } from "next/server";
import { supabaseServer as supabase } from "../../../lib/supabase-server";

let intervalRunning = false;
let postInterval: NodeJS.Timeout | null = null;

export async function POST(req: Request) {
  const { images, captions } = await req.json();

  // 1️⃣ Insert each image as queued
  for (let i = 0; i < images.length; i++) {
    const cleanUrl = images[i].publicUrl.split("?")[0];
    const caption = captions[i] || "";

    // check if already exists
    const { data: exists } = await supabase
      .from("instagram_posts")
      .select("id")
      .eq("image_url", cleanUrl)
      .maybeSingle();

    if (!exists) {
      await supabase.from("instagram_posts").insert({
        image_url: cleanUrl,
        caption,
        status: "queued",
      });

      console.log("🆕 Added to queue:", cleanUrl);
    } else {
      console.log("⚠️ Duplicate skipped:", cleanUrl);
    }
  }

  // 2️⃣ Start the interval (every 1 hour)
  if (!intervalRunning) {
    intervalRunning = true;
    console.log("⏳ Auto-post interval started...");

    postInterval = setInterval(async () => {
      // Fetch next queued item
      const { data: next } = await supabase
        .from("instagram_posts")
        .select("*")
        .eq("status", "queued")
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (!next) {
        console.log("✔ Queue empty. Stopping interval.");
        clearInterval(postInterval!);
        intervalRunning = false;
        return;
      }

      console.log("📤 Posting:", next.image_url);

      try {
        // Call your existing Instagram posting route
        const res = await fetch("http://localhost:3000/api/post-to-instagram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image: next.image_url,
            caption: next.caption,
          }),
        });

        const data = await res.json();

        if (data.success) {
          await supabase
            .from("instagram_posts")
            .update({
              status: "posted",
              posted_at: new Date().toISOString(),
            })
            .eq("id", next.id);

          console.log("✅ Posted:", next.image_url);
        } else {
          console.log("❌ Instagram API failed, keeping queued.");
        }
      } catch (error) {
        console.error("🚨 Error posting:", error);
      }
    }, 5 * 60 * 1000); // every 5 minutes
  }

  return NextResponse.json({ message: "Images queued successfully" });
}
