import { ReactNode } from "react";

const CardHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <header className={className}>{children}</header>;

const CardFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <footer className={className}>{children}</footer>;

const CardContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={className}>{children}</div>;

const CardTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <h2 className={className}>{children}</h2>;

const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <article className={className}>{children}</article>;

export { Card, CardHeader, CardFooter, CardContent, CardTitle };
