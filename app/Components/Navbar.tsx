"use client";

import * as React from "react";
import Image from "next/image";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();
  const pathname = usePathname();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const navItems = [
    { label: "General", path: "/general" },
    { label: "World", path: "/world" },
    { label: "Nation", path: "/nation" },
    { label: "Business", path: "/business" },
    { label: "Technology", path: "/technology" },
    { label: "Entertainment", path: "/entertainment" },
    { label: "Sports", path: "/sports" },
    { label: "Science", path: "/science" },
    { label: "Health", path: "/health" },
  ];

  const logourl = `/news-24x7.png`;

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#121212",
          color: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1 }}>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                gap: 8,
              }}
            >
              <Image
                src={logourl}
                alt="iNews"
                width={155}
                height={155}
                style={{
                  cursor: "pointer",
                  marginTop: 20,
                }}
                priority
              />
            </Link>
          </Box>

          {/* Desktop Menu */}
          {!isMobile ? (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.path);

                return (
                  <Button
                    key={item.label}
                    href={item.path}
                    sx={{
                      color: isActive ? "#c42a49ff" : "#fff",
                      fontWeight: isActive ? 700 : 500,
                      borderBottom: isActive
                        ? "2px solid #c42a49ff"
                        : "2px solid transparent",
                      borderRadius: 0,
                      "&:hover": { color: "#c42a49ff" },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          ) : (
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            backgroundColor: "#121212",
            height: "100%",
            color: "#fff",
          }}
          role="presentation"
          onClick={toggleDrawer}
        >
          <List>
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.path);

              return (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    component="a"
                    href={item.path}
                    sx={{
                      backgroundColor: isActive ? "#1e1e1e" : "transparent",
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      sx={{
                        color: isActive ? "#c42a49ff" : "#fff",
                        fontWeight: isActive ? 700 : 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
