"use client";

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getDevice } from "@helpers/device";

type DeviceContextProps = {
  isDesktop: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isLoading: boolean;
};

const defaultDevice = {
  isDesktop: false,
  isMobile: false,
  isTablet: false,
};

const DeviceContext = createContext<DeviceContextProps>({
  ...defaultDevice,
  isLoading: true,
});

export const useDeviceContext = () =>
  useContext<DeviceContextProps>(DeviceContext);

const DeviceProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [device, setDevice] = useState(defaultDevice);

  useEffect(() => {
    const handleScreenResize = () => setDevice(getDevice(window?.innerWidth));

    handleScreenResize();
    window.addEventListener("resize", handleScreenResize);
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);
  const { isDesktop, isMobile, isTablet } = device;
  const value = useMemo(
    () => ({
      isDesktop,
      isMobile,
      isTablet,
      isLoading: !(isDesktop || isMobile || isTablet),
    }),
    [isDesktop, isMobile, isTablet],
  );
  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};

export default DeviceProvider;
