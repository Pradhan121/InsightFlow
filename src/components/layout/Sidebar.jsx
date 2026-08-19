"use client";

import React from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Grid2X2,
  Settings,
  User,
  LogOut,
  Box,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Users",
    icon: Users,
    path: "/users",
  },
  {
    name: "Products",
    icon: Package,
    path: "/products",
  },
  {
    name: "Orders",
    icon: ShoppingCart,
    path: "/orders",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    name: "Categories",
    icon: Grid2X2,
    path: "/categories",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
  {
    name: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <aside
      style={{
        width: "246px",
        minWidth: "246px",
        height: "100vh",
        background: "#07152d",
        color: "#fff",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
        overflow: "hidden",
      }}
    >
      {/* ================= LOGO ================= */}

      <div
        style={{
          height: "72px",
          minHeight: "72px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "0 28px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "#3155f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box size={23} strokeWidth={2.5} />
        </div>

        <span
          style={{
            fontSize: "23px",
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          AdminPro
        </span>
      </div>

      {/* ================= MENU AREA ================= */}

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: "18px 15px 10px",
          scrollbarWidth: "none",
        }}
      >
        <nav>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.path;

            return (
              <div
                key={item.name}
                onClick={() => router.push(item.path)}
                style={{
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  padding: "0 17px",
                  marginBottom: "5px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: active
                    ? "#3155f5"
                    : "transparent",
                  color: "#fff",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background =
                      "transparent";
                  }
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={2}
                />

                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {item.name}
                </span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* ================= BOTTOM SECTION ================= */}

      <div
        style={{
          flexShrink: 0,
          padding: "8px 15px 16px",
          borderTop:
            "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logout */}

        <div
          onClick={handleLogout}
          style={{
            height: "46px",
            display: "flex",
            alignItems: "center",
            gap: "18px",
            padding: "0 17px",
            borderRadius: "10px",
            cursor: "pointer",
            color: "#fff",
            transition: "all 0.2s ease",
            marginBottom: "10px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "rgba(255,255,255,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "transparent";
          }}
        >
          <LogOut size={22} strokeWidth={2} />

          <span
            style={{
              fontSize: "15px",
              fontWeight: 500,
            }}
          >
            Logout
          </span>
        </div>

        {/* Admin Panel */}

        <div
          style={{
            padding: "12px",
            borderRadius: "10px",
            background:
              "rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              minWidth: "40px",
              borderRadius: "10px",
              background: "#3155f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box size={21} />
          </div>

          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              Admin Panel
            </div>

            <div
              style={{
                fontSize: "11px",
                color: "#94a3b8",
                marginTop: "3px",
              }}
            >
              Version 1.0.0
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}