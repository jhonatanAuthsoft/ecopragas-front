import { create } from "zustand";
import { persist } from "zustand/middleware";

export const SIDEBAR_WIDTH_EXPANDED = 256;
export const SIDEBAR_WIDTH_COLLAPSED = 100;

interface SidebarState {
  isMinimized: boolean;
  toggleMinimized: () => void;
  setMinimized: (minimized: boolean) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isMinimized: false,
      toggleMinimized: () => set((state) => ({ isMinimized: !state.isMinimized })),
      setMinimized: (minimized) => set({ isMinimized: minimized }),
    }),
    {
      name: "sidebar",
      partialize: (state) => ({
        isMinimized: state.isMinimized,
      }),
    },
  ),
);
