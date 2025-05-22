import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import DeviceProvider from "@contexts/device";
import TanstackClientProvider from "@services/tanstack/client";

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
      <ToastContainer />
        <TanstackClientProvider>
            <DeviceProvider>
              <div className={styles.main}>{children}</div>
            </DeviceProvider>
        </TanstackClientProvider>
      </body>
    </html>
  );
}
