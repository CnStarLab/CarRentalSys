import { Link, Typography } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./hook/AuthContext";
import { ProtectedRoute } from "./hook/ProtectedRoute"
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PROJ-CarRentalSys",
  description: "PROJ-CarRentalSys",
};


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="STARLAB WEBSITE NOT AVALIABLE NOW">
        StarLab
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const copyrightStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '40px', // 距离底部的距离
    left: '50%',
    transform: 'translateX(-50%)', // 水平居中
    color: 'gray', // 设置字体颜色为灰色
  };

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <Header />
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
            <Copyright sx={copyrightStyle} />
        </body>
      </AuthProvider>
    </html>
  );
}
