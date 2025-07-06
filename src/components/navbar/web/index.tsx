"use client";

import NavLinks from "@components/nav-links";
import NavbarAvatar from "@components/navbar/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import styles from "./main.module.css";

const WebNavBar = () => (
  <>
    <div className={styles.navLinksContainer}>
      <NavLinks />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <NavbarAvatar className={styles.avatar} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>My Matches</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </>
);

export default WebNavBar;
