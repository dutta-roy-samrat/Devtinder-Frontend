import { ReactNode } from "react";

import Navbar from "@components/navbar";
import PageTransition from "@components/page-transition";
import AuthProvider from "@contexts/auth";

const UnprotectedRoutesLayout = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <Navbar />
    <PageTransition>{children}</PageTransition>
  </AuthProvider>
);

export default UnprotectedRoutesLayout;
