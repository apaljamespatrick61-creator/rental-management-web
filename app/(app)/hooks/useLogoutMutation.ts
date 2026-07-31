"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logoutRequest } from "../api/logout";

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      router.push("/login");
    },
  });
};