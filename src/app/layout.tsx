import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Link from "@/components/link";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ToasterPortal } from "@/components/toaster";
import logo from "@/assets/infn_logo_white.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Federation Manager",
  description: "Welconme to the Federation Manager Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar logo={logo} name="Federation Manager">
          <div className="flex h-full items-center text-white">
            {session && (
              <Link
                href="/settings"
                className="mr-4 ml-auto flex h-full items-center text-white"
              >
                <Cog8ToothIcon className="size-7" />
              </Link>
            )}
          </div>
        </Navbar>

        <div className="mx-auto w-full p-8 md:w-3/4 lg:w-1/2">
          {children}

          <ToasterPortal />
        </div>
      </body>
    </html>
  );
}
