import { Header } from "@/atomic/obj.header/header.component";
import { Sidebar } from "@/atomic/obj.sidebar/sidebar.component";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const isMinimized = useSidebarStore((state) => state.isMinimized);

  return (
    <div
      className={cn(
        "grid min-h-screen w-full transition-[grid-template-columns] duration-300",
        isMinimized ? "md:grid-cols-[100px_1fr]" : "md:grid-cols-[256px_1fr]",
      )}
    >
      <Sidebar className="hidden md:block" />
      <div className="flex flex-col">
        <main className="flex-1 px-lg py-xl">{children}</main>
      </div>
    </div>
  );
};
