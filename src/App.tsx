import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster as Sonner } from "@/atomic/mol.sonner/sonner.component";
import { Toaster } from "@/atomic/mol.toaster/toaster.component";
import { TooltipProvider } from "@/atomic/mol.tooltip/tooltip.component";
import { ROLES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";
import { AuthGuard, GuestGuard } from "@/router/guards";
import { Button } from "./atomic/atm.button/button.component";
import { ErrorPlaceholder } from "./atomic/org.error-placeholder";
import { useLogout } from "./domain/auth";
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
import Leads from "./pages/leads/Leads";
import NotFound from "./pages/not-found/NotFound";
import { useAuthStore } from "./store/auth";
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

      {/* TODO: criar as rotas para cliente */}
      <Route element={<AuthGuard roles={[ROLES.CLIENTE]} />}>
        <Route path={ROUTES.TEMPORARY_FALLBACK.CLIENTE} element={<TemporaryFallback />} />
      </Route>

      <Route element={<AuthGuard roles={[ROLES.ADMINISTRATIVO]} />}>
        <Route path={ROUTES.ADMIN.HOME} element={<Dashboard />} />
        <Route path={ROUTES.ADMIN.LEADS} element={<Leads />} />
        <Route path={ROUTES.ADMIN.CLIENT.BASE} element={<Clientes />} />
        <Route path={ROUTES.ADMIN.CLIENT.DETAILS} element={<ClienteDetalhes />} />
        <Route path={ROUTES.ADMIN.SERVICE_ORDER.BASE} element={<OrdensServico />} />
        <Route path={ROUTES.ADMIN.SERVICE_ORDER.DETAILS} element={<OrdemServicoDetalhes />} />
        <Route path={ROUTES.ADMIN.SCHEDULING} element={<Agendamentos />} />
        <Route path={ROUTES.ADMIN.REPORT} element={<Relatorios />} />
        <Route path={ROUTES.ADMIN.TECHNICIAN} element={<Tecnicos />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;

// TODO: apagar ao inserir as páginas de tecnico e cliente
const TemporaryFallback = () => {
  const navigate = useNavigate();
  const clearSession = useAuthStore((state) => state.clearSession);
  const { logout, isLogoutLoading } = useLogout({
    onSettled: () => {
      clearSession();
      navigate(ROUTES.AUTH.LOGIN);
    },
  });
  return (
    <div className="flex flex-col gap-2xl items-center justify-center min-h-screen bg-background">
      <ErrorPlaceholder
        title="Em construção..."
        description="Esta página ainda está em desenvolvimento, por favor entre como administrador para acessar a página."
      />
      <Button onClick={() => logout()} variant="tertiary" isLoading={isLogoutLoading}>
        Deslogar e voltar para o login
      </Button>
    </div>
  );
};
