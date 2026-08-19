"use client";

import React from "react";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  ChevronDown,
} from "lucide-react";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const stats = [
  {
    title: "Total Users",
    value: "1,245",
    growth: "+12.5%",
    color: "#60a5fa",
    bg: "#dbeafe",
    icon: Users,
  },
  {
    title: "Total Products",
    value: "3,456",
    growth: "+8.3%",
    color: "#22c55e",
    bg: "#dcfce7",
    icon: Package,
  },
  {
    title: "Total Orders",
    value: "2,345",
    growth: "+15.2%",
    color: "#f59e0b",
    bg: "#fef3c7",
    icon: ShoppingCart,
  },
  {
    title: "Total Revenue",
    value: "$45,678",
    growth: "+10.4%",
    color: "#8b5cf6",
    bg: "#ede9fe",
    icon: DollarSign,
  },
];

const orders = [
  {
    id: "#ORD1234",
    name: "John Doe",
    amount: "$250.00",
    status: "Paid",
    avatar: "JD",
  },
  {
    id: "#ORD1235",
    name: "Jane Smith",
    amount: "$150.00",
    status: "Pending",
    avatar: "JS",
  },
  {
    id: "#ORD1236",
    name: "Robert Brown",
    amount: "$320.00",
    status: "Paid",
    avatar: "RB",
  },
  {
    id: "#ORD1237",
    name: "Emily Davis",
    amount: "$180.00",
    status: "Cancelled",
    avatar: "ED",
  },
  {
    id: "#ORD1238",
    name: "Michael Lee",
    amount: "$210.00",
    status: "Paid",
    avatar: "ML",
  },
];

const users = [
  {
    name: "Darshan Patel",
    email: "darshan@gmail.com",
    role: "Admin",
    status: "Active",
    joined: "01 May 2024",
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    role: "User",
    status: "Active",
    joined: "02 May 2024",
  },
  {
    name: "Jane Smith",
    email: "jane@gmail.com",
    role: "User",
    status: "Inactive",
    joined: "03 May 2024",
  },
  {
    name: "Robert Brown",
    email: "robert@gmail.com",
    role: "User",
    status: "Active",
    joined: "04 May 2024",
  },
  {
    name: "Emily Davis",
    email: "emily@gmail.com",
    role: "User",
    status: "Active",
    joined: "05 May 2024",
  },
];

