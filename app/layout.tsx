import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoreKeeper - Local RPG Character Sheets",
  description:
    "A bilingual product site for LoreKeeper, the local-first RPG character sheet app for Game Masters and players.",
  icons: {
    icon: "/lorekeeper-logo.png",
    shortcut: "/lorekeeper-logo.png",
  },
  openGraph: {
    title: "LoreKeeper",
    description:
      "Local-first RPG character sheets with QR access, permissions and live synchronization.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "LoreKeeper",
    description:
      "Local-first RPG character sheets with QR access, permissions and live synchronization.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
