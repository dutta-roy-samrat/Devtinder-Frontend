import NavLinks from "@components/nav-links";
import { DrawerClose } from "@components/ui/drawer";

import styles from "./main.module.css";

const ResponsiveLoggedInNav = () => (
  <div className={styles.responsiveLoggedInNavContainer}>
    <NavLinks as={DrawerClose} />
  </div>
);

export default ResponsiveLoggedInNav;
