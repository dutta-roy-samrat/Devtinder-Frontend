import PageTransition from "@components/page-transition";
import { ReactNode } from "react";

const RootTemplate = ({ children }: { children: ReactNode }) => {
  return <PageTransition>{children}</PageTransition>;
};

export default RootTemplate;
