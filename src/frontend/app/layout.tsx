import { Link, Typography } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./hook/AuthContext";
import { ProtectedRoute } from "./hook/ProtectedRoute"
import Header from "./components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PROJ-CarRentalSys",
  description: "PROJ-CarRentalSys",
};


// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="STARLAB WEBSITE NOT AVALIABLE NOW">
//         StarLab
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

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
