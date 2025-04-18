export const getDevice = (width: number) => ({
  isMobile: width < 640,
  isTablet: width >= 640 && width < 1024,
  isDesktop: width >= 1024,
});
