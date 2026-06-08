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
import { formatCEP, formatCPFCNPJ, formatCurrency, formatPhone } from "@/utils/formatters";
import type { ClienteDetalhes as ClienteDetalhesData, ClienteDocumento } from "./types";

const DOCUMENTOS_PAGE_SIZE = 4;

const MOCK_CLIENTE: ClienteDetalhesData = {
  id: "mock-cliente-001",
  nome: "Supermercado Bom Preco Ltda",
  cpfCnpj: "12.345.678/0001-90",
  tipoCliente: "fixo",
  telefone: "(11) 98765-4321",
  email: "contato@bompreco.com.br",
  endereco: "Rua das Flores, 1500, Loja 3",
  cidade: "Sao Paulo",
  estado: "SP",
  cep: "01310-100",
  status: "ativo",
  datacadastro: new Date("2024-06-15"),
  ultimoServico: new Date("2026-01-15"),
  observacoes: "Cliente prioritario - contrato anual",
  documentos: [
    {
      id: "doc-001",
      nome: "Contrato de Servico.pdf",
      conteudo: "data:application/pdf;base64,JVBERi0xLjQK",
      tamanho: "245 KB",
      tipo: "application/pdf",
    },
    {
      id: "doc-002",
      nome: "Alvara de Funcionamento.pdf",
      conteudo: "data:application/pdf;base64,JVBERi0xLjQK",
      tamanho: "120 KB",
      tipo: "application/pdf",
    },
    {
      id: "doc-003",
      nome: "CNPJ.pdf",
      conteudo: "data:application/pdf;base64,JVBERi0xLjQK",
      tamanho: "85 KB",
      tipo: "application/pdf",
    },
    {
      id: "doc-004",
      nome: "Certificado Sanitario.pdf",
      conteudo: "data:application/pdf;base64,JVBERi0xLjQK",
      tamanho: "310 KB",
      tipo: "application/pdf",
    },
    {
      id: "doc-005",
      nome: "Licenca Ambiental.pdf",
      conteudo: "data:application/pdf;base64,JVBERi0xLjQK",
      tamanho: "198 KB",
      tipo: "application/pdf",
    },
    {
      id: "doc-006",
      nome: "Comprovante Endereco.pdf",
      conteudo: "data:application/pdf;base64,JVBERi0xLjQK",
      tamanho: "64 KB",
      tipo: "application/pdf",
    },
    {
      id: "doc-007",
      nome: "ART Responsavel Tecnico.pdf",
      conteudo: "data:application/pdf;base64,JVBERi0xLjQK",
      tamanho: "142 KB",
      tipo: "application/pdf",
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

  const addressString = cliente.endereco
    ? `${cliente.endereco}, ${formatCEP(cliente.cep)}, ${cliente.cidade} - ${cliente.estado}`
    : "-";

  const handleDownloadDocumento = (doc: ClienteDocumento) => {
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
            <H2>{cliente.nome}</H2>
            <div className="flex flex-wrap items-center gap-sm text-grayscale-dark text-sm">
              <div className="flex items-center gap-1">
                <FileText className="size-lg" />
                <Body2>{formatCPFCNPJ(cliente.cpfCnpj ?? "")}</Body2>
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
              {cliente.ultimoServico ? (
                <>
                  <DetailItem label="Tipo de serviço" value={["Serviço de limpeza"]} />
                  <DetailItem label="Técnico Responsável" value={["João da Silva"]} />
                  <DetailItem
                    label="Data e horário"
                    value={[
                      `${format(cliente.ultimoServico, "dd/MM/yyyy", { locale: ptBR })} - ${format(cliente.ultimoServico, "HH:mm", { locale: ptBR })}`,
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
                      key={doc.id || index}
                      className="flex items-center justify-between p-md border border-grayscale-light rounded-small hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-sm">
                        <PdfFile />
                        <div className="flex flex-col gap-2xs">
                          <H4>{doc.nome}</H4>
                          <InputCaption className="text-grayscale-medium">
                            {doc.tamanho ?? "-"}
                          </InputCaption>
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
