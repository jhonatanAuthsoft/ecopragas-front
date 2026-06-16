import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/model/rest/auth";

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setSession: (token: string, user: AuthUser | null) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    {
      name: "auth",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
);
