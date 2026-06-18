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
      // MOCK: Para testes, já iniciando com sessão de técnico
      token: "mock-token",
      user: {
        id: "1",
        name: "Técnico de Teste",
        email: "tecnico@teste.com",
        role: "TECHNICIAN",
      },
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
