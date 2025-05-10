import type { Metadata } from "next";
import { Inter } from "next/font/google";

import DeviceProvider from "@contexts/device";

import "./globals.css";
import styles from "./main.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Devtinder",
  description: "Connecting devs worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DeviceProvider>
          <div className={styles.main}>{children}</div>
        </DeviceProvider>
      </body>
    </html>
  );
}
