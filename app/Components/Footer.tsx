"use client";

import * as React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  const logourl = `/logo.jpg`;

  const links = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#121212",
        color: "#fff",
        mt: 8,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
              <Link
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#c42a49ff", fontWeight: "bold" }}
                >
                  News
                </Typography>

                <img
                  src={logourl}
                  alt="News 24"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    marginLeft: 8,
                    cursor: "pointer",
                  }}
                />
              </Link>
            </Box>
            <Typography variant="body2" color="gray">
              Your daily AI-powered news hub for the latest in tech, startups,
              and innovation.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, fontWeight: "bold", color: "#c42a49ff" }}
            >
              Quick Links
            </Typography>
            {links.map((item) => (
              <Typography key={item.label} variant="body2" sx={{ mb: 1 }}>
                <Link
                  href={item.href}
                  color="inherit"
                  underline="none"
                  sx={{
                    "&:hover": { color: "#c42a49ff" },
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.label}
                </Link>
              </Typography>
            ))}
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, fontWeight: "bold", color: "#c42a49ff" }}
            >
              Follow Us
            </Typography>
            <Box>
              <IconButton
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/testmax12089/"
                sx={{ color: "#fff", "&:hover": { color: "#c42a49ff" } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="#"
                sx={{ color: "#fff", "&:hover": { color: "#c42a49ff" } }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                target="_blank"
                rel="noopener noreferrer"
                href="#"
                sx={{ color: "#fff", "&:hover": { color: "#c42a49ff" } }}
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            textAlign: "center",
            borderTop: "1px solid #333",
            mt: 5,
            pt: 2,
            color: "gray",
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()}{" "}
            <span style={{ color: "#c42a49ff" }}>News 24*7</span> — All Rights
            Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
