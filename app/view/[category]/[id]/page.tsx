"use client";

import { use, useEffect, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface ViewParams {
  category: string;
  id: string;
}

export default function ViewPage({ params }: { params: Promise<ViewParams> }) {
  const { category, id } = use(params);
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`/api/news/${category}`);
      const data = await res.json();

      setArticle(data.articles[Number(id)]);
    };

    fetchDetails();
  }, [category, id]);

  if (!article)
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
        ⏳ Loading details...
      </Typography>
    );

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 5,
        px: 2,
      }}
    >
      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 2, lineHeight: 1.3 }}
          >
            {article.title}
          </Typography>

          {/* Image */}
          {article.image && (
            <Box
              component="img"
              src={article.image}
              alt="news"
              sx={{
                width: "100%",
                borderRadius: 2,
                objectFit: "cover",
                maxHeight: 350,
                mb: 3,
              }}
            />
          )}

          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
            {article.description}
          </Typography>

          <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
            <b>Source:</b> {article.source?.name || "Unknown"}
          </Typography>

          <Typography variant="body2" sx={{ color: "gray", mb: 3 }}>
            <b>Published:</b> {new Date(article.publishedAt).toLocaleString()}
          </Typography>

          <a
            href={article.url}
            target="_blank"
            style={{
              color: "#1976d2",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Read Full Article →
          </a>
        </CardContent>
      </Card>
    </Box>
  );
}
