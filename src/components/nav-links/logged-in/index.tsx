"use client";

import { ExoticComponent, Fragment, ReactNode } from "react";
import { usePathname } from "next/navigation";
import snakeCase from "lodash/snakeCase";

import StyledLink from "@components/ui/styled-link";

import { LOGGED_IN_NAV_LINKS } from "@constants/routes";

import styles from "./main.module.css";

const NavLinks = ({
  as: Component = Fragment,
}: {
  as?: ExoticComponent<{ children?: ReactNode }>;
}) => {
  const pathanme = usePathname();
  const getClassName = (path: string) =>
    `${styles.navLink} ${pathanme === path ? styles.selectedNavLink : ""}`;

  const renderNavLinks = () =>
    LOGGED_IN_NAV_LINKS.map(({ name, url }) => (
      <StyledLink
        href={url}
        className={getClassName(url)}
        key={snakeCase(name)}
      >
        <Component>{name}</Component>
      </StyledLink>
    ));

  return renderNavLinks();
};

export default NavLinks;
