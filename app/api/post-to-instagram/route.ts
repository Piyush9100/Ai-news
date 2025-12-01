import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { image, caption } = await req.json();

    const IG_USER_ID = process.env.INSTAGRAM_BUSINESS_ID!;
    const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN!;

    const uploadRes = await fetch(
      `https://graph.facebook.com/v21.0/${IG_USER_ID}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: image,
          caption: caption || "",
          access_token: ACCESS_TOKEN,
        }),
      }
    );

    const uploadData = await uploadRes.json();
    console.log("Instagram upload response:", uploadData);
    if (!uploadData.id) throw new Error("Upload failed");

    // 2️⃣ Publish the uploaded image
    const publishRes = await fetch(
      `https://graph.facebook.com/v21.0/${IG_USER_ID}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: uploadData.id,
          access_token: ACCESS_TOKEN,
        }),
      }
    );

    const publishData = await publishRes.json();

    return NextResponse.json({
      success: true,
      result: publishData,
    });
  } catch (err) {
    console.error("Instagram upload error:", err);
    return NextResponse.json(
      { error: "Failed to post to Instagram" },
      { status: 500 }
    );
  }
}
