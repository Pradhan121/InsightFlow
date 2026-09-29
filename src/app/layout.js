import Providers from "@/components/Providers";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import "./globals.css";

export const metadata = {
  title: "AdminPro",
  description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#f5f7fb",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Sidebar />
        <Header />

        <main
          style={{
            marginLeft: "246px",
            paddingTop: "70px",
            minHeight: "100vh",
            boxSizing: "border-box",
          }}
        >
          {children}
        </main>

        <Providers />
      </body>
    </html>
  );
}