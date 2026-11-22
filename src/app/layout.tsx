import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Graceful Plans — Student Accommodation in Universitas, Bloemfontein",
  description:
    "Accredited student accommodation for CUT students in Universitas, Bloemfontein. Uncapped Wi-Fi, water, electricity, laundry, and daily CUT shuttle transport included.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col bg-white text-neutral-950 antialiased selection:bg-neutral-950 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
