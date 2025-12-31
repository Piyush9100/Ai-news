"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import Grid from "@mui/material/Grid";

interface ImageItem {
  publicUrl: string;
}

export default function NewsCardGenerator({ category }: { category: string }) {
  const [titles, setTitles] = useState<string[]>([]);
  const [shortTitles, setShortTitles] = useState<string[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [articles, setArticles] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const res = await fetch(`/api/news-cache?category=${category}`, {
        cache: "no-store",
      });

      const data = await res.json();

      setTitles(data.titles || []);
      setShortTitles(data.shortened_titles || []);
      setImages(data.images || []);
      setArticles(data.articles || []);

      setLoading(false);
    }

    load();
  }, [category]);

  if (loading) {
    return (
      <Typography sx={{ mt: 5, textAlign: "center", color: "gray" }}>
        ⏳ Loading latest news...
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} mt={5}>
      {titles.map((title, idx) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
          <Link
            href={`/view/${category}/${articles[idx]?.slug}`}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography
                  sx={{
                    mb: 2,
                    fontSize: 18,
                    color: "#333",
                  }}
                >
                  {title}
                </Typography>

                {images[idx]?.publicUrl && (
                  <img
                    src={images[idx].publicUrl}
                    alt={shortTitles[idx]}
                    width={400}
                    height={300}
                    style={{ borderRadius: 8, width: "100%" }}
                  />
                )}
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
