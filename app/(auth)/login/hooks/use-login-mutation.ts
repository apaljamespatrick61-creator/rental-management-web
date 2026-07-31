"use client";

import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/login";
import type { LoginFormValues } from "../schema/login.schema";
import {useRouter} from "next/navigation";
import {useState} from "react";
import { AxiosError } from "axios";

type BackendError = {
  message?: string;
};

 export const useLoginMutation = () => {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const loginMutation = useMutation({
        mutationFn: (data: LoginFormValues) => loginRequest(data),
        onSuccess: () => {
            router.replace("/dashboard");
        },
        onError: (error: AxiosError<BackendError>) => {
            setError(error.response?.data?.message || "An error occurred during login");
        }
    });
    return { loginMutation, error };
};

