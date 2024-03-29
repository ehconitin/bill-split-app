import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ModeToggle } from "@/components/theme-toggle";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "split",
  description: "Split bills easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <a href="/">
          <div className="border-b bg-gray-900 h-20 text-white text-center text-5xl pt-3">
            split
          </div>
        </a>
        {children}
      </body>
    </html>
  );
}
