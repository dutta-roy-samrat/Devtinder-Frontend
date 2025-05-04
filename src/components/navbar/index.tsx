import StyledLink from "@components/ui/styled-link";
import ClientSideNav from "@components/navbar/client";

import { HOME } from "@constants/routes";

import styles from "./main.module.css";

const Navbar = () => (
  <div className={styles.navbarContainer}>
    <StyledLink href={HOME} className={styles.navLogo}>
      Devtinder
    </StyledLink>
    <ClientSideNav />
  </div>
);

export default Navbar;
