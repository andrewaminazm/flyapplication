import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/contexts/LocaleContext";
import FixedLanguageSwitcher from "@/components/FixedLanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlyTravel - Your Trusted Travel Partner",
  description: "Discover amazing destinations at exclusive deals. Book your dream vacation with FlyTravel - affordable packages, 24/7 support, and unforgettable experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var c=document.cookie.match(/flytravel_locale=([^;]+)/);var l=c?c[1]:'en';document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LocaleProvider>
          <FixedLanguageSwitcher />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
