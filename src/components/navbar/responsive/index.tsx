"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@components/ui/drawer";
import { Button } from "@components/ui/button";
import ResponsiveLoggedInNav from "@components/navbar/responsive/logged-in";

import styles from "./main.module.css";

const ResponsiveNav = () => {
  const renderHamburger = () => (
    <div className={styles.hamburgerContainer}>
      {Array(3)
        .fill("")
        .map((_: any, idx: number) => (
          <div key={idx} className={styles.hamburgerLines}></div>
        ))}
    </div>
  );
  return (
    <Drawer>
      <DrawerTrigger>
        <>{renderHamburger()}</>
      </DrawerTrigger>
      <DrawerContent className={styles.drawerContentContainer}>
        <DrawerTitle className={styles.drawerTitle}>
          Navigation menu
        </DrawerTitle>
        <div className={styles.drawerContent}>
          <ResponsiveLoggedInNav />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className={styles.drawerClose}>Logout</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button className={styles.drawerClose}>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveNav;
