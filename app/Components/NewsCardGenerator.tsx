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

  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function load() {
      setLoading(true);

      const res = await fetch(`/api/news-cache?category=${category}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (lastUpdated === data.updated_at) return;

      setTitles(data.titles || []);
      setShortTitles(data.shortened_titles || []);
      setImages(data.images || []);
      setArticles(data.articles || []);

      setLoading(false);
    }

    load();

    interval = setInterval(load, 60_000);

    return () => clearInterval(interval);
  }, [category, lastUpdated]);

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
            <Card>
              <CardContent>
                <Typography variant="body2">{title}</Typography>

                {images[idx]?.publicUrl && (
                  <img
                    src={images[idx].publicUrl}
                    alt={shortTitles[idx]}
                    width={400}
                    height={300}
                    style={{ borderRadius: 8 }}
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
