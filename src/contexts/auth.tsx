"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@apis/profile";
import { createContext, useEffect, useMemo, useContext } from "react";
import { toast } from "react-toastify";
import { LOGIN } from "@constants/routes";
import { useRouter } from "next/navigation";
import { logoutApi } from "@apis/auth";
import { UserSchema } from "@schema-validations/user-schema";
import { z } from "zod";

const DEFAULT_CONTEXT_VALUE = {
  isLoading: true,
  id: "",
  age: 0,
  gender: "",
  firstName: "",
  lastName: "",
  profile: {
    croppedProfileImageUrl: "",
    profileImageCropInfo: {
      scale: 1,
      crop: {
        x: 0,
        y: 0,
      },
    },
    originalProfileImageUrl: "",
    bio: "",
  },
  skills: [],
};

const AuthContext = createContext<z.infer<typeof UserSchema>>(
  DEFAULT_CONTEXT_VALUE,
);

export const useAuthContext = () =>
  useContext<z.infer<typeof UserSchema>>(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, error, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    refetchOnWindowFocus: false,
  });

  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
  });

  useEffect(() => {
    if (error) {
      logout();
      toast.error(
        "Encountered an error while fetching profile, please login again",
      );
      router.push(LOGIN.url);
    }
  }, [error, router, logout]);
  
  const value = useMemo(() => {
    return data
      ? {
          ...DEFAULT_CONTEXT_VALUE,
          ...data,
          profile: {
            ...DEFAULT_CONTEXT_VALUE.profile,
            ...data.profile,
          },
          isLoading,
        }
      : { ...DEFAULT_CONTEXT_VALUE, isLoading };
  }, [data, isLoading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
