import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

// DM Sans is a variable font — passing a `weight` array is only valid for
// non-variable Google fonts and breaks the Turbopack production build.
// Omitting it loads the variable face, which covers every weight 100–900.
const dmSans = DM_Sans({
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
  title: "SIDX | Exclusive Community",
  description: "Curated investment projects and exclusive privileges.",
  icons: {
    icon: "/sid-x_icon.png",
  },
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
