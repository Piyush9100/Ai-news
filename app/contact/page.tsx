"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setShowSnackbar(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#c42a49",
          fontWeight: "bold",
          mb: 4,
          textAlign: "center",
        }}
      >
        Contact Us
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          label="Your Name *"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          slotProps={{
            input: {
              sx: {
                backgroundColor: "#1b1b1b",
                color: "#fff",
                borderRadius: 1,
                px: 1.5,
                py: 1,
              },
            },
            inputLabel: {
              sx: {
                color: "#b3b3b3",
              },
            },
          }}
        />

        <TextField
          label="Your Email *"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          slotProps={{
            input: {
              sx: {
                backgroundColor: "#1b1b1b",
                color: "#fff",
                borderRadius: 1,
                px: 1.5,
                py: 1,
              },
            },
            inputLabel: { sx: { color: "#b3b3b3" } },
          }}
        />

        <TextField
          label="Message *"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          fullWidth
          multiline
          rows={6}
          slotProps={{
            input: {
              sx: {
                backgroundColor: "#1b1b1b",
                color: "#fff",
                borderRadius: 1,
                px: 1.5,
                py: 1,
              },
            },
            inputLabel: { sx: { color: "#b3b3b3" } },
          }}
        />

        <Button
          type="submit"
          disabled={isLoading}
          sx={{ py: 1.5, backgroundColor: "#c42a49", color: "white" }}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "SEND MESSAGE"
          )}
        </Button>
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Message sent! We will get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
}
