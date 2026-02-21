import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Real Estate Listing Kit",
  description: "Property listing kit with filters, inquiry flow, and AI copy helper."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
