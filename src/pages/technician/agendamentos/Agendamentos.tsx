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
      time: '08:00',
      title: 'Controle de Pragas e Vetores',
      status: 'Em Andamento' as const,
      clientName: 'João Silva de Jesus da Souza',
      phone: '(11) 0000-0000',
      address: 'Rio da Dona, 139, 44380-00, Cruz das Almas - Ba',
    },
    {
      id: '2',
      time: '10:30',
      title: "Limpeza de caixa d'água",
      status: 'Agendada' as const,
      clientName: 'Maria Santos',
      phone: '(11) 9999-9999',
      address: 'Av. Principal, 123 - Centro',
    },
    {
      id: '3',
      time: '14:00',
      title: 'Desinsetização',
      status: 'Agendada' as const,
      clientName: 'Condomínio Solar',
      phone: '(11) 8888-8888',
      address: 'Rua das Flores, 456 - Jardim',
    },
    {
      id: '4',
      time: '16:00',
      title: 'Higienização',
      status: 'Agendada' as const,
      clientName: 'Academia Fit',
      phone: '(11) 7777-7777',
      address: 'Rua da Saúde, 789 - Centro',
    },
    {
      id: '5',
      time: '18:00',
      title: 'Monitoramento de Insetos',
      status: 'Agendada' as const,
      clientName: 'Restaurante Gourmet',
      phone: '(11) 6666-6666',
      address: 'Rua do Sabor, 101 - Gastronomia',
    },
    {
      id: '6',
      time: '19:30',
      title: 'Monitoramento de Roedores',
      status: 'Agendada' as const,
      clientName: 'Armazém Central',
      phone: '(11) 5555-5555',
      address: 'Av. Industrial, 500 - Galpão 3',
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
