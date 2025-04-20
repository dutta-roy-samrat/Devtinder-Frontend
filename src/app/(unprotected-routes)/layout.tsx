import { ReactNode } from "react";

import Navbar from "@components/navbar";

const UnprotectedRoutesLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default UnprotectedRoutesLayout;
