import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
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
      className={`${dmSans.variable} ${dmSerifDisplay.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body data-testid="app-root-body" className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: "var(--c-base)", color: "var(--c-text-h)" }}>
        <ThemeProvider>
          <main data-testid="main-content-area" className="flex-1 w-full scrollbar-none pb-[56px]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
