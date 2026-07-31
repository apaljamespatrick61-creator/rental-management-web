"use client";

import { Building2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormValues } from "./schema/login.schema";
import { useLoginMutation } from "./hooks/use-login-mutation";

const LoginPage = () => {
  const { loginMutation, error } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md border rounded-sm p-4 bg-white shadow-sm">
          <Building2 className="h-16 w-16 text-brand mx-auto" />
          <h1 className="text-2xl text-brand text-center font-bold p-2">
            Boarding House Rental System
          </h1>
          <h1 className="text-xl text-center text-black p-4 ">
            Management Console
          </h1>
          <div className="flex flex-col gap-4 p-4 space-y-4 mt-6 mb-6">
            <div>
              <label className="text-black font-semibold" htmlFor="username">
                Email Address:
              </label>
              <input
                type="email"
                id="username"
                className="border rounded-sm w-full p-2 border-gray-500 text-black mt-2"
                {...register("email")}
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="text-black font-semibold" htmlFor="password">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="border rounded-sm w-full p-2 border-gray-500 text-black mt-2"
                {...register("password")}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <button className="bg-brand text-white w-full p-2 rounded-sm">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
