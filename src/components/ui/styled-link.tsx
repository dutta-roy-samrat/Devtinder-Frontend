import { ReactNode } from "react";
import Link, { LinkProps } from "next/link";

const StyledLink = ({
  children,
  className,
  ...rest
}: { children: ReactNode; className?: string } & LinkProps) => (
  <Link className={className} {...rest}>
    {children}
  </Link>
);

export default StyledLink;
