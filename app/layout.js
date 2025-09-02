import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "School Management Platform",
  description: "A platform to manage schools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-neutral-900 text-gray-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
