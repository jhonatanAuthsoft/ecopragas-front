import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { serverRequest } from "@/rest/server-request";
import { Body2, H1 } from "@/atomic/atm.typography";
import { CalendarDropdown } from "@/atomic/mol.calendar-dropdown";
import { SearchInput } from "@/atomic/mol.search/search.component";
import { SchedulingList } from "@/atomic/obj.scheduling-list";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import type { SchedulingCardProps } from "@/atomic/obj.scheduling-card";

const mapStatus = (status: string): SchedulingCardProps["status"] => {
  switch (status) {
    case "AGENDADO":
      return "Agendada";
    case "EM_ANDAMENTO":
      return "Em Andamento";
    case "CONCLUIDO":
      return "Concluída";
    case "CANCELADO":
      return "Cancelada";
    default:
      return "Agendada";
  }
};

const Agendamentos = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [schedulings, setSchedulings] = useState<SchedulingCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSchedulings = async () => {
      if (!selectedDate) return;
      setIsLoading(true);
      try {
        const periodo = format(selectedDate, "yyyy-MM-dd");
        const response = await serverRequest.get("/tecnico/agenda", {
          params: { periodo },
        });

        if (response.data.success) {
          const formattedData: SchedulingCardProps[] = response.data.data.map((item: any) => ({
            id: item.id,
            time: format(new Date(item.dataHoraServico), "HH:mm"),
            title: item.tipoServico,
            status: mapStatus(item.status),
            clientName: item.clienteNome,
            phone: "", // Not provided in API
            address: `${item.rua}, ${item.numero} - ${item.bairro}, ${item.cidade} - ${item.estado}`,
          }));
          setSchedulings(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch schedulings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedulings();
  }, [selectedDate]);

  const filteredSchedulings = schedulings.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-xl">
        {/* Header Section */}
        <div className="flex flex-col gap-xs">
          <H1>Agendamentos</H1>
          <Body2 className="text-muted-foreground">Gerencie a agenda de serviços</Body2>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-md">
          <SearchInput
            placeholder="Buscar por nome do serviço..."
            value={searchTerm}
            onChange={setSearchTerm}
            className="w-full md:max-w-[400px]"
          />

          <div className="space-y-2 w-full md:w-auto">
            <CalendarDropdown
              value={selectedDate}
              onChange={setSelectedDate}
              label="Selecione uma data"
              maxDate={new Date()}
              allowRange={false}
            />
          </div>
        </div>

        {/* List Section */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Body2 className="text-muted-foreground">Carregando agendamentos...</Body2>
          </div>
        ) : filteredSchedulings.length > 0 ? (
          <SchedulingList
            items={filteredSchedulings}
            onItemClick={(id) => navigate(ROUTES.TECHNICIAN_SCHEDULING_DETAILS.replace(":id", id))}
          />
        ) : (
          <div className="flex justify-center py-8">
            <Body2 className="text-muted-foreground">
              Nenhum agendamento encontrado para esta data.
            </Body2>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Agendamentos;
