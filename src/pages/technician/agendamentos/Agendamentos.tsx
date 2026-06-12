import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '@/atomic/mol.search/search.component';
import { Body2, H1 } from '@/atomic/atm.typography';
import { SchedulingList } from '@/atomic/obj.scheduling-list';
import { MainLayout } from '@/atomic/tpl.main-layout/main-layout.component';
import { Label } from '@/atomic/atm.label/label.component';
import { CalendarDropdown } from "@/atomic/mol.calendar-dropdown";
import { ROUTES } from '@/constants/routes';

const Agendamentos = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const [searchTerm, setSearchTerm] = useState('');

  const MOCK_SCHEDULINGS = [
    {
      id: '1',
      time: '09:00',
      title: "Limpeza de caixa d'água",
      status: 'Em Andamento' as const,
      clientName: 'Luiz Silva Reis',
      phone: '(00) 0000-0000',
      address: 'Rua com nome grande, bairro com nome grande',
    },
    {
      id: '2',
      time: '10:30',
      title: 'Dedetização Residencial',
      status: 'Em Andamento' as const,
      clientName: 'Maria Santos',
      phone: '(11) 9999-9999',
      address: 'Av. Principal, 123 - Centro',
    },
    {
      id: '3',
      time: '14:00',
      title: 'Desinsetização',
      status: 'Em Andamento' as const,
      clientName: 'Condomínio Solar',
      phone: '(11) 8888-8888',
      address: 'Rua das Flores, 456 - Jardim',
    },
  ];

  const filteredSchedulings = MOCK_SCHEDULINGS.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className='flex flex-col gap-xl'>
        {/* Header Section */}
        <div className='flex flex-col gap-xs'>
          <H1>Agendamentos</H1>
          <Body2 className='text-muted-foreground'>
            Gerencie a agenda de serviços
          </Body2>
        </div>

        {/* Filters Section */}
        <div className='flex flex-col md:flex-row items-end justify-between gap-md'>
          <SearchInput
            placeholder='Buscar por nome do serviço...'
            value={searchTerm}
            onChange={setSearchTerm}
            className='w-full md:max-w-[400px]'
          />

          <div className='space-y-2 w-full md:w-auto'>
            <CalendarDropdown
              value={selectedDate}
              onChange={setSelectedDate}
              label="Selecione uma data"
              maxDate={new Date()}
            />

          </div>
        </div>

        {/* List Section */}
        <SchedulingList 
          items={filteredSchedulings} 
          onItemClick={(id) => navigate(ROUTES.TECHNICIAN_SCHEDULING_DETAILS.replace(":id", id))}
        />
      </div>
    </MainLayout>
  );
};

export default Agendamentos;
