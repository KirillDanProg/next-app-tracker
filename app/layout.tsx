import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Providers from "@/state/Providers";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Трэкер трат",
  description: "Приложения для рассчета трат",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen flex justify-center blue_gradient">
            <div className="w-4/5 flex justify-center">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
