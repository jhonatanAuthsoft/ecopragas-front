import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/atomic/mol.sonner/sonner.component";
import { Toaster } from "@/atomic/mol.toaster/toaster.component";
import { TooltipProvider } from "@/atomic/mol.tooltip/tooltip.component";
import Agendamentos from "./pages/admin/agendamentos/Agendamentos";
import Auth from "./pages/auth/Auth";
import Clientes from "./pages/admin/clientes/Clientes";
import Index from "./pages/admin/dashboard/Index";
import Leads from "./pages/leads/Leads";
import NotFound from "./pages/not-found/NotFound";
import OrdemServicoDetalhes from "./pages/admin/ordens-servico/OrdemServicoDetalhes";
import OrdensServico from "./pages/admin/ordens-servico/OrdensServico";
import Relatorios from "./pages/admin/relatorios/Relatorios";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Index />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/ordens-servico" element={<OrdensServico />} />
          <Route path="/ordens-servico/:id" element={<OrdemServicoDetalhes />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
