import NavLinks from "@components/nav-links/logged-in";
import { Avatar } from "@components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@components/ui/navigation-menu";

import styles from "./main.module.css";
import { Button } from "@components/ui/button";

const LoggedInNav = () => (
  <>
    <div className={styles.navLinksContainer}>
      <NavLinks />
    </div>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={styles.avatarDropdown}>
            <Avatar className={styles.avatar} />
          </NavigationMenuTrigger>
          <NavigationMenuContent className={styles.avatarDropdownContent}>
            <Button className={styles.logoutBtn}>Logout</Button>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </>
);

export default LoggedInNav;
