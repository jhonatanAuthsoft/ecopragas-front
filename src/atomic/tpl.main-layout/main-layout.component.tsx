import { Sidebar } from "@/atomic/obj.sidebar/sidebar.component";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const isMinimized = useSidebarStore((state) => state.isMinimized);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Sidebar className="hidden md:block" />
      <div
        className={cn(
          "flex flex-col min-h-screen transition-[margin-left] duration-300 bg-grayscale-x-light",
          isMinimized ? "md:ml-[100px]" : "md:ml-[256px]",
        )}
      >
        <main className="flex-1 px-lg py-xl">{children}</main>
      </div>
    </div>
  );
};
