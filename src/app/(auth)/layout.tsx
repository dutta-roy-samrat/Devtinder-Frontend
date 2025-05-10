import { ReactNode } from "react";

import PageTransition from "@components/page-transition";

import styles from "./main.module.css";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.formContainer}>
      <PageTransition className={styles.pageTransition}>
        {children}
      </PageTransition>
    </div>
  );
};

export default AuthLayout;
