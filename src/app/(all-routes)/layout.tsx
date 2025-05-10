import { ReactNode } from "react";

import Navbar from "@components/navbar";
import PageTransition from "@components/page-transition";

const UnprotectedRoutesLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Navbar />
    <PageTransition>{children}</PageTransition>
  </>
);

export default UnprotectedRoutesLayout;
