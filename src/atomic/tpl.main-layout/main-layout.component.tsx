import { Header } from "@/atomic/obj.header/header.component";
import { Sidebar } from "@/atomic/obj.sidebar/sidebar.component";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr]">
      <Sidebar className="hidden md:block" />
      <div className="flex flex-col">
        <main className="flex-1 px-lg py-xl">{children}</main>
      </div>
    </div>
  );
};
