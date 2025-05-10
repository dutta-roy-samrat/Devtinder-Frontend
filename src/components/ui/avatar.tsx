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
    className={cn("aspect-square h-full w-full object-contain", className)}
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

type AvatarProps = {
  src?: string;
  initials?: string;
} & ComponentPropsWithoutRef<typeof AvatarContainer>;

const Avatar = forwardRef<ElementRef<typeof AvatarContainer>, AvatarProps>(
  ({ className = "", src, initials, ...props }, ref) => {
    return (
      <AvatarContainer ref={ref} className={cn("bg-red-500", className)} {...props}>
        <AvatarImage src={src} />
        <AvatarFallback className="bg-slate-400">{initials}</AvatarFallback>
      </AvatarContainer>
    );
  }
);
Avatar.displayName = AvatarContainer.displayName;

export { Avatar, AvatarImage, AvatarFallback };
