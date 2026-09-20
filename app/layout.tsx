import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sillage — Find your people. Leave an impression.",
  description: "Find creators who understand your brand. Explore a more human way to build meaningful creator partnerships with Sillage."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
