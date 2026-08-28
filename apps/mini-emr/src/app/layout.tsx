import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini-EMR",
  description: "Electronic Medical Records System",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
