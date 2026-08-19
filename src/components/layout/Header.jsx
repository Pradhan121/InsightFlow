"use client";

import React from "react";
import {
  Search,
  Menu,
  Moon,
  Bell,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: "246px",
        right: 0,
        height: "70px",

        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",

        display: "flex",
        alignItems: "center",

        padding: "0 28px",

        zIndex: 900,
      }}
    >
      {/* ================= LEFT ================= */}

      <button
        style={{
          width: "40px",
          height: "40px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          border: "none",
          background: "transparent",

          cursor: "pointer",
        }}
      >
        <Menu
          size={23}
          strokeWidth={2}
          color="#334155"
        />
      </button>

      {/* ================= CENTER SEARCH ================= */}

      <div
        style={{
          position: "absolute",

          left: "50%",
          transform: "translateX(-50%)",

          width: "400px",
          height: "42px",

          border: "1px solid #dbe1ea",
          borderRadius: "9px",

          display: "flex",
          alignItems: "center",

          padding: "0 14px",

          background: "#ffffff",
        }}
      >
        <Search
          size={19}
          color="#64748b"
          strokeWidth={2}
        />

        <input
          type="text"
          placeholder="Search here..."
          style={{
            width: "100%",

            border: "none",
            outline: "none",

            marginLeft: "10px",

            fontSize: "14px",
            color: "#334155",

            background: "transparent",
          }}
        />
      </div>

      {/* ================= RIGHT ================= */}

      <div
        style={{
          marginLeft: "auto",

          display: "flex",
          alignItems: "center",

          gap: "22px",
        }}
      >
        {/* Dark Mode */}

        <button
          style={{
            width: "38px",
            height: "38px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            border: "none",
            background: "transparent",

            cursor: "pointer",
          }}
        >
          <Moon
            size={21}
            color="#334155"
            strokeWidth={2}
          />
        </button>

        {/* Notification */}

        <div
          style={{
            position: "relative",

            width: "38px",
            height: "38px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            cursor: "pointer",
          }}
        >
          <Bell
            size={21}
            color="#334155"
            strokeWidth={2}
          />

          <span
            style={{
              position: "absolute",

              top: "1px",
              right: "2px",

              width: "16px",
              height: "16px",

              borderRadius: "50%",

              background: "#ef4444",
              color: "#fff",

              fontSize: "9px",
              fontWeight: 700,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              border: "2px solid #fff",
            }}
          >
            3
          </span>
        </div>

        {/* Divider */}

        <div
          style={{
            width: "1px",
            height: "35px",
            background: "#e5e7eb",
          }}
        />

        {/* Profile */}

        <div
          style={{
            display: "flex",
            alignItems: "center",

            gap: "10px",

            cursor: "pointer",
          }}
        >
          {/* Avatar */}

          <div
            style={{
              width: "40px",
              height: "40px",

              borderRadius: "50%",

              background: "#e8edf5",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: "#3155f5",

              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            DP
          </div>

          {/* User Info */}

          <div
            style={{
              minWidth: "100px",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              Darshan Patel
            </div>

            <div
              style={{
                marginTop: "3px",

                fontSize: "11px",
                color: "#64748b",
              }}
            >
              Admin
            </div>
          </div>

          <ChevronDown
            size={17}
            color="#475569"
          />
        </div>
      </div>
    </header>
  );
}