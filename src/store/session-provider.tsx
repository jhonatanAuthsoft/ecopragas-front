import type { ReactNode } from "react";
import { useEffect } from "react";
import { hydrateAuthFromStorage } from "@/store/auth.store";

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  // TODO: atualizar apos persist e ver se vale a pena manter
  useEffect(() => {
    hydrateAuthFromStorage();
  }, []);

  return children;
}
