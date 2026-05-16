import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BeWell | Better Life for Everyone",
  description: "A modern wellness and lifestyle ecosystem where every customer can improve their lifestyle while becoming part of a growing community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-bewell-ivory text-bewell-text`}>
        <SmoothScrollProvider>
          <Navigation />
          <div className="pt-0">
            {children}
          </div>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
