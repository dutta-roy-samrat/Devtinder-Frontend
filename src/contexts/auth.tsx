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

const AuthContext = createContext<z.infer<typeof UserSchema> | null>(null);

export const useAuthContext = () =>
  useContext<z.infer<typeof UserSchema> | null>(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, error } = useQuery({
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

  const value = useMemo(() => (data ? { ...data } : null), [data]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
