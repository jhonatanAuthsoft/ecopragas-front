import { format } from "date-fns";
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
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
import { serverRequest } from "@/rest/server-request";
import { formatCPFCNPJ, formatPhone, formatTipoServico } from "@/utils/formatters";
import { formatOsNumero } from "@/utils/ordem-servico";

const mapStatus = (status: string) => {
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

const DetalhesAgendamento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isStarted, setIsStarted] = useState(false);
  const isMobile = useIsMobile();

  const [agendamento, setAgendamento] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgendamento = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await serverRequest.get(`/tecnico/agenda/${id}`);
        if (response.data.success) {
          const data = response.data.data;

          const formatToBRL = (value: number) => {
            return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
              value,
            );
          };

          const mappedAgendamento = {
            id: data.id,
            osNumber: formatOsNumero(data.osNumero),
            status: mapStatus(data.status || ""),
            clientName: data.clienteNome,
            cpf: data.clienteCpfCnpj ? formatCPFCNPJ(data.clienteCpfCnpj) : "-",
            phone: data.clienteTelefone ? formatPhone(data.clienteTelefone) : "-",
            address: `${data.rua || ""}, ${data.numero || ""} - ${data.bairro || ""}, ${data.cidade || ""} - ${data.estado || ""}`,
            serviceType: formatTipoServico(data.tipoServico),
            technician:
              data.tecnicos && data.tecnicos.length > 0 ? data.tecnicos[0].nome : "Não definido",
            date: data.dataHoraServico ? format(new Date(data.dataHoraServico), "dd/MM/yyyy") : "",
            time: data.dataHoraServico ? format(new Date(data.dataHoraServico), "HH:mm") : "",
            value: formatToBRL(data.valor || 0),
          };
          setAgendamento(mappedAgendamento);
        }
      } catch (error) {
        console.error("Failed to fetch agendamento:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgendamento();
  }, [id]);

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
  const [fotosLocal, setFotosLocal] = useState<File[]>([]);
  const [hasPool, setHasPool] = useState<boolean | undefined>(undefined);
  const [hasPet, setHasPet] = useState<boolean | undefined>(undefined);
  const [localHygiene, setLocalHygiene] = useState<boolean | undefined>(undefined);
  const [hasRain, setHasRain] = useState<boolean | undefined>(undefined);
  const [performCollection, setPerformCollection] = useState<boolean | undefined>(undefined);
  const [closeRegistry, setCloseRegistry] = useState<boolean | undefined>(undefined);
  type Reservoir = {
    id: string;
    localizacao: string;
    material: string;
    volume: string;
    desinfeccao: string;
    situacao: string;
    instalacaoCorreta: boolean | undefined;
    condicaoBoia: string | undefined;
    condicaoCobertura: string | undefined;
    estrutura: string | undefined;
    pintura: string | undefined;
    revestimentoInterno: string | undefined;
    sistemaLadrao: string | undefined;
  };

  const initialReservoir: Reservoir = {
    id: "",
    localizacao: "",
    material: "",
    volume: "",
    desinfeccao: "",
    situacao: "",
    instalacaoCorreta: undefined,
    condicaoBoia: undefined,
    condicaoCobertura: undefined,
    estrutura: undefined,
    pintura: undefined,
    revestimentoInterno: undefined,
    sistemaLadrao: undefined,
  };

  const [reservoirs, setReservoirs] = useState<Reservoir[]>([]);
  const [currentReservoir, setCurrentReservoir] = useState<Reservoir>({
    ...initialReservoir,
    id: "draft",
  });

  const addReservoir = () => {
    setReservoirs((prev) => [...prev, { ...currentReservoir, id: Date.now().toString() }]);
    setCurrentReservoir({ ...initialReservoir, id: "draft" });
  };

  const removeReservoir = (id: string) => {
    setReservoirs((prev) => prev.filter((r) => r.id !== id));
  };

  const updateReservoir = (
    id: string,
    field: keyof Reservoir,
    value: string | boolean | string[] | File[],
  ) => {
    setReservoirs((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const updateCurrentReservoir = (
    field: keyof Reservoir,
    value: string | boolean | string[] | File[],
  ) => {
    setCurrentReservoir((prev) => ({ ...prev, [field]: value }));
  };

  const [monitoringPoints, setMonitoringPoints] = useState<number[]>([1, 2, 3]);
  const [rodentStations, setRodentStations] = useState<number[]>([1, 2, 3]);
  const [monitoringPointsData, setMonitoringPointsData] = useState<Record<number, any>>({});
  const [rodentStationsData, setRodentStationsData] = useState<Record<number, any>>({});

  const removePoint = (pointIdToRemove: number) => {
    setMonitoringPoints((prev) => prev.filter((id) => id !== pointIdToRemove));
  };

  const removeRodentStation = (stationIdToRemove: number) => {
    setRodentStations((prev) => prev.filter((id) => id !== stationIdToRemove));
  };

  const [pontoReferencia, setPontoReferencia] = useState("");
  const [tempoDuracaoEstimado, setTempoDuracaoEstimado] = useState("");
  const [numeroTecnicos, setNumeroTecnicos] = useState("");
  type Product = {
    id: string;
    principioAtivo: string;
    produto: string;
    concentracao: string;
    diluente: string;
    volume: string;
    setor: string;
    equipamento: string;
    registroMs: string;
  };

  const initialProduct: Product = {
    id: "",
    principioAtivo: "",
    produto: "",
    concentracao: "",
    diluente: "",
    volume: "",
    setor: "",
    equipamento: "",
    registroMs: "",
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>({ ...initialProduct, id: "draft" });

  const addProduct = () => {
    setProducts((prev) => [...prev, { ...currentProduct, id: Date.now().toString() }]);
    setCurrentProduct({ ...initialProduct, id: "draft" });
  };

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id: string, field: keyof Product, value: string | string[] | File[]) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const updateCurrentProduct = (field: keyof Product, value: string | string[] | File[]) => {
    setCurrentProduct((prev) => ({ ...prev, [field]: value }));
  };
  type DescricaoServico = {
    id: string;
    setor: string;
    higieneLocal: boolean | undefined;
    nivelInfestacao: string;
    equipamento: string;
  };

  const initialDescricao: DescricaoServico = {
    id: "",
    setor: "",
    higieneLocal: undefined,
    nivelInfestacao: "",
    equipamento: "",
  };

  const [descricoes, setDescricoes] = useState<DescricaoServico[]>([]);
  const [currentDescricao, setCurrentDescricao] = useState<DescricaoServico>({
    ...initialDescricao,
    id: "draft",
  });

  const addDescricao = () => {
    setDescricoes((prev) => [...prev, { ...currentDescricao, id: Date.now().toString() }]);
    setCurrentDescricao({ ...initialDescricao, id: "draft" });
  };
  const removeDescricao = (id: string) => setDescricoes((prev) => prev.filter((d) => d.id !== id));
  const updateDescricao = (id: string, field: keyof DescricaoServico, value: string) => {
    setDescricoes((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };
  const updateCurrentDescricao = (field: keyof DescricaoServico, value: string) => {
    setCurrentDescricao((prev) => ({ ...prev, [field]: value }));
  };

  type Vistoria = {
    id: string;
    setor: string;
    situacao: string;
    medidaCorretiva: string;
    avaliacao: string;
  };

  const initialVistoria: Vistoria = {
    id: "",
    setor: "",
    situacao: "",
    medidaCorretiva: "",
    avaliacao: "",
  };

  const [vistorias, setVistorias] = useState<Vistoria[]>([]);
  const [currentVistoria, setCurrentVistoria] = useState<Vistoria>({
    ...initialVistoria,
    id: "draft",
  });

  const addVistoria = () => {
    setVistorias((prev) => [...prev, { ...currentVistoria, id: Date.now().toString() }]);
    setCurrentVistoria({ ...initialVistoria, id: "draft" });
  };
  const removeVistoria = (id: string) => setVistorias((prev) => prev.filter((v) => v.id !== id));
  const updateVistoria = (id: string, field: keyof Vistoria, value: string) => {
    setVistorias((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  };
  const updateCurrentVistoria = (field: keyof Vistoria, value: string) => {
    setCurrentVistoria((prev) => ({ ...prev, [field]: value }));
  };
  const [observacoesGerais, setObservacoesGerais] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const renderReservoirForm = (
    res: Reservoir,
    onChange: (field: keyof Reservoir, value: string | boolean | string[] | File[]) => void,
  ) => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div className="md:col-span-2">
          <TextInput
            label="Localização"
            placeholder="Informe a localização"
            value={res.localizacao}
            onChange={(v) => onChange("localizacao", v)}
          />
        </div>
        <SelectInput
          label="Material do Reservatório"
          placeholder="Selecione o material"
          value={res.material}
          onChange={(v) => onChange("material", v)}
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
          value={res.volume}
          onChange={(v) => onChange("volume", v)}
        />
        <TextInput
          label="Desinfecção(g)"
          placeholder="Ex: 10"
          value={res.desinfeccao}
          onChange={(v) => onChange("desinfeccao", v)}
        />
        <SelectInput
          label="Situação do reservatórios"
          placeholder="Selecione a situação"
          value={res.situacao}
          onChange={(v) => onChange("situacao", v)}
          options={[
            { label: "Externo", value: "externo" },
            { label: "Interno", value: "interno" },
            { label: "Enterrada", value: "enterrada" },
            { label: "Semi-enterrada", value: "semi-enterrada" },
          ]}
        />
        <SelectorGroup
          label="Instalação do reservatório"
          value={res.instalacaoCorreta}
          onChange={(v) => onChange("instalacaoCorreta", v)}
          options={[
            { label: "Correto", value: true },
            { label: "Incorreto", value: false },
          ]}
        />
      </div>

      <Separator className="bg-muted-foreground/20" />
      <H3 className="text-grayscale-dark font-bold text-lg">Condições dos componentes</H3>

      <div className="flex flex-col gap-md">
        <SelectorGroup
          label="Condições da boia"
          value={res.condicaoBoia}
          onChange={(v) => onChange("condicaoBoia", v)}
          options={[
            { label: "Bom estado", value: "bom" },
            { label: "Comprometida", value: "comprometida" },
          ]}
        />
        <SelectorGroup
          label="Condições da cobertura"
          value={res.condicaoCobertura}
          onChange={(v) => onChange("condicaoCobertura", v)}
          options={[
            { label: "Totalmente coberta", value: "total" },
            { label: "Parcialmente", value: "parcial" },
            { label: "Coberta", value: "coberta" },
          ]}
        />
        <SelectorGroup
          label="Estrutura do reservatório"
          value={res.estrutura}
          onChange={(v) => onChange("estrutura", v)}
          options={[
            { label: "Bom estado", value: "bom" },
            { label: "Comprometida", value: "comprometida" },
          ]}
        />
        <SelectorGroup
          label="Pintura"
          value={res.pintura}
          onChange={(v) => onChange("pintura", v)}
          options={[
            { label: "Bom estado", value: "bom" },
            { label: "Comprometida", value: "comprometida" },
          ]}
        />
        <SelectorGroup
          label="Revestimento interno"
          value={res.revestimentoInterno}
          onChange={(v) => onChange("revestimentoInterno", v)}
          options={[
            { label: "Bom estado", value: "bom" },
            { label: "Ruim", value: "ruim" },
          ]}
        />
        <SelectorGroup
          label="Sistema de ladrão"
          value={res.sistemaLadrao}
          onChange={(v) => onChange("sistemaLadrao", v)}
          options={[
            { label: "Correto", value: "correto" },
            { label: "Incorreto", value: "incorreto" },
          ]}
        />
      </div>
    </>
  );

  const renderProductForm = (
    prod: Product,
    onChange: (field: keyof Product, value: string | string[] | File[]) => void,
  ) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
      <TextInput
        label="Princípio Ativo"
        placeholder="Digite o princípio ativo"
        value={prod.principioAtivo}
        onChange={(v) => onChange("principioAtivo", v)}
      />
      {agendamento?.serviceType !== "Controle de Pragas e Vetores" && (
        <TextInput
          label="Produto"
          placeholder="Digite o nome do produto"
          value={prod.produto}
          onChange={(v) => onChange("produto", v)}
        />
      )}
      <TextInput
        label="Concentração"
        placeholder="Digite a concentração"
        value={prod.concentracao}
        onChange={(v) => onChange("concentracao", v)}
      />
      <TextInput
        label="Diluente"
        placeholder="Digite o diluente"
        value={prod.diluente}
        onChange={(v) => onChange("diluente", v)}
      />
      <TextInput
        label="Volume"
        placeholder="Digite o volume"
        value={prod.volume}
        onChange={(v) => onChange("volume", v)}
      />
      <TextInput
        label="Setor"
        placeholder="Digite o setor"
        value={prod.setor}
        onChange={(v) => onChange("setor", v)}
      />
      <TextInput
        label={
          agendamento?.serviceType === "Controle de Pragas e Vetores"
            ? "Equipamento utilizado"
            : "Equipamento"
        }
        placeholder="Digite o equipamento"
        value={prod.equipamento}
        onChange={(v) => onChange("equipamento", v)}
      />
      {agendamento?.serviceType !== "Controle de Pragas e Vetores" && (
        <TextInput
          label="Registro MS"
          placeholder="Informe o registro"
          className="md:col-span-1"
          value={prod.registroMs}
          onChange={(v) => onChange("registroMs", v)}
        />
      )}
    </div>
  );

  const renderDescricaoForm = (
    desc: DescricaoServico,
    onChange: (field: keyof DescricaoServico, value: string) => void,
  ) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
      <TextInput
        label="Setor"
        placeholder="Digite o setor"
        value={desc.setor}
        onChange={(v) => onChange("setor", v)}
      />
      <SelectorGroup
        label="Higiene do local"
        value={desc.higieneLocal}
        onChange={(v) => onChange("higieneLocal", v)}
        options={[
          { label: "Boa", value: true },
          { label: "Ruim", value: false },
        ]}
      />
      <TextInput
        label="Nível de infestação"
        placeholder="Informe o nível"
        value={desc.nivelInfestacao}
        onChange={(v) => onChange("nivelInfestacao", v)}
      />
      <TextInput
        label="Equipamento utilizado"
        placeholder="Digite o equipamento"
        value={desc.equipamento}
        onChange={(v) => onChange("equipamento", v)}
      />
    </div>
  );

  const renderVistoriaForm = (
    vist: Vistoria,
    onChange: (field: keyof Vistoria, value: string) => void,
  ) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
      <TextInput
        label="Setor"
        placeholder="Digite o setor"
        value={vist.setor}
        onChange={(v) => onChange("setor", v)}
      />
      <TextInput
        label="Situação"
        placeholder="Informe a situação"
        value={vist.situacao}
        onChange={(v) => onChange("situacao", v)}
      />
      <TextInput
        label="Medida Corretiva"
        placeholder="Informe a medida"
        value={vist.medidaCorretiva}
        onChange={(v) => onChange("medidaCorretiva", v)}
      />
      <SelectInput
        label="Avaliação"
        placeholder="Selecione o estado"
        value={vist.avaliacao}
        onChange={(v) => onChange("avaliacao", v)}
        options={[
          { label: "Aplicado", value: "aplicado" },
          { label: "Controlado", value: "controlado" },
          { label: "Não controlado", value: "nao-controlado" },
        ]}
      />
    </div>
  );

  const handleFinalizarServico = async () => {
    if (!id || !agendamento) return;

    setIsSubmitting(true);
    try {
      const payload: any = {};

      const st = agendamento.serviceType;

      // registroServico is common
      payload.registroServico = {
        imagens: [], // Not fully implemented yet
        observacoesGerais: observacoesGerais,
        imagensAntes: await Promise.all(uploadedFilesAntes.map(fileToBase64)),
        imagensDepois: await Promise.all(uploadedFilesDepois.map(fileToBase64)),
      };

      if (st === "Higienização") {
        payload.higienizacaoProduto = {
          tipoEquipamento: selectedEquipment.join(", "),
          nivelChuva: hasRain !== undefined ? (hasRain ? "sim" : "não") : "",
          tempoDuracaoEstimado,
          numeroTecnicos: numeroTecnicos ? Number(numeroTecnicos) : undefined,
          volume: "",
          realizarColeta: performCollection ?? false,
          fecharRegistro: closeRegistry ?? false,
        };
        payload.fotosLocal = await Promise.all(fotosLocal.map(fileToBase64));
        payload.reservatorios = [
          {
            reservatorio: localizacaoReservatorio,
            material: materialReservatorio,
            volume: volumeReservatorio,
            desinfeccao,
            situacao: situacaoReservatorio,
            vetores: false, // Default or add state
            residuos: false, // Default or add state
            fendas: false, // Default or add state
            boia: floatCondition || "",
            cobertura: coverageCondition || "",
            pintura: paintingCondition || "",
            revestimentoInterno: internalCoating || "",
            sistemaLadrao: overflowSystem === "correto",
          },
        ];
      } else if (st === "Controle de Pragas e Vetores") {
        payload.diagnosticoLocal = {
          pragasAlvo: selectedPests,
          areaExterna: areaExterna.join(", "),
          areaVacinal: areaVicinal.length > 0,
          pontoReferencia: pontoReferencia,
          piscina: hasPool ?? false,
          pet: hasPet ?? false,
        };
        payload.dadosProduto = {
          principioAtivo,
          produto,
          concentracao,
          diluente,
          volume: volumeProduto,
          setor: setorProduto,
          equipamento: equipamentoProduto,
        };
        payload.descricaoServico = [
          {
            setor: setorDescricao,
            higieneLocal: localHygiene !== undefined ? (localHygiene ? "boa" : "ruim") : "",
            nivelInfestacao,
            equipamento: equipamentoDescricao,
          },
        ];
      } else if (st === "Monitoramento de Insetos") {
        const convertFoto = async (file: File | string | { url?: string; base64?: string }) => {
          if (file instanceof File || file instanceof Blob) return await fileToBase64(file as File);
          if (typeof file === "string") return file;
          if (file && file.base64) return `data:image/jpeg;base64,${file.base64}`;
          if (file && file.url) return file.url;
          return "";
        };
        payload.areasMonitoramentoInsetos = await Promise.all(
          Object.values(monitoringPointsData).map(async (area: Record<string, unknown>) => ({
            grauInfestacao: area.grauInfestacao,
            produtoUtilizado: area.produtoUtilizado,
            adesivaTrocada: area.adesivaTrocada,
            produto: area.produto,
            dosagem: area.dosagem,
            refilLuminosa: area.refilLuminosa,
            quantidadeRefil: area.quantidadeRefil,
            observacoes: area.observacoes,
            fotos: area.fotos ? await Promise.all(area.fotos.map(convertFoto)) : [],
          })),
        );
      } else if (st === "Monitoramento de Roedores") {
        const convertFoto = async (file: File | string | { url?: string; base64?: string }) => {
          if (file instanceof File || file instanceof Blob) return await fileToBase64(file as File);
          if (typeof file === "string") return file;
          if (file && file.base64) return `data:image/jpeg;base64,${file.base64}`;
          if (file && file.url) return file.url;
          return "";
        };
        payload.estacoesMonitoramentoRoedores = await Promise.all(
          Object.values(rodentStationsData).map(async (station: Record<string, unknown>) => ({
            portaIsca: station.portaIsca,
            adhesiveTrap: station.adhesiveTrap,
            controles: station.controles || [],
            pontos: station.pontos || [],
            observacoes: station.observacoes,
            fotosServico: station.fotosServico
              ? await Promise.all(station.fotosServico.map(convertFoto))
              : [],
            fotosPortaIsca: station.fotosPortaIsca
              ? await Promise.all(station.fotosPortaIsca.map(convertFoto))
              : [],
          })),
        );
      } else {
        // Outros
        payload.diagnosticoLocal = {
          pragasAlvo: selectedPests,
          areaExterna: areaExterna.join(", "),
          areaVacinal: areaVicinal.length > 0,
          pontoReferencia,
          piscina: hasPool ?? false,
          pet: hasPet ?? false,
        };
        payload.produtos = [
          {
            principioAtivo,
            produto,
            concentracao,
            diluente,
            volume: volumeProduto,
            setor: setorProduto,
            equipamento: equipamentoProduto,
          },
        ];
        payload.vistoria = [
          {
            setor: setorVistoria,
            situacao: situacaoVistoria,
            medidaCorretiva,
            avaliacao: avaliacaoVistoria,
          },
        ];
      }

      const response = await serverRequest.put(`/tecnico/agenda/${id}/checklist`, payload);
      if (response.data.success) {
        // Concluir agendamento
        const concludePayload = {
          observacoes: observacoesGerais || "Serviço concluído sem observações.",
        };
        const concludeResponse = await serverRequest.put(
          `/tecnico/agenda/${id}/concluir`,
          concludePayload,
        );

        if (concludeResponse.data.success) {
          toast.success("Serviço finalizado com sucesso!");
          navigate(ROUTES.TECHNICIAN_SCHEDULING);
        } else {
          toast.error("Checklist salvo, mas erro ao concluir agendamento.");
        }
      }
    } catch (error) {
      console.error("Failed to submit checklist:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !agendamento) {
    return (
      <MainLayout>
        <div className="flex justify-center p-8">Carregando detalhes...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        className={cn(
          "flex flex-col gap-md pb-xl",
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
                <div className="flex flex-col gap-md w-full">
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
                                className="flex w-full items-center gap-sm px-sm py-xs hover:bg-grayscale-light/10 rounded-sm transition-colors text-left"
                              >
                                <Checkbox
                                  checked={
                                    agendamento.serviceType === "Higienização"
                                      ? selectedEquipment.includes(item)
                                      : selectedPests.includes(item)
                                  }
                                  className="pointer-events-none"
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
                        <TextInput
                          label="Tempo de duração estimado"
                          placeholder="Ex: 2 horas"
                          value={tempoDuracaoEstimado}
                          onChange={setTempoDuracaoEstimado}
                        />
                        <TextInput
                          label="Número de Técnicos"
                          placeholder="Ex: 2"
                          type="number"
                          value={numeroTecnicos}
                          onChange={setNumeroTecnicos}
                        />
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

                      <FileUpload id="fotos-local-servico" onFilesChange={setFotosLocal} />
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
                        value={pontoReferencia}
                        onChange={setPontoReferencia}
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
                                  className="flex w-full items-center gap-sm px-sm py-xs hover:bg-grayscale-light/10 rounded-sm transition-colors text-left"
                                >
                                  <Checkbox
                                    checked={areaExterna.includes(option)}
                                    className="pointer-events-none"
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
                                  className="flex w-full items-center gap-sm px-sm py-xs hover:bg-grayscale-light/10 rounded-sm transition-colors text-left"
                                >
                                  <Checkbox
                                    checked={areaVicinal.includes(option)}
                                    className="pointer-events-none"
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
                  <div className="flex flex-col gap-md w-full">
                    <H3 className="text-grayscale-dark font-bold text-lg">Reservatório</H3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div className="md:col-span-2">
                        <TextInput
                          label="Localização"
                          placeholder="Informe a localização"
                          value={localizacaoReservatorio}
                          onChange={setLocalizacaoReservatorio}
                        />
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
                        value={volumeReservatorio}
                        onChange={setVolumeReservatorio}
                      />
                      <TextInput
                        label="Desinfecção(g)"
                        placeholder="Ex: 10"
                        value={desinfeccao}
                        onChange={setDesinfeccao}
                      />
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
                      {renderReservoirForm(currentReservoir, updateCurrentReservoir)}
                    </div>

                    <Button
                      variant="link"
                      onClick={addReservoir}
                      className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium mt-md mb-md"
                    >
                      <Plus size={16} />
                      Adicionar reservatório à lista
                    </Button>

                    {reservoirs.length > 0 && (
                      <Accordion type="single" collapsible className="w-full flex flex-col gap-md">
                        {reservoirs.map((res, index) => (
                          <AccordionItem
                            key={res.id}
                            value={`reservoir-${res.id}`}
                            className="bg-white rounded-large! border border-muted-foreground/20 px-xl"
                          >
                            <AccordionTrigger className="hover:no-underline py-md">
                              <div className="flex items-center justify-between w-full pr-sm">
                                <div className="flex flex-col items-start gap-2xs text-left w-full">
                                  <span className="font-bold text-grayscale-dark text-md">
                                    Reservatório {index + 1}
                                  </span>
                                  {res.localizacao && (
                                    <div className="flex items-center gap-xs text-grayscale-medium text-xs font-normal">
                                      <MapPin size={14} />
                                      <span>{res.localizacao}</span>
                                    </div>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  className="text-feedback-error-medium hover:text-feedback-error-medium/80 transition-colors z-10 shrink-0 ml-xs cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    removeReservoir(res.id);
                                  }}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-md pb-xl">
                              {renderReservoirForm(res, (field, value) =>
                                updateReservoir(res.id, field, value),
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </div>
                </Card>
              ) : (
                <Card className="rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl">
                  <div className="flex flex-col gap-md w-full">
                    <H3 className="text-grayscale-dark font-bold text-lg">Dados do Produto</H3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      {agendamento.serviceType === "Controle de Pragas e Vetores" ? (
                        <>
                          <TextInput
                            label="Princípio Ativo"
                            placeholder="Digite o princípio ativo"
                            value={principioAtivo}
                            onChange={setPrincipioAtivo}
                          />
                          <TextInput
                            label="Concentração"
                            placeholder="Digite a concentração"
                            value={concentracao}
                            onChange={setConcentracao}
                          />
                          <TextInput
                            label="Diluente"
                            placeholder="Digite o diluente"
                            value={diluente}
                            onChange={setDiluente}
                          />
                          <TextInput
                            label="Volume"
                            placeholder="Digite o volume"
                            value={volumeProduto}
                            onChange={setVolumeProduto}
                          />
                          <TextInput
                            label="Setor"
                            placeholder="Digite o setor"
                            value={setorProduto}
                            onChange={setSetorProduto}
                          />
                          <TextInput
                            label="Equipamento utilizado"
                            placeholder="Digite o equipamento"
                            value={equipamentoProduto}
                            onChange={setEquipamentoProduto}
                          />
                        </>
                      ) : (
                        <>
                          <TextInput
                            label="Princípio Ativo"
                            placeholder="Digite o princípio ativo"
                            value={principioAtivo}
                            onChange={setPrincipioAtivo}
                          />
                          <TextInput
                            label="Produto"
                            placeholder="Digite o nome do produto"
                            value={produto}
                            onChange={setProduto}
                          />
                          <TextInput
                            label="Diluente"
                            placeholder="Digite o diluente"
                            value={diluente}
                            onChange={setDiluente}
                          />
                          <TextInput
                            label="Volume"
                            placeholder="Digite o volume"
                            value={volumeProduto}
                            onChange={setVolumeProduto}
                          />
                          <TextInput
                            label="Setor"
                            placeholder="Digite o setor"
                            value={setorProduto}
                            onChange={setSetorProduto}
                          />
                          <TextInput
                            label="Equipamento"
                            placeholder="Digite o equipamento"
                            value={equipamentoProduto}
                            onChange={setEquipamentoProduto}
                          />
                          <TextInput
                            label="Registro MS"
                            placeholder="Informe o registro"
                            className="md:col-span-1"
                            value={registroMs}
                            onChange={setRegistroMs}
                          />
                        </>
                      )}
                    </div>

                    <Button
                      variant="link"
                      onClick={addProduct}
                      className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium mt-md mb-md"
                    >
                      <Plus size={16} />
                      Adicionar produto à lista
                    </Button>

                    {products.length > 0 && (
                      <Accordion type="single" collapsible className="w-full flex flex-col gap-md">
                        {products.map((prod, index) => (
                          <AccordionItem
                            key={prod.id}
                            value={`product-${prod.id}`}
                            className="bg-white rounded-large! border border-muted-foreground/20 px-xl"
                          >
                            <AccordionTrigger className="hover:no-underline py-md">
                              <div className="flex items-center justify-between w-full pr-sm">
                                <div className="flex flex-col items-start gap-2xs text-left w-full">
                                  <span className="font-bold text-grayscale-dark text-md">
                                    Produto {index + 1}
                                  </span>
                                  {(prod.produto || prod.principioAtivo) && (
                                    <div className="flex items-center gap-xs text-grayscale-medium text-xs font-normal">
                                      <Beaker size={14} />
                                      <span>
                                        {[prod.produto, prod.principioAtivo]
                                          .filter(Boolean)
                                          .join(" - ")}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  className="text-feedback-error-medium hover:text-feedback-error-medium/80 transition-colors z-10 shrink-0 ml-xs cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    removeProduct(prod.id);
                                  }}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-md pb-xl">
                              {renderProductForm(prod, (field, value) =>
                                updateProduct(prod.id, field, value),
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </div>
                </Card>
              )}

              {/* Vistoria / Descrição do Serviço */}
              {agendamento.serviceType === "Controle de Pragas e Vetores" && (
                <Card className="rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl">
                  <div className="flex flex-col gap-md w-full">
                    <H3 className="text-grayscale-dark font-bold text-lg">Descrição do serviço</H3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <TextInput
                        label="Setor"
                        placeholder="Digite o setor"
                        value={setorDescricao}
                        onChange={setSetorDescricao}
                      />
                      <SelectorGroup
                        label="Higiene do local"
                        value={localHygiene}
                        onChange={setLocalHygiene}
                        options={[
                          { label: "Boa", value: true },
                          { label: "Ruim", value: false },
                        ]}
                      />
                      <TextInput
                        label="Nível de infestação"
                        placeholder="Informe o nível"
                        value={nivelInfestacao}
                        onChange={setNivelInfestacao}
                      />
                      <TextInput
                        label="Equipamento utilizado"
                        placeholder="Digite o equipamento"
                        value={equipamentoDescricao}
                        onChange={setEquipamentoDescricao}
                      />
                    </div>

                    <Button
                      variant="link"
                      onClick={addDescricao}
                      className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium mt-md mb-md"
                    >
                      <Plus size={16} />
                      Adicionar novo setor à lista
                    </Button>

                    {descricoes.length > 0 && (
                      <Accordion type="single" collapsible className="w-full flex flex-col gap-md">
                        {descricoes.map((desc, index) => (
                          <AccordionItem
                            key={desc.id}
                            value={`descricao-${desc.id}`}
                            className="bg-white rounded-large! border border-muted-foreground/20 px-xl"
                          >
                            <AccordionTrigger className="hover:no-underline py-md">
                              <div className="flex items-center justify-between w-full pr-sm">
                                <div className="flex flex-col items-start gap-2xs text-left w-full">
                                  <span className="font-bold text-grayscale-dark text-md">
                                    Setor {index + 1}
                                  </span>
                                  {desc.setor && (
                                    <div className="flex items-center gap-xs text-grayscale-medium text-xs font-normal">
                                      <MapPin size={14} />
                                      <span>{desc.setor}</span>
                                    </div>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  className="text-feedback-error-medium hover:text-feedback-error-medium/80 transition-colors z-10 shrink-0 ml-xs cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    removeDescricao(desc.id);
                                  }}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-md pb-xl">
                              {renderDescricaoForm(desc, (field, value) =>
                                updateDescricao(desc.id, field, value),
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </div>
                </Card>
              )}

              {!["Controle de Pragas e Vetores", "Higienização"].includes(
                agendamento.serviceType,
              ) && (
                <Card className="rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl">
                  <div className="flex flex-col gap-md w-full">
                    <H3 className="text-grayscale-dark font-bold text-lg">Vistoria</H3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <TextInput
                        label="Setor"
                        placeholder="Digite o setor"
                        value={setorVistoria}
                        onChange={setSetorVistoria}
                      />
                      <TextInput
                        label="Situação"
                        placeholder="Informe a situação"
                        value={situacaoVistoria}
                        onChange={setSituacaoVistoria}
                      />
                      <TextInput
                        label="Medida Corretiva"
                        placeholder="Informe a medida"
                        value={medidaCorretiva}
                        onChange={setMedidaCorretiva}
                      />
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
                      onClick={addVistoria}
                      className="w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium mt-md mb-md"
                    >
                      <Plus size={16} />
                      Adicionar novo setor à lista
                    </Button>

                    {vistorias.length > 0 && (
                      <Accordion type="single" collapsible className="w-full flex flex-col gap-md">
                        {vistorias.map((vist, index) => (
                          <AccordionItem
                            key={vist.id}
                            value={`vistoria-${vist.id}`}
                            className="bg-white rounded-large! border border-muted-foreground/20 px-xl"
                          >
                            <AccordionTrigger className="hover:no-underline py-md">
                              <div className="flex items-center justify-between w-full pr-sm">
                                <div className="flex flex-col items-start gap-2xs text-left w-full">
                                  <span className="font-bold text-grayscale-dark text-md">
                                    Setor {index + 1}
                                  </span>
                                  {vist.setor && (
                                    <div className="flex items-center gap-xs text-grayscale-medium text-xs font-normal">
                                      <MapPin size={14} />
                                      <span>{vist.setor}</span>
                                    </div>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  className="text-feedback-error-medium hover:text-feedback-error-medium/80 transition-colors z-10 shrink-0 ml-xs cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    removeVistoria(vist.id);
                                  }}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-md pb-xl">
                              {renderVistoriaForm(vist, (field, value) =>
                                updateVistoria(vist.id, field, value),
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </div>
                </Card>
              )}

              {/* Fotos do Serviço Compartilhado */}
              <ServicoFotos
                onFilesAntesChange={setUploadedFilesAntes}
                onFilesDepoisChange={setUploadedFilesDepois}
                observacoesGerais={observacoesGerais}
                onChangeObservacoes={setObservacoesGerais}
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
                <Button
                  onClick={handleFinalizarServico}
                  disabled={isSubmitting}
                  className="bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white w-full md:w-auto md:min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md"
                >
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
                      <MonitoringPointContainer
                        pointId={point}
                        externalData={monitoringPointsData[point]}
                        onExternalSave={(d) =>
                          setMonitoringPointsData((prev) => ({ ...prev, [point]: d }))
                        }
                      />
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
              <Button
                onClick={handleFinalizarServico}
                disabled={isSubmitting}
                className="bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white w-full md:w-auto md:min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md"
              >
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
                      <RodentStationContainer
                        stationId={station}
                        externalData={rodentStationsData[station]}
                        onExternalSave={(d) =>
                          setRodentStationsData((prev) => ({ ...prev, [station]: d }))
                        }
                      />
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
              <Button
                onClick={handleFinalizarServico}
                disabled={isSubmitting}
                className="bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white w-full md:w-auto md:min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md"
              >
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
