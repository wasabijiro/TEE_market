import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/wallet/wallet-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "TEE Edge Market",
  description:
    "Secure trading bot execution marketplace using Trusted Execution Environment",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "TEE Edge Market",
    description:
      "Secure trading bot execution marketplace using Trusted Execution Environment",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "TEE Edge Market Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "TEE Edge Market",
    description:
      "Secure trading bot execution marketplace using Trusted Execution Environment",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans mx-4 sm:mx-6 lg:mx-8`}
      >
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
