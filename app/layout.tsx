import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";
import Head from "next/head";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['monospace'], 
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Interviewin",
  description:
    "An intelligent AI agent designed to help software engineers practice coding interviews and improve technical interview skills.",
  openGraph: {
    title: "Interviewin", // OpenGraph title
    description:
      "Boost your software engineering interview skills with the help of AI. Practice coding challenges and mock interviews.",
    url: "https://www.interviewin.rullysaputra.com", // URL of your app (replace with your actual URL)
    siteName: "Interviewin", // OpenGraph site name
  },
  keywords:
    "AI interview coach, software engineer interviews, coding interview practice, technical interview prep, AI coding assistant, interview, user interview bahasa indonesia, frontend engineer",
  robots: "index, follow", // Directs search engines to index the page
  authors: {
    name: "Rully Saputra",
    url: "https://portfolio.rullysaputra.com/",
  }, // Author or company
  themeColor: "#000000", // Theme color for mobile browsers
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Preconnect to Google Tag Manager (or other third-party service) */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        {/* Optional: DNS-prefetch if preconnect isn't required */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Add more preconnect or dns-prefetch links as needed */}
      </Head>
      <body
        className={`${geistMono.variable} antialiased min-h-screen flex justify-center items-center mx-2`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-YEZ93G10JR"></Script>
    </html>
  );
}
