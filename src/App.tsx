import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/atomic/mol.sonner/sonner.component";
import { Toaster } from "@/atomic/mol.toaster/toaster.component";
import { TooltipProvider } from "@/atomic/mol.tooltip/tooltip.component";
import { ROUTES } from "@/constants/routes";
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

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Auth />} />
      <Route path={ROUTES.HOME} element={<Index />} />
      <Route path={ROUTES.LEADS} element={<Leads />} />
      <Route path={ROUTES.CLIENTES.BASE} element={<Clientes />} />
      <Route path={ROUTES.CLIENTES.DETAILS} element={<ClienteDetalhes />} />
      <Route path={ROUTES.ORDENS_SERVICO.BASE} element={<OrdensServico />} />
      <Route path={ROUTES.ORDENS_SERVICO.DETAILS} element={<OrdemServicoDetalhes />} />
      <Route path={ROUTES.AGENDAMENTOS} element={<Agendamentos />} />
      <Route path={ROUTES.RELATORIOS} element={<Relatorios />} />
      <Route path={ROUTES.TECNICOS} element={<Tecnicos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;
