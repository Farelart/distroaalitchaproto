import type { Metadata } from "next";
import "./globals.css";
import "./polish.css";
import "./product-pages.css";
import "./nav-order.css";
import LegacyNavigation from "./components/LegacyNavigation";

export const metadata: Metadata = {
  title: "Distroa — Distribution intelligence",
  description: "A distribution operating system prototype"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><LegacyNavigation />{children}</body></html>;
}
