"use client";

import { Avatar } from "@components/ui/avatar";
import { useAuthContext } from "@contexts/auth";
import { getCroppedImage } from "@helpers/image-cropper";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const NavbarAvatar = ({ className }: { className: string }) => {
  const auth = useAuthContext();
  const { firstName="", lastName="" } = auth || {};
  const avatarRef = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const initials = firstName[0] + lastName[0];
  
  useEffect(() => {
    if (auth?.profile) {
      const { profileImageFile, profileImageCropInfo } = auth.profile;
      if (avatarRef.current && profileImageFile && profileImageCropInfo) {
        const imageSrc = URL.createObjectURL(profileImageFile);
        getCroppedImage(
          imageSrc,
          profileImageCropInfo,
          avatarRef.current.width,
        ).then((src) => {
          setImageSrc(src);
          URL.revokeObjectURL(imageSrc);
        });
      }
    }
  }, [auth]);
  
  return (
    <Avatar
      className={className}
      src={imageSrc}
      initials={initials}
      ref={avatarRef}
      loading={!initials}
    />
  );
};

export default NavbarAvatar;
