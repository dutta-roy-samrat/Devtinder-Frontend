"use client";

import { Avatar } from "@components/ui/avatar";
import { useAuthContext } from "@contexts/auth";
import { useEffect, useRef, useState } from "react";

const NavbarAvatar = ({ className }: { className: string }) => {
  const auth = useAuthContext();
  const { firstName = "", lastName = "", profile, isLoading } = auth || {};
  const avatarRef = useRef<HTMLImageElement>(null);
  const initials = firstName[0] + lastName[0];
  const imageSrc = profile.croppedProfileImageUrl;

  return (
    <Avatar
      className={className}
      src={imageSrc}
      initials={initials}
      ref={avatarRef}
      loading={isLoading}
    />
  );
};

export default NavbarAvatar;