const products = [
  {
    name: "iPhone 14 Pro",
    price: "$999.00",
    stock: 120,
    sold: 98,
    progress: "82%",
    emoji: "📱",
  },
  {
    name: "MacBook Air",
    price: "$1,199.00",
    stock: 80,
    sold: 65,
    progress: "81%",
    emoji: "💻",
  },
  {
    name: "AirPods Pro",
    price: "$249.00",
    stock: 150,
    sold: 120,
    progress: "80%",
    emoji: "🎧",
  },
  {
    name: "Apple Watch",
    price: "$399.00",
    stock: 100,
    sold: 75,
    progress: "75%",
    emoji: "⌚",
  },
  {
    name: "iPad Air",
    price: "$599.00",
    stock: 90,
    sold: 60,
    progress: "67%",
    emoji: "📱",
  },
];

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <Header />

      <main
        style={{
          marginLeft: "246px",
          paddingTop: "70px",
          minHeight: "100vh",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            padding: "25px 28px 35px",
          }}
        >
          {/* Page heading */}
          <div style={{ marginBottom: "25px" }}>
            <h1
              style={{
                margin: 0,
                fontSize: "26px",
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Dashboard
            </h1>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "7px",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#2563eb" }}>
                Home
              </span>

              <span style={{ color: "#94a3b8" }}>
                /
              </span>

              <span style={{ color: "#64748b" }}>
                Dashboard
              </span>
            </div>
          </div>

          {/* Statistics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
              gap: "22px",
              marginBottom: "22px",
            }}
          >
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    padding: "22px",
                    minHeight: "115px",
                    display: "flex",
                    alignItems: "center",
                    boxShadow:
                      "0 3px 15px rgba(15,23,42,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "13px",
                      background: item.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      size={32}
                      color={item.color}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div style={{ marginLeft: "17px" }}>
                    <div
                      style={{
                        color: "#64748b",
                        fontSize: "13px",
                        marginBottom: "5px",
                      }}
                    >
                      {item.title}
                    </div>

                    <div
                      style={{
                        fontSize: "25px",
                        fontWeight: 700,
                        color: "#0f172a",
                        lineHeight: 1.1,
                      }}
                    >
                      {item.value}
                    </div>

                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "12px",
                      }}
                    >
                      <span
                        style={{
                          color: "#16a34a",
                          fontWeight: 600,
                        }}
                      >
                        ↑ {item.growth}
                      </span>

                      <span
                        style={{
                          color: "#94a3b8",
                          marginLeft: "5px",
                        }}
                      >
                        from last month
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chart + Orders */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "22px",
              width:"100%",
              alignItems:'stretch',
              marginBottom: "22px",
            }}
          >
            {/* Sales */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow:
                  "0 3px 15px rgba(15,23,42,0.05)",
                minHeight:'350px',
                boxSizing:'border-box'
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "17px",
                    color: "#0f172a",
                  }}
                >
                  Sales Overview
                </h2>

                <button
                  style={{
                    height: "35px",
                    padding: "0 13px",
                    background: "#fff",
                    border: "1px solid #dbe1ea",
                    borderRadius: "7px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  This Month
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Chart */}
              <div
                style={{
                  height: "235px",
                  position: "relative",
                }}
              >
                {/* Grid */}
                {[0, 1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    style={{
                      position: "absolute",
                      left: "40px",
                      right: "8px",
                      top: `${item * 25}%`,
                      borderTop:
                        "1px dashed #dbe1ea",
                    }}
                  />
                ))}

                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    color: "#64748b",
                  }}
                >
                  <span>50K</span>
                  <span>40K</span>
                  <span>30K</span>
                  <span>20K</span>
                  <span>10K</span>
                  <span>0</span>
                </div>

                <svg
                  viewBox="0 0 700 240"
                  preserveAspectRatio="none"
                  style={{
                    position: "absolute",
                    left: "40px",
                    right: 0,
                    width: "calc(100% - 40px)",
                    height: "100%",
                  }}
                >
                  <defs>
                    <linearGradient
                      id="areaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopOpacity="0.22"
                      />
                      <stop
                        offset="100%"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="
                    M0 205
                    C35 175, 45 185, 75 190
                    C105 200, 120 155, 145 150
                    C175 145, 180 180, 215 165
                    C245 150, 250 120, 280 125
                    C310 130, 320 165, 350 145
                    C380 125, 395 70, 425 75
                    C455 80, 465 105, 490 125
                    C520 145, 535 65, 565 55
                    C595 45, 600 90, 625 105
                    C650 120, 675 75, 700 25
                    L700 240
                    L0 240
                    Z
                    "
                    fill="url(#areaGradient)"
                  />

                  <path
                    d="
                    M0 205
                    C35 175, 45 185, 75 190
                    C105 200, 120 155, 145 150
                    C175 145, 180 180, 215 165
                    C245 150, 250 120, 280 125
                    C310 130, 320 165, 350 145
                    C380 125, 395 70, 425 75
                    C455 80, 465 105, 490 125
                    C520 145, 535 65, 565 55
                    C595 45, 600 90, 625 105
                    C650 120, 675 75, 700 25
                    "
                    fill="none"
                    stroke="#4965f5"
                    strokeWidth="3"
                  />

                  <circle
                    cx="700"
                    cy="25"
                    r="5"
                    fill="#4965f5"
                  />
                </svg>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "40px",
                  fontSize: "11px",
                  color: "#64748b",
                }}
              >
                <span>01 May</span>
                <span>06 May</span>
                <span>11 May</span>
                <span>16 May</span>
                <span>21 May</span>
                <span>26 May</span>
                <span>31 May</span>
              </div>
            </div>

            {/* Recent Orders */}
          {/* Recent Orders */}
<div
  style={{
    background: "#ffffff",
    borderRadius: "12px",
    padding: "18px 18px",
    width: "100%",
    minHeight: "345px",
    boxSizing: "border-box",
    boxShadow: "0 3px 15px rgba(15,23,42,0.05)",
  }}
