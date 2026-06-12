import { MainLayout } from '@/atomic/tpl.main-layout/main-layout.component';
import { useAuthStore } from '@/store/auth';
import { ROLES } from '@/constants/roles';
import Dashboard from './Dashboard';

const Index = () => {
  const user = useAuthStore((state) => state.user);
  const isTechnician = user?.role === ROLES.TECHNICIAN;

  return (
    <MainLayout>{isTechnician ? <Dashboard /> : <Dashboard />}</MainLayout>
  );
};

export default Index;
