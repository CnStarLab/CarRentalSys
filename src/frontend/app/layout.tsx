import { Link, Typography } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "../components/authwarn/AuthContext";
import { ProtectedRoute } from "../components/authwarn/ProtectedRoute"
import Header from "../components/homepage/Header";
import Footer from "@/components/homepage/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PROJ-CarRentalSys",
  description: "PROJ-CarRentalSys",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <Header />
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
            <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
