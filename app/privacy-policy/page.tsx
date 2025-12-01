"use client";

import { Container, Typography, Box } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        sx={{
          color: "#c42a49ff",
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
        }}
      >
        Privacy Policy
      </Typography>

      <Box
        sx={{
          background: "#1f1f1f",
          color: "#ccc",
          p: 4,
          borderRadius: 3,
          lineHeight: 1.8,
        }}
      >
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper,
          lorem a pulvinar faucibus, ante ipsum faucibus velit, vitae tincidunt
          eros urna non risus. Curabitur sit amet leo quis tellus pretium
          porttitor. Suspendisse bibendum risus ut mi gravida, vel cursus justo
          luctus. Vivamus non aliquet nisl, nec varius lorem. Nullam lacinia
          tortor non sem fermentum, eget varius massa fermentum.
          <br />
          <br />
          Nulla facilisi. Suspendisse egestas est id orci imperdiet, et
          elementum arcu fermentum. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Sed ac interdum leo,
          sit amet elementum ipsum. Cras eget sagittis lorem.
        </Typography>
      </Box>
    </Container>
  );
}
