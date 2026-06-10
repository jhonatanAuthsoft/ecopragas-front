import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/atomic/mol.sonner/sonner.component";
import { Toaster } from "@/atomic/mol.toaster/toaster.component";
import { TooltipProvider } from "@/atomic/mol.tooltip/tooltip.component";
import { ROUTES } from "@/constants/routes";
import Agendamentos from "./pages/admin/agendamentos/Agendamentos";
import ClienteDetalhes from "./pages/admin/clientes/ClienteDetalhes";
import Clientes from "./pages/admin/clientes/Clientes";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import OrdemServicoDetalhes from "./pages/admin/ordens-servico/OrdemServicoDetalhes";
import OrdensServico from "./pages/admin/ordens-servico/OrdensServico";
import Relatorios from "./pages/admin/relatorios/Relatorios";
import Tecnicos from "./pages/admin/tecnicos/Tecnicos";
import AdminLogin from "./pages/auth/AdminLogin";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Leads from "./pages/leads/Leads";
import NotFound from "./pages/not-found/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Routes>
      <Route path={ROUTES.AUTH.LOGIN.ADMIN} element={<AdminLogin />} />
      {/* 
        TODO: Adicionar rota para login de cliente e técnico
        <Route path={ROUTES.AUTH.LOGIN.CLIENT} element={<ClientAuth />} />
        <Route path={ROUTES.AUTH.LOGIN.TECHNICIAN} element={<TechnicianAuth />} /> 
      */}
      <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.HOME} element={<Dashboard />} />
      <Route path={ROUTES.LEADS} element={<Leads />} />
      <Route path={ROUTES.CLIENT.BASE} element={<Clientes />} />
      <Route path={ROUTES.CLIENT.DETAILS} element={<ClienteDetalhes />} />
      <Route path={ROUTES.SERVICE_ORDER.BASE} element={<OrdensServico />} />
      <Route path={ROUTES.SERVICE_ORDER.DETAILS} element={<OrdemServicoDetalhes />} />
      <Route path={ROUTES.SCHEDULING} element={<Agendamentos />} />
      <Route path={ROUTES.REPORT} element={<Relatorios />} />
      <Route path={ROUTES.TECHNICIAN} element={<Tecnicos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;
