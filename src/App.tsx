import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/atomic/mol.sonner/sonner.component";
import { Toaster } from "@/atomic/mol.toaster/toaster.component";
import { TooltipProvider } from "@/atomic/mol.tooltip/tooltip.component";
import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { AuthGuard, GuestGuard } from "@/router/guards";
import AgendamentoDetalhes from "./pages/admin/agendamentos/AgendamentoDetalhes";
import Agendamentos from "./pages/admin/agendamentos/Agendamentos";
import ClienteDetalhes from "./pages/admin/clientes/ClienteDetalhes";
import Clientes from "./pages/admin/clientes/Clientes";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import OrdemServicoDetalhes from "./pages/admin/ordens-servico/OrdemServicoDetalhes";
import OrdensServico from "./pages/admin/ordens-servico/OrdensServico";
import Relatorios from "./pages/admin/relatorios/Relatorios";
import Tecnicos from "./pages/admin/tecnicos/Tecnicos";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import ClientAgendamentos from "./pages/client/agendamentos/Agendamentos";
import ClientDetalhesAgendamento from "./pages/client/agendamentos/DetalhesAgendamento";
import ClientOrdensServico from "./pages/client/ordens-servico/OrdensServico";
import Services from "./pages/client/services/Services";
import ServicosClienteDetalhes from "./pages/client/services/ServicosClienteDetalhes";
import Leads from "./pages/leads/Leads";
import NotFound from "./pages/not-found/NotFound";
import TechAgendamentos from "./pages/technician/agendamentos/Agendamentos";
import TechAgendamentoDetalhes from "./pages/technician/agendamentos/DetalhesAgendamento";
import TechServicos from "./pages/technician/servicos/Servicos";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Routes>
      <Route element={<GuestGuard />}>
        <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
        <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      </Route>

      <Route element={<AuthGuard roles={[ROLES.TECNICO]} />}>
        <Route path={ROUTES.TECHNICIAN_SCHEDULING} element={<TechAgendamentos />} />
        <Route path={ROUTES.TECHNICIAN_SCHEDULING_DETAILS} element={<TechAgendamentoDetalhes />} />
        <Route path={ROUTES.TECHNICIAN_SERVICES} element={<TechServicos />} />
      </Route>

      <Route element={<AuthGuard roles={[ROLES.CLIENTE]} />}>
        <Route path={ROUTES.CLIENT_SERVICES} element={<Services />} />
        <Route path={ROUTES.CLIENT_SERVICES_DETAILS} element={<ServicosClienteDetalhes />} />
        <Route path={ROUTES.CLIENT_SERVICE_ORDER} element={<ClientOrdensServico />} />
        <Route path={ROUTES.CLIENT_SCHEDULING} element={<ClientAgendamentos />} />
        <Route path={ROUTES.CLIENT_SCHEDULING_DETAILS} element={<ClientDetalhesAgendamento />} />
      </Route>

      <Route element={<AuthGuard roles={[ROLES.ADMINISTRATIVO]} />}>
        <Route path={ROUTES.ADMIN.HOME} element={<Dashboard />} />
        <Route path={ROUTES.ADMIN.LEADS} element={<Leads />} />
        <Route path={ROUTES.ADMIN.CLIENT.BASE} element={<Clientes />} />
        <Route path={ROUTES.ADMIN.CLIENT.DETAILS} element={<ClienteDetalhes />} />
        <Route path={ROUTES.ADMIN.SERVICE_ORDER.BASE} element={<OrdensServico />} />
        <Route path={ROUTES.ADMIN.SERVICE_ORDER.DETAILS} element={<OrdemServicoDetalhes />} />
        <Route path={ROUTES.ADMIN.SCHEDULING.BASE} element={<Agendamentos />} />
        <Route path={ROUTES.ADMIN.SCHEDULING.DETAILS} element={<AgendamentoDetalhes />} />
        <Route path={ROUTES.ADMIN.REPORT} element={<Relatorios />} />
        <Route path={ROUTES.ADMIN.TECHNICIAN} element={<Tecnicos />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;
