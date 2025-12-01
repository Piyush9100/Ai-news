// "use client";

// import { useState } from "react";
// import {
//   Box,
//   Container,
//   TextField,
//   Typography,
//   Button,
//   Alert,
//   CircularProgress,
// } from "@mui/material";

// export default function ContactPage() {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState("");

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatus("");

//     const res = await fetch("/api/contact", {
//       method: "POST",
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     setLoading(false);

//     if (res.ok) setStatus("success");
//     else setStatus("error");
//   };

//   return (
//     <Container maxWidth="sm" sx={{ py: 8 }}>
//       <Typography
//         variant="h4"
//         sx={{
//           color: "#c42a49ff",
//           fontWeight: "bold",
//           mb: 3,
//           textAlign: "center",
//         }}
//       >
//         Contact Us
//       </Typography>

//       {status === "success" && (
//         <Alert severity="success" sx={{ mb: 2 }}>
//           Message sent! We will get back to you soon.
//         </Alert>
//       )}
//       {status === "error" && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           Something went wrong. Try again.
//         </Alert>
//       )}

//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           background: "#1f1f1f",
//           p: 4,
//           borderRadius: 3,
//           boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
//         }}
//       >
//         <TextField
//           name="name"
//           label="Your Name"
//           fullWidth
//           required
//           variant="filled"
//           value={form.name}
//           onChange={handleChange}
//           sx={{ mb: 3 }}
//         />

//         <TextField
//           name="email"
//           label="Your Email"
//           type="email"
//           fullWidth
//           required
//           variant="filled"
//           value={form.email}
//           onChange={handleChange}
//           sx={{ mb: 3 }}
//         />

//         <TextField
//           name="message"
//           label="Message"
//           fullWidth
//           required
//           multiline
//           rows={5}
//           variant="filled"
//           value={form.message}
//           onChange={handleChange}
//           sx={{ mb: 3 }}
//         />

//         <Button
//           type="submit"
//           fullWidth
//           sx={{
//             background: "#c42a49ff",
//             color: "#fff",
//             fontSize: "16px",
//             py: 1.2,
//             "&:hover": { background: "#a71e3cff" },
//           }}
//           disabled={loading}
//         >
//           {loading ? (
//             <CircularProgress size={24} sx={{ color: "#fff" }} />
//           ) : (
//             "Send Message"
//           )}
//         </Button>
//       </Box>
//     </Container>
//   );
// }

"use client";

import { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    });

    await res.json();
    setLoading(false);

    setStatus(res.ok ? "success" : "error");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#c42a49ff",
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
        }}
      >
        Contact Us
      </Typography>

      {status === "success" && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Message sent! We will get back to you soon.
        </Alert>
      )}
      {status === "error" && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Something went wrong. Try again.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          background: "#1b1b1b",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        {/* Name */}
        <TextField
          name="name"
          label="Your Name"
          fullWidth
          required
          variant="filled"
          value={form.name}
          onChange={handleChange}
          sx={{
            mb: 3,
            "& .MuiFilledInput-root": {
              background: "#2a2a2a",
              borderRadius: "6px",
              color: "#fff",
            },
            "& .MuiInputLabel-root": {
              color: "#bbb",
            },
            "& .Mui-focused .MuiInputLabel-root": {
              color: "#c42a49ff",
            },
            "& .MuiFilledInput-underline:before": {
              borderBottom: "1px solid #444",
            },
            "& .MuiFilledInput-underline:after": {
              borderBottom: "2px solid #c42a49ff",
            },
          }}
        />

        {/* Email */}
        <TextField
          name="email"
          label="Your Email"
          type="email"
          fullWidth
          required
          variant="filled"
          value={form.email}
          onChange={handleChange}
          sx={{
            mb: 3,
            "& .MuiFilledInput-root": {
              background: "#2a2a2a",
              borderRadius: "6px",
              color: "#fff",
            },
            "& .MuiInputLabel-root": {
              color: "#bbb",
            },
            "& .Mui-focused .MuiInputLabel-root": {
              color: "#c42a49ff",
            },
            "& .MuiFilledInput-underline:after": {
              borderBottomColor: "#c42a49ff",
            },
          }}
        />

        {/* Message */}
        <TextField
          name="message"
          label="Message"
          fullWidth
          required
          multiline
          rows={5}
          variant="filled"
          value={form.message}
          onChange={handleChange}
          sx={{
            mb: 3,
            "& .MuiFilledInput-root": {
              background: "#2a2a2a",
              borderRadius: "6px",
              color: "#fff",
            },
            "& .MuiInputLabel-root": {
              color: "#bbb",
            },
            "& .Mui-focused .MuiInputLabel-root": {
              color: "#c42a49ff",
            },
            "& .MuiFilledInput-underline:after": {
              borderBottomColor: "#c42a49ff",
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          sx={{
            background: "#c42a49ff",
            color: "#fff",
            fontSize: "16px",
            py: 1.2,
            borderRadius: "6px",
            "&:hover": { background: "#a71e3cff" },
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: "#fff" }} />
          ) : (
            "Send Message"
          )}
        </Button>
      </Box>
    </Container>
  );
}
