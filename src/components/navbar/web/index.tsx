import NavLinks from "@components/nav-links";
import NavbarAvatar from "@components/navbar/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@components/ui/navigation-menu";
import LogoutButton from "@components/shared/logout-button";

import styles from "./main.module.css";

const WebNavBar  = () => (
  <>
    <div className={styles.navLinksContainer}>
      <NavLinks />
    </div>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={styles.avatarDropdown}>
            <NavbarAvatar className={styles.avatar} />
          </NavigationMenuTrigger>
          <NavigationMenuContent className={styles.avatarDropdownContent}>
            <LogoutButton />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </>
);

export default WebNavBar;
