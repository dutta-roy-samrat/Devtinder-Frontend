import type { Metadata } from "next";
import { Inter } from "next/font/google";

import DeviceProvider from "@contexts/device";
import Multimedia from "@components/ui/multimedia";

import bgImg from "@assets/images/svg/landing-bg.svg";

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
          <Multimedia src={bgImg} alt="landing-page-bg" fill priority />
          <div className={styles.main}>{children}</div>
        </DeviceProvider>
      </body>
    </html>
  );
}
