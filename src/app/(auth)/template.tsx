import PageTransition from "@components/page-transition";
import { ReactNode } from "react";

const RootTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <PageTransition className="flex w-full items-center justify-center">
      {children}
    </PageTransition>
  );
};

export default RootTemplate;
