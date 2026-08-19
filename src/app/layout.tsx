import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rydio",
  description: "Rent a car with Rydio today",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="flex justify-between py-2 px-4 border border-gray-300">
          {/* Hamburber Menu & Logo */}
          <div className="flex gap-3.5 items-center h-full">
            {/* Hamburger Menu Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 xl:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            {/* Site Logo */}
            <Image
              src="/rydio_logo_250x45.png"
              alt="Rydio Logo"
              width={250}
              height={45}
              className="max-w-26"
            />
            <nav className="hidden xl:flex text-sm font-semibold">
              <div className="flex gap-2 items-center border-b-2 border-transparent hover:border-text">
                Book a car
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </nav>
          </div>

          {/* Join Link & Login Button */}
          <div className="flex gap-2.5 items-center font-semibold">
            <a
              href="https://google.com/"
              className="px-5 py-2.5 border hover:border-text border-transparent rounded-full"
            >
              Join
            </a>
            <button className="flex gap-1 px-4 py-2.5 text-white rounded-full bg-brand-green-base hover:bg-brand-green-500 cursor-pointer border border-brand-green-base hover:border-brand-green-500">
              {/* Account Person */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Login
            </button>
          </div>
        </header>

        {/* Quick Access Links */}
        <div
          className="flex xl:hidden gap-3 justify-center whitespace-nowrap underline text-xs flex-wrap py-3
        border-x border-b border-gray-300"
        >
          <div className="flex gap-3">
            <a href="https://google.com/">Book a car</a>
            <a href="https://google.com/">Buy a car</a>
            <a href="https://google.com/">Manage</a>
          </div>
          <div className="flex gap-3">
            <a href="https://google.com/">Check-in</a>
            <a href="https://google.com/">Receipts</a>
            <a href="https://google.com/">Support</a>
          </div>
        </div>

        {/* Main Page Content (from page.tsx)*/}
        {children}

        {/* FOOTER */}
      </body>
    </html>
  );
}
