"use client";

import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F7F9FC",
      }}
    >
      {/* ================= SIDEBAR ================= */}

      <Sidebar />

      {/* ================= MAIN AREA ================= */}

      <Box
        sx={{
          marginLeft: {
            xs: 0,
            md: "246px",
          },

          minHeight: "100vh",

          backgroundColor: "#F7F9FC",
        }}
      >
        {/* ================= HEADER ================= */}

        <Header />

        {/* ================= PAGE CONTENT ================= */}

        <Box
          component="main"
          sx={{
            minHeight: "100vh",

            paddingTop: {
              xs: "70px",
              md: "70px",
            },

            paddingLeft: {
              xs: 2,
              md: "28px",
            },

            paddingRight: {
              xs: 2,
              md: "28px",
            },

            paddingBottom: {
              xs: 2,
              md: "28px",
            },

            backgroundColor: "#F7F9FC",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}