import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@components/ui/drawer";
import { Button } from "@components/ui/button";
import LogoutButton from "@components/shared/logout-button";
import NavLinks from "@components/nav-links";

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
          <div className={styles.responsiveNavContainer}>
            <NavLinks as={DrawerClose} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <LogoutButton className={styles.drawerClose} />
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
