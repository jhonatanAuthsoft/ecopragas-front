import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/atomic/mol.sheet/sheet.component";
import { Sidebar } from "@/atomic/obj.sidebar/sidebar.component";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const isStoreMinimized = useSidebarStore((state) => state.isMinimized);
  const isMobile = useIsMobile();
  const isMinimized = isStoreMinimized;

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {!isMobile && <Sidebar />}
      <div
        className={cn(
          "flex flex-col min-h-screen transition-[margin-left] duration-300 bg-grayscale-x-light",
          !isMobile && (isMinimized ? "ml-[100px]" : "ml-[256px]"),
        )}
      >
        {isMobile && (
          <header className="flex h-16 items-center justify-between border-b border-border bg-white px-4">
            <Sheet>
              <SheetTrigger asChild>
                <button className="mr-4">
                  <Menu className="h-6 w-6 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[256px] p-0 border-none">
                <Sidebar className="w-full relative h-full" isMobileSheet />
              </SheetContent>
            </Sheet>
            <img src="/logo.png" alt="Logo" className="h-8" />
            <div className="w-6" /> {/* spacer for center alignment */}
          </header>
        )}
        <main className="flex-1 px-md md:px-lg py-md md:py-xl">{children}</main>
      </div>
    </div>
  );
};
