import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RegistryNavbar from "@/components/registry-navbar";
import { appRoutes } from "@/lib/routes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3D Informatica UI Registry",
  description: "3D Informatica UI Registry",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden flex flex-col items-center`}
      >
        <RegistryNavbar options={appRoutes} />
        <div className="p-6 container w-screen h-[calc(100vh-64px)]">
          {children}
        </div>
      </body>
    </html>
  );
}
