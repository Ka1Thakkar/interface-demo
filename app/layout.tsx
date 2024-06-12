import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css"
import { cn } from "@/lib/utils";

const manrope = Manrope({ subsets: ["latin"], weight : 'variable' });

export const metadata: Metadata = {
  title: "Interface AI",
  description: "",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/img/favicon.ico" sizes="any" />
      <body className={cn(manrope.className," flex items-start overflow-x-hidden w-screen min-h-screen")}>
        {children}
      </body>
    </html>
  );
}