"use client";

import NavLinks from "@components/nav-links/logged-in";
import { DrawerClose } from "@components/ui/drawer";

import styles from "./main.module.css";

const ResponsiveLoggedInNav = () => {
  const isLoggedIn = false; // Replace with actual authentication check

  if (!isLoggedIn) return;
  return (
    <div className={styles.responsiveLoggedInNavContainer}>
      <NavLinks as={DrawerClose} />
    </div>
  );
};

export default ResponsiveLoggedInNav;
