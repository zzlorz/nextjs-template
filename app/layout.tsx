import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {Providers} from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "相册日记",
  description: "以影记日常，相册存温柔",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    
  );
}