>
  {/* Header */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "14px",
    }}
  >
    <h2
      style={{
        margin: 0,
        fontSize: "15px",
        fontWeight: 700,
        color: "#0f172a",
      }}
    >
      Recent Orders
    </h2>

    <span
      style={{
        color: "#2563eb",
        fontSize: "10px",
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      View All
    </span>
  </div>

  {/* Orders */}
  <div style={{ width: "100%" }}>
    {orders.map((order) => (
      <div
        key={order.id}
        style={{
          display: "grid",

          // Avatar | ID | Name | Amount | Status
          gridTemplateColumns: "34px 68px minmax(70px, 1fr) 65px 55px",

          alignItems: "center",
          columnGap: "6px",

          minHeight: "48px",

          borderBottom: "1px solid #eef1f5",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "#e5edff",
            color: "#3155f5",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            fontSize: "10px",
            fontWeight: 600,
          }}
        >
          {order.avatar}
        </div>

        {/* Order ID */}
        <div
          style={{
            fontSize: "10px",
            color: "#64748b",
            whiteSpace: "nowrap",
          }}
        >
          {order.id}
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "#0f172a",

            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {order.name}
        </div>

        {/* Amount */}
        <div
          style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#0f172a",
            textAlign: "right",
            whiteSpace: "nowrap",
          }}
        >
          {order.amount}
        </div>

        {/* Status */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <span
            style={{
              minWidth: "48px",
              height: "22px",

              padding: "0 6px",

              borderRadius: "5px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              fontSize: "9px",
              fontWeight: 500,

              whiteSpace: "nowrap",

              background:
                order.status === "Paid"
                  ? "#dcfce7"
                  : order.status === "Pending"
                  ? "#fef3c7"
                  : "#fee2e2",

              color:
                order.status === "Paid"
                  ? "#16a34a"
                  : order.status === "Pending"
                  ? "#d97706"
                  : "#ef4444",
            }}
          >
            {order.status}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
          </div>

          {/* Bottom Tables */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "22px",
            }}
          >
            {/* Recent Users */}
            {/* Recent Users */}
<div
  style={{
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 3px 15px rgba(15,23,42,0.05)",
  }}
>
  {/* Header */}
  <div
    style={{
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <h2
      style={{
        margin: 0,
        fontSize: "17px",
        color: "#0f172a",
      }}
    >
      Recent Users
    </h2>

    <span
      style={{
        color: "#2563eb",
        fontSize: "13px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      View All
    </span>
  </div>

  {/* Table Scroll Wrapper */}
  <div
    style={{
      width: "100%",
      overflowX: "auto",
      overflowY: "hidden",
      scrollbarWidth: "thin",
    }}
  >
    <table
      style={{
        width: "100%",
        minWidth: "650px",
        borderCollapse: "collapse",
        fontSize: "12px",
      }}
    >
      <thead>
        <tr
          style={{
            background: "#f8fafc",
            color: "#64748b",
          }}
        >
          <th
            style={{
              ...thStyle,
              minWidth: "150px",
              whiteSpace: "nowrap",
            }}
          >
            Name
          </th>

          <th
            style={{
              ...thStyle,
              minWidth: "180px",
              whiteSpace: "nowrap",
            }}
          >
            Email
          </th>

          <th
            style={{
              ...thStyle,
              minWidth: "80px",
              whiteSpace: "nowrap",
            }}
          >
            Role
          </th>

          <th
            style={{
              ...thStyle,
              minWidth: "100px",
              whiteSpace: "nowrap",
            }}
          >
            Status
          </th>

          <th
            style={{
              ...thStyle,
              minWidth: "110px",
              whiteSpace: "nowrap",
            }}
          >
            Joined
          </th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.email}>
            {/* Name */}
            <td
              style={{
                ...tdStyle,
                minWidth: "150px",
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    minWidth: "28px",
                    borderRadius: "50%",
                    background: "#e5edff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#3155f5",
                    fontSize: "10px",
                    fontWeight: 600,
                  }}
                >
                  {user.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </div>

                {/* Name */}
                <span
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name}
                </span>
              </div>
            </td>

            {/* Email */}
            <td
              style={{
                ...tdStyle,
                minWidth: "180px",
                whiteSpace: "nowrap",
              }}
            >
              {user.email}
            </td>

            {/* Role */}
            <td
              style={{
                ...tdStyle,
                minWidth: "80px",
                whiteSpace: "nowrap",
              }}
            >
              {user.role}
            </td>

            {/* Status */}
            <td
              style={{
                ...tdStyle,
                minWidth: "100px",
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px 9px",
                  borderRadius: "5px",
                  background:
                    user.status === "Active"
                      ? "#dcfce7"
                      : "#fee2e2",
                  color:
                    user.status === "Active"
                      ? "#16a34a"
                      : "#ef4444",
                  whiteSpace: "nowrap",
                }}
              >
                {user.status}
              </span>
            </td>

            {/* Joined */}
            <td
              style={{
                ...tdStyle,
                minWidth: "110px",
                whiteSpace: "nowrap",
              }}
            >
              {user.joined}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

            {/* Top Products */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow:
                  "0 3px 15px rgba(15,23,42,0.05)",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "17px",
                  }}
                >
                  Top Products
                </h2>

                <span
                  style={{
                    color: "#2563eb",
                    fontSize: "13px",
                  }}
                >
                  View All
                </span>
              </div>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "12px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#f8fafc",
                      color: "#64748b",
                    }}
                  >
                    <th style={thStyle}>
                      Product
                    </th>
                    <th style={thStyle}>
                      Price
                    </th>
                    <th style={thStyle}>
                      Stock
                    </th>
                    <th style={thStyle}>
                      Sold
                    </th>
                    <th style={thStyle}></th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.name}>
                      <td style={tdStyle}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "9px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "19px",
                            }}
                          >
                            {product.emoji}
                          </span>

                          {product.name}
                        </div>
                      </td>

                      <td style={tdStyle}>
                        {product.price}
                      </td>

                      <td style={tdStyle}>
                        {product.stock}
                      </td>

                      <td style={tdStyle}>
                        {product.sold}
                      </td>

                      <td style={tdStyle}>
                        <div
                          style={{
                            width: "90px",
                            height: "5px",
                            borderRadius: "5px",
                            background: "#e5e7eb",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: product.progress,
                              height: "100%",
                              background: "#4965f5",
                              borderRadius: "5px",
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const thStyle = {
  padding: "11px 15px",
  textAlign: "left",
  fontWeight: 500,
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle = {
  padding: "10px 15px",
  borderBottom: "1px solid #edf0f4",
  color: "#334155",
};