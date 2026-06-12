import { Route, Routes } from 'react-router-dom';
import { Toaster as Sonner } from '@/atomic/mol.sonner/sonner.component';
import { Toaster } from '@/atomic/mol.toaster/toaster.component';
import { TooltipProvider } from '@/atomic/mol.tooltip/tooltip.component';
import { ROUTES } from '@/constants/routes';
import Agendamentos from './pages/admin/agendamentos/Agendamentos';
import ClienteDetalhes from './pages/admin/clientes/ClienteDetalhes';
import Clientes from './pages/admin/clientes/Clientes';
import Index from './pages/admin/dashboard/Index';
import OrdemServicoDetalhes from './pages/admin/ordens-servico/OrdemServicoDetalhes';
import OrdensServico from './pages/admin/ordens-servico/OrdensServico';
import Relatorios from './pages/admin/relatorios/Relatorios';
import Tecnicos from './pages/admin/tecnicos/Tecnicos';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Leads from './pages/leads/Leads';
import NotFound from './pages/not-found/NotFound';
import TechAgendamentos from './pages/technician/agendamentos/Agendamentos';
import TechAgendamentoDetalhes from './pages/technician/agendamentos/DetalhesAgendamento';
import TechServicos from './pages/technician/servicos/Servicos';

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <Routes>
      <Route path={ROUTES.AUTH.LOGIN.ADMIN} element={<Login />} />
      <Route path={ROUTES.AUTH.LOGIN.CLIENT} element={<Login />} />
      <Route path={ROUTES.AUTH.LOGIN.TECHNICIAN} element={<Login />} />
      <Route path={ROUTES.AUTH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.HOME} element={<Index />} />
      <Route path={ROUTES.LEADS} element={<Leads />} />
      <Route path={ROUTES.CLIENT.BASE} element={<Clientes />} />
      <Route path={ROUTES.CLIENT.DETAILS} element={<ClienteDetalhes />} />
      <Route path={ROUTES.SERVICE_ORDER.BASE} element={<OrdensServico />} />
      <Route
        path={ROUTES.SERVICE_ORDER.DETAILS}
        element={<OrdemServicoDetalhes />}
      />
      <Route path={ROUTES.SCHEDULING} element={<Agendamentos />} />
      <Route path={ROUTES.REPORT} element={<Relatorios />} />
      <Route path={ROUTES.TECHNICIAN} element={<Tecnicos />} />
      <Route path='*' element={<NotFound />} />
      <Route
        path={ROUTES.TECHNICIAN_SCHEDULING}
        element={<TechAgendamentos />}
      />
      <Route
        path={ROUTES.TECHNICIAN_SCHEDULING_DETAILS}
        element={<TechAgendamentoDetalhes />}
      />
      <Route
        path={ROUTES.TECHNICIAN_SERVICES}
        element={<TechServicos />}
      />
    </Routes>
  </TooltipProvider>
);

export default App;
