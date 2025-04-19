import snakeCase from "lodash/snakeCase";

import StyledLink from "@components/ui/styled-link";

import { AUTH_ROUTES } from "@constants/routes";

const LoggedOutNav = () => {
  const renderLoggedOutNavLinks = () =>
    AUTH_ROUTES.map(({ name, url }) => (
      <StyledLink
        key={snakeCase(name)}
        href={url}
        className="rounded-full p-4 text-white hover:bg-red-500"
      >
        {name}
      </StyledLink>
    ));
  return renderLoggedOutNavLinks();
};

export default LoggedOutNav;
