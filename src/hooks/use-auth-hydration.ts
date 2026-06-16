import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";

export function useAuthHydration() {
  const [hydrated, setHydrated] = useState(() => useAuthStore.persist.hasHydrated());

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    setHydrated(useAuthStore.persist.hasHydrated());

    return unsubscribe;
  }, []);

  return hydrated;
}
