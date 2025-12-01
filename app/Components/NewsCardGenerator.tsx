"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import Grid from "@mui/material/Grid";

interface ImageItem {
  localUrl: string;
  publicUrl: string;
}

export default function NewsCardGenerator({
  category,
  autoPost = false,
}: {
  category: string;
  autoPost?: boolean;
}) {
  const [originalTitles, setOriginalTitles] = useState<string[]>([]);
  const [shortenedTitles, setShortenedTitles] = useState<string[]>([]);
  const [images, setImages] = useState<ImageItem[]>([]);

  const [loadingTitles, setLoadingTitles] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    async function load() {
      setLoadingTitles(true);

      console.log("Fetching news for category:", category);

      const res = await fetch(`/api/news-cache?category=${category}`);
      const data = await res.json();

      console.log("data from /api/news-cache:", data);

      setOriginalTitles(data.titles || []);
      setShortenedTitles(data.shortened_titles || data.shortenedTitles || []);
      setImages(data.images || []);

      setLoadingTitles(false);
      setLoadingImages(false);

      if (autoPost && data.images?.length) {
        await fetch("/api/auto-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            images: data.images,
            captions: data.descriptions,
          }),
        });
      }
    }

    load();
  }, [category]);
  console.log("Category:", category);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {loadingTitles ? (
        <Typography
          variant="h6"
          sx={{ mt: 5, textAlign: "center", color: "gray" }}
        >
          ⏳ Loading latest news...
        </Typography>
      ) : originalTitles.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ mt: 5, textAlign: "center", color: "gray" }}
        >
          ❌ No news available
        </Typography>
      ) : (
        <Grid container spacing={3} mt={5}>
          {originalTitles.map((title, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
              <Link
                href={`/view/${category}/${idx}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    cursor: "pointer",
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {title}
                    </Typography>

                    {images[idx] ? (
                      <img
                        src={images[idx].publicUrl}
                        alt={shortenedTitles[idx]}
                        width={400}
                        height={300}
                        style={{ borderRadius: 8 }}
                      />
                    ) : (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mt: 2 }}
                      >
                        ⏳ Generating image...
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
