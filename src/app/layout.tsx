import type { Metadata } from "next";
import { Inter, Prata } from "next/font/google";
import LenisProvider from "@/components/providers/lenis-provider";
import { LoadingScreen } from "@/components/LoadingScreen";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const prata = Prata({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-prata",
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
    <html lang="en" className={`${inter.variable} ${prata.variable} dark h-full`} suppressHydrationWarning>
      <body className="font-sans h-full m-0 p-0 antialiased bg-[#050505] text-white" suppressHydrationWarning>
        <LoadingScreen />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
