"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { Root, Fallback, Image } from "@radix-ui/react-avatar";

import { cn } from "@lib/utils";

const AvatarContainer = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));
AvatarContainer.displayName = Root.displayName;

const AvatarImage = forwardRef<
  ElementRef<typeof Image>,
  ComponentPropsWithoutRef<typeof Image>
>(({ className, ...props }, ref) => (
  <Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
    alt="avatar"
  />
));
AvatarImage.displayName = Image.displayName;

const AvatarFallback = forwardRef<
  ElementRef<typeof Fallback>,
  ComponentPropsWithoutRef<typeof Fallback>
>(({ className, ...props }, ref) => (
  <Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = Fallback.displayName;

const Avatar = ({
  className = "",
  src,
  initials,
}: {
  className?: string;
  src: string;
  initials: string;
}) => {
  return (
    <AvatarContainer className={className}>
      <AvatarImage src={src} />
      <AvatarFallback className="bg-slate-400">{initials}</AvatarFallback>
    </AvatarContainer>
  );
};

export { Avatar, AvatarImage, AvatarFallback };
