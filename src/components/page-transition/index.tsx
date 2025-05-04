"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import styles from "./main.module.css";

const PageTransition = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={styles.pageTransitionContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
