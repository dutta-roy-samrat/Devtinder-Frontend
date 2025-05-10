"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import styles from "./main.module.css";

const PageTransition = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();

  const variants = {
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  return (
    <div className={styles.pageTransitionContainer}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
