import StyledLink from "@components/ui/styled-link";
import ClientSideNav from "@components/navbar/client";

import { HOME } from "@constants/routes";

import styles from "./main.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <StyledLink href={HOME} className={styles.navLogo}>
        Dev Tinder
      </StyledLink>
      <ClientSideNav />
    </div>
  );
};

export default Navbar;
