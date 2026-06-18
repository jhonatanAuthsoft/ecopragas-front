import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, Download, FileText, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PdfFile } from "@/assets/vectors/pdf-file";
import { Button } from "@/atomic/atm.button/button.component";
import { DetailItem } from "@/atomic/atm.detail-item";
import { Body1, Body2, H1, H2, H3, H4, InputCaption } from "@/atomic/atm.typography";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import type { Cliente, ClienteDocumento } from "@/model/rest/cliente";
import { formatCEP, formatCPFCNPJ, formatCurrency, formatPhone } from "@/utils/formatters";

const DOCUMENTOS_PAGE_SIZE = 4;

const MOCK_CLIENTE: Cliente = {
  id: "mock-cliente-001",
  nomeRazaoSocial: "Supermercado Bom Preco Ltda",
  cnpjCpf: "12.345.678/0001-90",
  tipo: "RECORRENTE",
  telefone: "(11) 98765-4321",
  email: "contato@bompreco.com.br",
  status: "ATIVO",
  cidade: "Sao Paulo",
  estado: "SP",
  dataUltimoServico: "2026-01-15",
  observacoes: "Cliente prioritario - contrato anual",
  enderecos: [
    {
      rua: "Rua das Flores",
      numero: "1500",
      complemento: "Loja 3",
      bairro: "",
      cidade: "Sao Paulo",
      estado: "SP",
      cep: "01310-100",
    },
  ],
  documentos: [
    {
      nome: "Contrato de Servico.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "Alvara de Funcionamento.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "CNPJ.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "Certificado Sanitario.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "Licenca Ambiental.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "Comprovante Endereco.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
    {
      nome: "ART Responsavel Tecnico.pdf",
      tipo: "application/pdf",
      url: "data:application/pdf;base64,JVBERi0xLjQK",
    },
  ],
};

const ClienteDetalhes = () => {
  const navigate = useNavigate();
  const cliente = MOCK_CLIENTE;
  const [documentosPage, setDocumentosPage] = useState(0);

  const documentos = cliente.documentos ?? [];
  const totalDocumentosPages = Math.max(1, Math.ceil(documentos.length / DOCUMENTOS_PAGE_SIZE));
  const paginatedDocumentos = documentos.slice(
    documentosPage * DOCUMENTOS_PAGE_SIZE,
    (documentosPage + 1) * DOCUMENTOS_PAGE_SIZE,
  );

  const enderecoPrincipal = cliente.enderecos?.[0];
  const addressString = enderecoPrincipal?.rua
    ? `${enderecoPrincipal.rua}, ${enderecoPrincipal.numero ?? ""}, ${formatCEP(enderecoPrincipal.cep ?? "")}, ${enderecoPrincipal.cidade ?? "-"} - ${enderecoPrincipal.estado ?? "-"}`
    : "-";

  const handleDownloadDocumento = (doc: ClienteDocumento) => {
    if (doc.url) {
      const dataUri = doc.url.startsWith("data:")
        ? doc.url
        : `data:${doc.tipo || "application/octet-stream"};base64,${doc.url}`;

      const link = document.createElement("a");
      link.href = dataUri;
      link.download = doc.nome;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <Button
          variant="link"
          className="self-start hover:no-underline"
          onClick={() => navigate(ROUTES.CLIENT.BASE)}
          leftIcon={<ChevronLeft className="size-md" />}
        >
          Voltar para Clientes
        </Button>

        <div className="flex flex-col self-start gap-xs">
          <H1>Perfil do Cliente</H1>
          <Body1 className="font-normal text-grayscale-dark">
            Visualize informações sobre o cliente
          </Body1>
        </div>

        <div className="flex flex-col gap-sm p-lg bg-white rounded-lg shadow-sm border border-grayscale-light">
          <div className="flex flex-col gap-xs">
            <H2>{cliente.nomeRazaoSocial}</H2>
            <div className="flex flex-wrap items-center gap-sm text-grayscale-dark text-sm">
              <div className="flex items-center gap-1">
                <FileText className="size-lg" />
                <Body2>{formatCPFCNPJ(cliente.cnpjCpf ?? "")}</Body2>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="size-lg" />
                <Body2>{formatPhone(cliente.telefone ?? "")}</Body2>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-lg" />
                <Body2>{addressString}</Body2>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-grayscale-light mb-2xs" />

          <div className="space-y-4">
            <H3>Ultimo Servico</H3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md bg-gray-50 rounded-lg">
              {cliente.dataUltimoServico ? (
                <>
                  <DetailItem label="Tipo de serviço" value={["Serviço de limpeza"]} />
                  <DetailItem label="Técnico Responsável" value={["João da Silva"]} />
                  <DetailItem
                    label="Data e horário"
                    value={[
                      `${format(new Date(cliente.dataUltimoServico), "dd/MM/yyyy", { locale: ptBR })} - ${format(new Date(cliente.dataUltimoServico), "HH:mm", { locale: ptBR })}`,
                    ]}
                  />
                  <DetailItem
                    label="Valor do serviço"
                    value={[<b key="valor-servico">{formatCurrency(100)}</b>]}
                    valueClassName="text-brand-cta-dark"
                  />
                </>
              ) : (
                <Body2 className="text-grayscale-medium">
                  Informações do último serviço indisponíveis.
                </Body2>
              )}
            </div>
          </div>

          <div className="w-full h-[1px] bg-grayscale-light mb-2xs" />

          <div className="space-y-4">
            <H3>Documentação</H3>
            {documentos.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-xs">
                  {paginatedDocumentos.map((doc, index) => (
                    <div
                      key={`${doc.nome ?? "doc"}-${index}`}
                      className="flex items-center justify-between p-md border border-grayscale-light rounded-small hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-sm">
                        <PdfFile />
                        <div className="flex flex-col gap-2xs">
                          <H4>{doc.nome}</H4>
                          {/* TODO: pedir tamanho ao back */}
                          <InputCaption className="text-grayscale-medium">-</InputCaption>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-brand-primary-medium hover:text-brand-primary-dark hover:bg-brand-primary-light/10"
                        onClick={() => handleDownloadDocumento(doc)}
                      >
                        <Download className="size-[20px]" />
                      </Button>
                    </div>
                  ))}
                </div>

                {totalDocumentosPages > 1 && (
                  <PaginationControl
                    className="mt-xs"
                    currentPage={documentosPage + 1}
                    totalPages={totalDocumentosPages}
                    onPageChange={(page) => setDocumentosPage(page - 1)}
                  />
                )}
              </>
            ) : (
              <Body2 className="text-grayscale-medium">Nenhum documento encontrado.</Body2>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClienteDetalhes;
