import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Truly Web | Creative Studio",
  description: "Boutique creative studio specializing in high-end digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} dark h-full`} suppressHydrationWarning>
      <body className="font-inter h-full m-0 p-0 overflow-hidden" suppressHydrationWarning>{children}</body>
    </html>
  );
}
