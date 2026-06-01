import { create } from "zustand";

// TODO: atualizar conforme o backend
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setSession: (token: string, user: AuthUser | null) => void;
  clearSession: () => void;
}

// TODO: usar persist
export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setSession: (token, user) => {
    localStorage.setItem("token", token);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ token, user });
  },
  clearSession: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));

// TODO: ver se vale a pena manter
export function hydrateAuthFromStorage(): void {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  if (!token) {
    return;
  }
  let user: AuthUser | null = null;
  if (userRaw) {
    try {
      user = JSON.parse(userRaw) as AuthUser;
    } catch {
      user = null;
    }
  }
  useAuthStore.setState({ token, user });
}
