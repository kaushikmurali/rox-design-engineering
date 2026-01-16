import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Geist_Mono } from "next/font/google"

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kaushik's Sandbox",
  description: "Just a collection of random experiments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${geistMono.variable}`}>
        <div className="flex min-h-screen">
          <main className="w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}