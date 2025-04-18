"use client";

import WebNavBar from "@components/navbar/web";
import ResponsiveNav from "@components/navbar/responsive";

import { useDeviceContext } from "@contexts/device";

const ClientSideNav = () => {
  const { isDesktop, isLoading } = useDeviceContext();
  if (isLoading) return;
  return isDesktop ? <WebNavBar /> : <ResponsiveNav />;
};

export default ClientSideNav;
