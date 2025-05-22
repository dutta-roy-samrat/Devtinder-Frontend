"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Button, ButtonProps } from "@components/ui/button";

import { logoutApi } from "@apis/auth";

const LogoutButton = ({ className, onClick, ...props }: ButtonProps) => {
  const router = useRouter();
  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push("/login");
    },
  });
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
    onClick?.(e);
  };
  return (
    <Button className={className} {...props} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
