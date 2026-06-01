import { ArrowLeft, Download, FileText, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import api from "@/services/api";
import { formatCEP, formatCPFCNPJ, formatPhone } from "@/utils/formatters";

interface Endereco {
  id: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  principal: boolean;
}

interface Documento {
  id: string;
  nome: string;
  conteudo: string;
  tamanho?: string;
  tipo?: string;
}

interface ClienteDetalhesData {
  id: string;
  nome: string;
  cpfCnpj: string;
  tipoCliente: string;
  telefone: string;
  email: string;
  observacoes: string;
  status: string;
  enderecos: Endereco[];
  documentos: Documento[];
}

const ClienteDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<ClienteDetalhesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/admin/clientes/${id}`);
        setCliente(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do cliente:", error);
        toast.error("Erro ao carregar detalhes do cliente");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCliente();
    }
  }, [id]);

  const handleDownloadDocumento = (doc: Documento) => {
    if (doc.conteudo) {
      const dataUri = doc.conteudo.startsWith("data:")
        ? doc.conteudo
        : `data:${doc.tipo || "application/octet-stream"};base64,${doc.conteudo}`;

      const link = document.createElement("a");
      link.href = dataUri;
      link.download = doc.nome;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p>Carregando...</p>
        </div>
      </MainLayout>
    );
  }

  if (!cliente) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <p>Cliente não encontrado</p>
          <Button onClick={() => navigate("/clientes")}>Voltar para Clientes</Button>
        </div>
      </MainLayout>
    );
  }

  const mainAddress = cliente.enderecos?.find((e) => e.principal) || cliente.enderecos?.[0];
  const addressString = mainAddress
    ? `${mainAddress.rua}, ${mainAddress.numero}${mainAddress.complemento ? `, ${mainAddress.complemento}` : ""}, ${formatCEP(mainAddress.cep)}, ${mainAddress.cidade} - ${mainAddress.estado}`
    : "Endereço não cadastrado";

  return (
    <MainLayout>
      <div className="space-y-6">
        <div
          className="flex items-center gap-2 text-grayscale-medium hover:text-brand-primary-medium transition-colors cursor-pointer w-fit"
          onClick={() => navigate("/clientes")}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Voltar para Clientes</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-grayscale-dark">Perfil do cliente</h1>
          <p className="text-grayscale-medium">Visualize informações sobre o cliente</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-grayscale-light space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-grayscale-dark">{cliente.nome}</h2>
            <div className="flex flex-wrap items-center gap-4 text-grayscale-medium text-sm">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>{formatCPFCNPJ(cliente.cpfCnpj)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{formatPhone(cliente.telefone)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{addressString}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-grayscale-dark">Último Serviço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-grayscale-medium col-span-2">
                Informações do último serviço indisponíveis.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-grayscale-dark">Documentação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cliente.documentos && cliente.documentos.length > 0 ? (
                cliente.documentos.map((doc, index) => (
                  <div
                    key={doc.id || index}
                    className="flex items-center justify-between p-4 border border-grayscale-light rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-red-50 p-2 rounded">
                        <FileText className="h-6 w-6 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium text-grayscale-dark text-sm">{doc.nome}</p>
                        <p className="text-xs text-grayscale-medium">120 KB</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleDownloadDocumento(doc)}
                    >
                      <Download className="h-5 w-5" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-grayscale-medium text-sm col-span-2">
                  Nenhum documento encontrado.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClienteDetalhes;
