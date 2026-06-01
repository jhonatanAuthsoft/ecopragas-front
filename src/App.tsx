import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/atomic/mol.sonner/sonner.component";
import { Toaster } from "@/atomic/mol.toaster/toaster.component";
import { TooltipProvider } from "@/atomic/mol.tooltip/tooltip.component";
import Agendamentos from "./pages/admin/agendamentos/Agendamentos";
import ClienteDetalhes from "./pages/admin/clientes/ClienteDetalhes";
import Clientes from "./pages/admin/clientes/Clientes";
import Index from "./pages/admin/dashboard/Index";
import OrdemServicoDetalhes from "./pages/admin/ordens-servico/OrdemServicoDetalhes";
import OrdensServico from "./pages/admin/ordens-servico/OrdensServico";
import Relatorios from "./pages/admin/relatorios/Relatorios";
import Tecnicos from "./pages/admin/tecnicos/Tecnicos";
import Auth from "./pages/auth/Auth";
import Leads from "./pages/leads/Leads";
import NotFound from "./pages/not-found/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={<Index />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/admin/clientes" element={<Clientes />} />
          <Route path="/admin/clientes/:id" element={<ClienteDetalhes />} />
          <Route path="/admin/ordens-servico" element={<OrdensServico />} />
          <Route path="/admin/ordens-servico/:id" element={<OrdemServicoDetalhes />} />
          <Route path="/admin/agendamentos" element={<Agendamentos />} />
          <Route path="/admin/relatorios" element={<Relatorios />} />
          <Route path="/admin/tecnicos" element={<Tecnicos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
