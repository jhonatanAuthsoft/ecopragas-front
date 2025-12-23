import { Header } from "@/atomic/obj.header/header.component";
import { Sidebar } from "@/atomic/obj.sidebar/sidebar.component";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-16">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
};
