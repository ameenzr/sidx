import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { BottomNav } from "@/components/ui/BottomNav";
import "./globals.css";

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SID-X exclusive community",
  description: "Curated investment projects and exclusive events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body data-testid="app-root-body" className="min-h-screen flex flex-col bg-[var(--bg-base)] font-sans">
        <main data-testid="main-content-area" className="flex-1 w-full scrollbar-none pb-[56px]">
          {children}
        </main>
      </body>
    </html>
  );
}
