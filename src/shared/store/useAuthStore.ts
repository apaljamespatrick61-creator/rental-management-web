import { create } from "zustand";

type AuthState = {
  user: string | null;
  setUser: (user: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));