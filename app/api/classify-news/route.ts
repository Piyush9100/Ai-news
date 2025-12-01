import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { articles } = await req.json();

  const results = await Promise.all(
    articles.map(async (article: { title: any; description: any }) => {
      const prompt = `
Classify the following news article into one of these categories:
[AI, Business, Technology, Startups, Environment, Gaming, Health, Other]

Title: ${article.title}
Description: ${article.description}

Respond with only the category name.
      `;

      const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await res.json();
      const category = data?.choices?.[0]?.message?.content?.trim() || "Other";

      return {
        ...article,
        category,
      };
    })
  );

  return NextResponse.json({ classifiedArticles: results });
}
