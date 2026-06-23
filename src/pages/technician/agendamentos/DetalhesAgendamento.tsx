import {
  ArrowLeft,
  ArrowRight,
  Beaker,
  Bug,
  Check,
  ChevronDown,
  ChevronLeft,
  IdCard,
  MapPin,
  Phone,
  Plus,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/atomic/atm.badge/badge.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Checkbox } from "@/atomic/atm.checkbox/checkbox.component";
import { DetailItem } from "@/atomic/atm.detail-item/detail-item.component";
import { FileUpload } from "@/atomic/atm.file-upload";
import { SelectInput } from "@/atomic/atm.select-input/select-input.component";
import { SelectorGroup } from "@/atomic/atm.selector-group";
import { Separator } from "@/atomic/atm.separator/separator.component";
import { TextInput } from "@/atomic/atm.text-input/text-input.component";
import { TextareaInput } from "@/atomic/atm.textarea-input/textarea-input.component";
import { Body1, Body2, H1, H3, H4 } from "@/atomic/atm.typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/atomic/mol.accordion/accordion.component";
import { Card, CardContent } from "@/atomic/mol.card/card.component";
import { Popover, PopoverContent, PopoverTrigger } from "@/atomic/mol.popover/popover.component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/atomic/mol.table/table.component";
import { AgendamentoHeader } from "@/atomic/org.agendamento-header";
import { MonitoringPointContainer } from "@/atomic/org.monitoring-point";
import { RodentStationContainer } from "@/atomic/org.rodent-station";
import { ServicoFotos } from "@/atomic/org.servico-fotos";
import { ServicoHeader } from "@/atomic/org.servico-header";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const DetalhesAgendamento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isStarted, setIsStarted] = useState(false);
  const isMobile = useIsMobile();

  // MOCK: Em uma aplicação real, buscaríamos os dados pelo ID
  const MOCK_AGENDAMENTOS = [
    {
      id: "1",
      osNumber: "OS-2025-001",
      status: "Agendada",
      clientName: "João Silva de Jesus da Souza",
      cpf: "000.000.000-00",
      phone: "(11) 0000-0000",
      address: "Rio da Dona, 139, 44380-00, Cruz das Almas - Ba",
      serviceType: "Controle de Pragas e Vetores",
      technician: "João Carlos Silva",
      date: "03/12/2025",
      time: "08:00",
      value: "R$ 400,00",
    },
    {
      id: "2",
      osNumber: "OS-2025-002",
      status: "Agendada",
      clientName: "Maria Santos",
      cpf: "111.111.111-11",
      phone: "(11) 9999-9999",
      address: "Av. Principal, 123 - Centro",
      serviceType: "Limpeza de caixa d'água",
      technician: "João Carlos Silva",
      date: "04/12/2025",
      time: "10:30",
      value: "R$ 250,00",
    },
    {
      id: "3",
      osNumber: "OS-2025-003",
      status: "Agendada",
      clientName: "Condomínio Solar",
      cpf: "222.222.222-22",
      phone: "(11) 8888-8888",
      address: "Rua das Flores, 456 - Jardim",
      serviceType: "Desinsetização",
      technician: "João Carlos Silva",
      date: "05/12/2025",
      time: "14:00",
      value: "R$ 800,00",
    },
    {
      id: "4",
      osNumber: "OS-2025-004",
      status: "Agendada",
      clientName: "Academia Fit",
      cpf: "333.333.333-33",
      phone: "(11) 7777-7777",
      address: "Rua da Saúde, 789 - Centro",
      serviceType: "Higienização",
      technician: "João Carlos Silva",
      date: "06/12/2025",
      time: "16:00",
      value: "R$ 500,00",
    },
    {
      id: "5",
      osNumber: "OS-2025-005",
      status: "Agendada",
      clientName: "Restaurante Gourmet",
      cpf: "444.444.444-44",
      phone: "(11) 6666-6666",
      address: "Rua do Sabor, 101 - Gastronomia",
      serviceType: "Monitoramento de Insetos",
      technician: "João Carlos Silva",
      date: "07/12/2025",
      time: "18:00",
      value: "R$ 350,00",
    },
    {
      id: "6",
      osNumber: "OS-2025-006",
      status: "Agendada",
      clientName: "Armazém Central",
      cpf: "555.555.555-55",
      phone: "(11) 5555-5555",
      address: "Av. Industrial, 500 - Galpão 3",
      serviceType: "Monitoramento de Roedores",
      technician: "João Carlos Silva",
      date: "08/12/2025",
      time: "19:30",
      value: "R$ 600,00",
    },
  ];

  const agendamento = MOCK_AGENDAMENTOS.find((a) => a.id === id) || MOCK_AGENDAMENTOS[0];

  const [selectedPests, setSelectedPests] = useState<string[]>(["Aranha"]);

  const pests = [
    "Aranha",
    "Barata",
    "Camundongo",
    "Cupim",
    "Formiga",
    "Mosca",
    "Mosquito",
    "Ratazana",
    "Ratos",
    "Pombos",
    "Morcegos",
    "Outros",
  ];

  const togglePest = (pest: string) => {
    setSelectedPests((prev) =>
      prev.includes(pest) ? prev.filter((p) => p !== pest) : [...prev, pest],
    );
  };

  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const equipmentOptions = [
    "Bomba de sucção",
    "Mangueira P",
    "Mangueira G",
    "Lava-jato",
    "Bombona",
    "Cinto de segurança",
    "Extensão de luz",
    "Escada P",
    "Escada G",
  ];

  const toggleEquipment = (equipment: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipment) ? prev.filter((e) => e !== equipment) : [...prev, equipment],
    );
  };

  const [areaExterna, setAreaExterna] = useState<string[]>([]);
  const areaExternaOptions = [
    "Não há",
    "Pavimentada",
    "Não Pavimentada",
    "Sem conservação",
    "Animais domésticos",
    "Outros",
  ];

  const toggleAreaExterna = (option: string) => {
    setAreaExterna((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );
  };

  const [areaVicinal, setAreaVicinal] = useState<string[]>([]);
  const areaVicinalOptions = [
    "Área Construída",
    "Terreno Baldio",
    "Riachos, canais",
    "Mata",
    "Animais domésticos",
  ];

  const toggleAreaVicinal = (option: string) => {
    setAreaVicinal((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );
  };

  const [uploadedFilesAntes, setUploadedFilesAntes] = useState<File[]>([]);
  const [uploadedFilesDepois, setUploadedFilesDepois] = useState<File[]>([]);
  const [hasPool, setHasPool] = useState<boolean | undefined>(undefined);
  const [hasPet, setHasPet] = useState<boolean | undefined>(undefined);
  const [localHygiene, setLocalHygiene] = useState<boolean | undefined>(undefined);
  const [hasRain, setHasRain] = useState<boolean | undefined>(undefined);
  const [performCollection, setPerformCollection] = useState<boolean | undefined>(undefined);
  const [closeRegistry, setCloseRegistry] = useState<boolean | undefined>(undefined);
  const [reservoirInstallation, setReservoirInstallation] = useState<boolean | undefined>(
    undefined,
  );

  const [floatCondition, setFloatCondition] = useState<string | undefined>(undefined);
  const [coverageCondition, setCoverageCondition] = useState<string | undefined>(undefined);
  const [reservoirStructure, setReservoirStructure] = useState<string | undefined>(undefined);
  const [paintingCondition, setPaintingCondition] = useState<string | undefined>(undefined);
  const [internalCoating, setInternalCoating] = useState<string | undefined>(undefined);
  const [overflowSystem, setOverflowSystem] = useState<string | undefined>(undefined);

  const [monitoringPoints, setMonitoringPoints] = useState<number[]>([1, 2, 3]);
  const [rodentStations, setRodentStations] = useState<number[]>([1, 2, 3]);

  const removePoint = (pointIdToRemove: number) => {
    setMonitoringPoints((prev) => prev.filter((id) => id !== pointIdToRemove));
  };

  const removeRodentStation = (stationIdToRemove: number) => {
    setRodentStations((prev) => prev.filter((id) => id !== stationIdToRemove));
  };

  return (
    <MainLayout>
      <div
        className={cn(
          "flex flex-col gap-lg pb-xl",
          isMobile && "bg-grayscale-x-light -mx-lg -mt-xl p-lg pt-xl min-h-screen",
        )}
      >
        {/* Back Link */}
        <Button
          variant="link"
          className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs"
          onClick={() => navigate(ROUTES.TECHNICIAN_SCHEDULING)}
        >
          <ChevronLeft size={20} />
          Voltar para Agendamentos
        </Button>

        {/* Header */}
        <div className="flex flex-col gap-xs">
          <H1>Detalhes do Agendamento</H1>
          <Body2 className="text-muted-foreground">Visualize informações sobre o agendamento</Body2>
        </div>

        {/* Client Info Header Card */}
        <AgendamentoHeader agendamento={agendamento}>
          {!isStarted && (
            <ServicoHeader agendamento={agendamento} onStart={() => setIsStarted(true)} />
          )}
        </AgendamentoHeader>

        {isStarted &&
          agendamento.serviceType !== "Monitoramento de Insetos" &&
          agendamento.serviceType !== "Monitoramento de Roedores" && (
            <div className="flex flex-col gap-lg">
              {/* Diagnóstico do Local */}
              <Card className="rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl">
                <div className="flex flex-col gap-md">
                  <H3 className="text-grayscale-dark font-bold text-lg">Diagnóstico do Local</H3>

                  <div className="flex flex-col gap-sm">
                    <Body2 className="font-medium text-grayscale-dark">
                      {agendamento.serviceType === "Higienização"
                        ? "Tipo de equipamento"
                        : "Praga-alvo"}
                    </Body2>
                    {isMobile ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="flex h-[55px] w-full items-center justify-between rounded-lg border border-grayscale-light bg-background px-md text-xs font-medium transition-all hover:border-grayscale-medium"
                          >
                            <span
                              className={cn(
                                "truncate",
                                agendamento.serviceType === "Higienização"
                                  ? selectedEquipment.length > 0
                                    ? "text-grayscale-x-dark"
                                    : "text-grayscale-medium"
                                  : selectedPests.length > 0
                                    ? "text-grayscale-x-dark"
                                    : "text-grayscale-medium",
                              )}
                            >
                              {agendamento.serviceType === "Higienização"
                                ? selectedEquipment.length > 0
                                  ? selectedEquipment.join(", ")
                                  : "Selecione os equipamentos"
                                : selectedPests.length > 0
                                  ? selectedPests.join(", ")
                                  : "Selecione as pragas"}
                            </span>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-full min-w-[var(--radix-popover-trigger-width)] p-0"
                          align="start"
                        >
                          <div className="flex flex-col p-xs">
                            {(agendamento.serviceType === "Higienização"
                              ? equipmentOptions
                              : pests
                            ).map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() =>
                                  agendamento.serviceType === "Higienização"
                                    ? toggleEquipment(item)
                                    : togglePest(item)
                                }
                                className="flex items-center gap-sm px-sm py-xs hover:bg-grayscale-light/10 rounded-sm transition-colors text-left"
                              >
                                <Checkbox
                                  checked={
                                    agendamento.serviceType === "Higienização"
                                      ? selectedEquipment.includes(item)
                                      : selectedPests.includes(item)
                                  }
                                  onCheckedChange={() =>
                                    agendamento.serviceType === "Higienização"
                                      ? toggleEquipment(item)
                                      : togglePest(item)
                                  }
                                />
                                <span className="text-xs text-grayscale-dark">{item}</span>
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <div className="flex flex-wrap gap-sm">
                        {(agendamento.serviceType === "Higienização"
                          ? equipmentOptions
                          : pests
                        ).map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() =>
                              agendamento.serviceType === "Higienização"
                                ? toggleEquipment(item)
                                : togglePest(item)
                            }
                            className={cn(
                              "flex items-center gap-xs px-md py-xs rounded-md border text-xs font-medium transition-all",
                              (
                                agendamento.serviceType === "Higienização"
                                  ? selectedEquipment.includes(item)
                                  : selectedPests.includes(item)
                              )
                                ? "bg-brand-cta-dark text-white border-brand-cta-dark"
                                : "bg-white text-grayscale-dark border-grayscale-light hover:border-grayscale-medium",
                            )}
                          >
                            {(agendamento.serviceType === "Higienização"
                              ? selectedEquipment.includes(item)
                              : selectedPests.includes(item)) && <Check size={14} />}
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {agendamento.serviceType === "Higienização" && (
                    <>
                      <SelectorGroup
                        label="Chuva"
                        value={hasRain}
                        onChange={setHasRain}
                        options={[
                          { label: "Sim", value: true },
                          { label: "Não", value: false },
                        ]}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        <TextInput label="Tempo de duração estimado" placeholder="Ex: 2 horas" />
                        <TextInput label="Número de Técnicos" placeholder="Ex: 2" type="number" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        <SelectorGroup
                          label="Realizar coleta"
                          value={performCollection}
                          onChange={setPerformCollection}
                          options={[
                            { label: "Sim", value: true },
                            { label: "Não", value: false },
                          ]}
                        />
                        <SelectorGroup
                          label="Fechar registro"
                          value={closeRegistry}
                          onChange={setCloseRegistry}
                          options={[
                            { label: "Sim", value: true },
                            { label: "Não", value: false },
                          ]}
                        />
                      </div>

                      <Separator className="bg-muted-foreground/20" />

                      <div className="flex flex-col gap-sm">
                        <H3 className="text-grayscale-dark font-bold text-lg">
                          Foto do local do serviço
                        </H3>
                        <Body2 className="text-muted-foreground">
                          Anexe uma foto para cada item: fachada do local, estrutura do ambiente e
                          localização da caixa d’água (incluindo o acesso a ela).
                        </Body2>
                      </div>

                      <FileUpload
                        id="fotos-local-servico"
                        onFilesChange={(files) => console.log("Local files:", files)}
                      />
                    </>
                  )}

                  {agendamento.serviceType === "Controle de Pragas e Vetores" && (
                    <>
                      <Separator className="bg-muted-foreground/20" />
                      <H3 className="text-grayscale-dark font-bold text-lg">
                        Características do Local
                      </H3>
                      <TextInput
                        label="Ponto de referência"
                        placeholder="Informe um ponto de referência"
                        className="w-full"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        <SelectorGroup
                          label="Piscina"
                          value={hasPool}
                          onChange={setHasPool}
                          options={[
                            { label: "Sim", value: true },
                            { label: "Não", value: false },
                          ]}
                        />
                        <SelectorGroup
                          label="Pet"
                          value={hasPet}
                          onChange={setHasPet}
                          options={[
                            { label: "Sim", value: true },
                            { label: "Não", value: false },
                          ]}
                        />
                      </div>
                    </>
                  )}

                  {!["Controle de Pragas e Vetores", "Higienização"].includes(
                    agendamento.serviceType,
                  ) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div className="space-y-2 w-full">
                        <div className="flex items-center justify-between gap-xs">
                          <label className="w-full">
                            <p className="text-xs font-normal">Área externa</p>
                          </label>
                        </div>
                        <Separator className="h-[1px] bg-grayscale-light/20" />
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="flex h-[55px] w-full items-center justify-between rounded-lg border border-grayscale-light bg-background px-md text-xs transition-all hover:border-grayscale-medium"
                            >
                              <span
                                className={cn(
                                  "truncate",
                                  areaExterna.length > 0
                                    ? "text-grayscale-x-dark"
                                    : "text-grayscale-medium",
                                )}
                              >
                                {areaExterna.length > 0
                                  ? areaExterna.join(", ")
                                  : "Selecione o tipo"}
                              </span>
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-full min-w-[var(--radix-popover-trigger-width)] p-0"
                            align="start"
                          >
                            <div className="flex flex-col p-xs">
                              {areaExternaOptions.map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => toggleAreaExterna(option)}
                                  className="flex items-center gap-sm px-sm py-xs hover:bg-grayscale-light/10 rounded-sm transition-colors text-left"
                                >
                                  <Checkbox
                                    checked={areaExterna.includes(option)}
                                    onCheckedChange={() => toggleAreaExterna(option)}
                                  />
                                  <span className="text-xs text-grayscale-dark">{option}</span>
                                </button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2 w-full">
                        <div className="flex items-center justify-between gap-xs">
                          <label className="w-full">
                            <p className="text-xs font-normal">Área Vicinal</p>
                          </label>
                        </div>
                        <Separator className="h-[1px] bg-grayscale-light/20" />
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              className="flex h-[55px] w-full items-center justify-between rounded-lg border border-grayscale-light bg-background px-md text-xs transition-all hover:border-grayscale-medium"
                            >
                              <span
                                className={cn(
                                  "truncate",
                                  areaVicinal.length > 0
                                    ? "text-grayscale-x-dark"
                                    : "text-grayscale-medium",
                                )}
                              >
                                {areaVicinal.length > 0
                                  ? areaVicinal.join(", ")
                                  : "Selecione o tipo"}
                              </span>
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-full min-w-[var(--radix-popover-trigger-width)] p-0"
                            align="start"
                          >
                            <div className="flex flex-col p-xs">
                              {areaVicinalOptions.map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => toggleAreaVicinal(option)}
                                  className="flex items-center gap-sm px-sm py-xs hover:bg-grayscale-light/10 rounded-sm transition-colors text-left"
                                >
                                  <Checkbox
                                    checked={areaVicinal.includes(option)}
                                    onCheckedChange={() => toggleAreaVicinal(option)}
                                  />
                                  <span className="text-xs text-grayscale-dark">{option}</span>
                                </button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Dados do Produto / Reservatório */}
              {agendamento.serviceType === "Higienização" ? (
                <Card className="rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl">
                  <div className="flex flex-col gap-md">
                    <H3 className="text-grayscale-dark font-bold text-lg">Reservatório</H3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div className="md:col-span-2">
                        <TextInput label="Localização" placeholder="Informe a localização" />
                      </div>
                      <SelectInput
                        label="Material do Reservatório"
                        placeholder="Selecione o material"
                        options={[
                          { label: "Concreto", value: "concreto" },
                          { label: "Fibra", value: "fibra" },
                          { label: "Amianto", value: "amianto" },
                          { label: "PVC", value: "pvc" },
                          { label: "Fibrocimento", value: "fibrocimento" },
                        ]}
                      />
                      <TextInput
                        label="Volume do reservatório (em litros)"
                        placeholder="Ex: 500"
                        type="number"
                      />
                      <TextInput label="Desinfecção(g)" placeholder="Ex: 10" />
                      <SelectInput
                        label="Situação do reservatórios"
                        placeholder="Selecione a situação"
                        options={[
                          { label: "Externo", value: "externo" },
                          { label: "Interno", value: "interno" },
                          { label: "Enterrada", value: "enterrada" },
                          { label: "Semi-enterrada", value: "semi-enterrada" },
                        ]}
                      />
                      <SelectorGroup
                        label="Instalação do reservatório"
                        value={reservoirInstallation}
                        onChange={setReservoirInstallation}
                        options={[
                          { label: "Correto", value: true },
                          { label: "Incorreto", value: false },
                        ]}
                      />
                    </div>

                    <Separator className="bg-muted-foreground/20" />
                    <H3 className="text-grayscale-dark font-bold text-lg">
                      Condições dos componentes
                    </H3>

                    <div className="flex flex-col gap-md">
                      <SelectorGroup
                        label="Condições da boia"
                        value={floatCondition}
                        onChange={setFloatCondition}
                        options={[
                          { label: "Bom estado", value: "bom" },
                          { label: "Comprometida", value: "comprometida" },
                        ]}
                      />
                      <SelectorGroup
                        label="Condições da cobertura"
                        value={coverageCondition}
                        onChange={setCoverageCondition}
                        options={[
                          { label: "Totalmente coberta", value: "total" },
                          { label: "Parcialmente", value: "parcial" },
                          { label: "Coberta", value: "coberta" },
                        ]}
                      />
                      <SelectorGroup
                        label="Estrutura do reservatório"
                        value={reservoirStructure}
                        onChange={setReservoirStructure}
                        options={[
                          { label: "Bom estado", value: "bom" },
                          { label: "Comprometida", value: "comprometida" },
                        ]}
                      />
                      <SelectorGroup
                        label="Pintura"
                        value={paintingCondition}
                        onChange={setPaintingCondition}
                        options={[
                          { label: "Bom estado", value: "bom" },
                          { label: "Comprometida", value: "comprometida" },
                        ]}
                      />
                      <SelectorGroup
                        label="Revestimento interno"
                        value={internalCoating}
                        onChange={setInternalCoating}
                        options={[
                          { label: "Bom estado", value: "bom" },
                          { label: "Ruim", value: "ruim" },
                        ]}
                      />
                      <SelectorGroup
                        label="Sistema de ladrão"
                        value={overflowSystem}
                        onChange={setOverflowSystem}
                        options={[
                          { label: "Correto", value: "correto" },
                          { label: "Incorreto", value: "incorreto" },
                        ]}
                      />
                    </div>

                    <Button
                      variant="link"
                      className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium"
                    >
                      <Plus size={16} />
                      Adicionar novo reservatório
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl">
                  <div className="flex flex-col gap-md">
                    <H3 className="text-grayscale-dark font-bold text-lg">Dados do Produto</H3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      {agendamento.serviceType === "Controle de Pragas e Vetores" ? (
                        <>
                          <TextInput
                            label="Princípio Ativo"
                            placeholder="Digite o princípio ativo"
                          />
                          <TextInput label="Concentração" placeholder="Digite a concentração" />
                          <TextInput label="Diluente" placeholder="Digite o diluente" />
                          <TextInput label="Volume" placeholder="Digite o volume" />
                          <TextInput label="Setor" placeholder="Digite o setor" />
                          <TextInput
                            label="Equipamento utilizado"
                            placeholder="Digite o equipamento"
                          />
                        </>
                      ) : (
                        <>
                          <TextInput
                            label="Princípio Ativo"
                            placeholder="Digite o princípio ativo"
                          />
                          <TextInput label="Produto" placeholder="Digite o nome do produto" />
                          <TextInput label="Diluente" placeholder="Digite o diluente" />
                          <TextInput label="Volume" placeholder="Digite o volume" />
                          <TextInput label="Setor" placeholder="Digite o setor" />
                          <TextInput label="Equipamento" placeholder="Digite o equipamento" />
                          <TextInput
                            label="Registro MS"
                            placeholder="Informe o registro"
                            className="md:col-span-1"
                          />
                        </>
                      )}
                    </div>

                    <Button
                      variant="link"
                      className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium"
                    >
                      <Plus size={16} />
                      Adicionar outro produto
                    </Button>
                  </div>
                </Card>
              )}

              {/* Vistoria / Descrição do Serviço */}
              {agendamento.serviceType === "Controle de Pragas e Vetores" && (
                <Card className="rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl">
                  <div className="flex flex-col gap-md">
                    <H3 className="text-grayscale-dark font-bold text-lg">Descrição do serviço</H3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <TextInput label="Setor" placeholder="Digite o setor" />
                      <SelectorGroup
                        label="Higiene do local"
                        value={localHygiene}
                        onChange={setLocalHygiene}
                        options={[
                          { label: "Boa", value: true },
                          { label: "Ruim", value: false },
                        ]}
                      />
                      <TextInput label="Nível de infestação" placeholder="Informe o nível" />
                      <TextInput label="Equipamento utilizado" placeholder="Digite o equipamento" />
                    </div>

                    <Button
                      variant="link"
                      className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium"
                    >
                      <Plus size={16} />
                      Adicionar novo setor
                    </Button>
                  </div>
                </Card>
              )}

              {!["Controle de Pragas e Vetores", "Higienização"].includes(
                agendamento.serviceType,
              ) && (
                <Card className="rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl">
                  <div className="flex flex-col gap-md">
                    <H3 className="text-grayscale-dark font-bold text-lg">Vistoria</H3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <TextInput label="Setor" placeholder="Digite o setor" />
                      <TextInput label="Situação" placeholder="Informe a situação" />
                      <TextInput label="Medida Corretiva" placeholder="Informe a medida" />
                      <SelectInput
                        label="Avaliação"
                        placeholder="Selecione o estado"
                        options={[
                          { label: "Aplicado", value: "aplicado" },
                          { label: "Controlado", value: "controlado" },
                          { label: "Não controlado", value: "nao-controlado" },
                        ]}
                      />
                    </div>

                    <Button
                      variant="link"
                      className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium"
                    >
                      <Plus size={16} />
                      Adicionar novo setor
                    </Button>
                  </div>
                </Card>
              )}

              {/* Fotos do Serviço Compartilhado */}
              <ServicoFotos
                onFilesAntesChange={setUploadedFilesAntes}
                onFilesDepoisChange={setUploadedFilesDepois}
              />

              {/* Footer Actions */}
              <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-md md:gap-xl pt-md">
                <Button
                  variant="link"
                  className="text-feedback-error-medium hover:text-feedback-error-medium/80 hover:no-underline"
                  onClick={() => setIsStarted(false)}
                >
                  Cancelar
                </Button>
                <Button className="bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white w-full md:w-auto md:min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md">
                  <Check className="mr-xs" size={20} />
                  Finalizar serviço
                </Button>
              </div>
            </div>
          )}

        {isStarted && agendamento.serviceType === "Monitoramento de Insetos" && (
          <div className="flex flex-col gap-lg">
            <div className="flex flex-col gap-md">
              <H3 className="text-grayscale-dark font-bold text-lg">Monitoramento</H3>

              <Accordion type="single" collapsible className="w-full flex flex-col gap-md">
                {monitoringPoints.map((point) => (
                  <AccordionItem
                    key={point}
                    value={`item-${point}`}
                    className="bg-white rounded-large! border border-muted-foreground/20 px-xl"
                  >
                    <AccordionTrigger className="hover:no-underline py-md">
                      <div className="flex items-center justify-between w-full pr-sm">
                        <div className="flex flex-col items-start gap-2xs text-left w-full">
                          <span className="font-bold text-grayscale-dark text-md">
                            Área {point}
                          </span>
                          <div className="flex flex-wrap items-center gap-x-md gap-y-xs text-grayscale-medium text-xs font-normal">
                            <div className="flex items-center gap-xs">
                              <Bug size={14} />
                              <span>Mosca Doméstica; Mosca Varejeira; Mosca Palomilla</span>
                            </div>
                            <div className="flex items-center gap-xs">
                              <Beaker size={14} />
                              <span>Armadilha Luminosa</span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="text-feedback-error-medium hover:text-feedback-error-medium/80 transition-colors z-10 shrink-0 ml-xs cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removePoint(point);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-md pb-xl">
                      <MonitoringPointContainer pointId={point} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-md md:gap-xl pt-md">
              <Button
                variant="link"
                className="text-feedback-error-medium hover:text-feedback-error-medium/80 hover:no-underline"
                onClick={() => setIsStarted(false)}
              >
                Cancelar
              </Button>
              <Button className="bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white w-full md:w-auto md:min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md">
                <Check className="mr-xs" size={20} />
                Finalizar serviço
              </Button>
            </div>
          </div>
        )}

        {isStarted && agendamento.serviceType === "Monitoramento de Roedores" && (
          <div className="flex flex-col gap-lg">
            <div className="flex flex-col gap-md">
              <H3 className="text-grayscale-dark font-bold text-lg">Estações de Monitoramento</H3>

              <Accordion type="single" collapsible className="w-full flex flex-col gap-md">
                {rodentStations.map((station) => (
                  <AccordionItem
                    key={station}
                    value={`station-${station}`}
                    className="bg-white rounded-large! border border-muted-foreground/20 px-xl"
                  >
                    <AccordionTrigger className="hover:no-underline py-md">
                      <div className="flex items-center justify-between w-full pr-sm">
                        <span className="font-bold text-grayscale-dark text-md text-left w-full">
                          Estação {station}
                        </span>
                        <button
                          type="button"
                          className="text-feedback-error-medium hover:text-feedback-error-medium/80 transition-colors z-10 shrink-0 ml-xs cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeRodentStation(station);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-md pb-xl">
                      <RodentStationContainer stationId={station} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-md md:gap-xl pt-md">
              <Button
                variant="link"
                className="text-feedback-error-medium hover:text-feedback-error-medium/80 hover:no-underline"
                onClick={() => setIsStarted(false)}
              >
                Cancelar
              </Button>
              <Button className="bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white w-full md:w-auto md:min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md">
                <Check className="mr-xs" size={20} />
                Finalizar serviço
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DetalhesAgendamento;
