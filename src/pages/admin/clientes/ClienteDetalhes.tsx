import { ChevronLeft, Download } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { IdentificationIcon } from "@/assets/icons/identification";
import { MapPinIcon } from "@/assets/icons/map-pin";
import { PhoneIcon } from "@/assets/icons/phone";
import { PdfFile } from "@/assets/vectors/pdf-file";
import { Button } from "@/atomic/atm.button/button.component";
import { DetailItem } from "@/atomic/atm.detail-item";
import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { Body1, Body2, H1, H2, H3, H4, InputCaption } from "@/atomic/atm.typography";
import { PaginationControl } from "@/atomic/mol.pagination/pagination-control.component";
import { LoadingState } from "@/atomic/obj.loading-state";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import { useGetCliente } from "@/domain/cliente";
import type { ClienteDocumentoResponse } from "@/model/rest/cliente";
import { triggerDownload } from "@/utils/download-file";
import { formatCPFCNPJ, formatCurrency, formatPhone } from "@/utils/formatters";
import { TIPO_SERVICO_LABELS } from "../ordens-servico/components/ordem-servico-detalhes/ordem-servico-detalhes.labels";
import {
  formatClienteEndereco,
  formatUltimoServicoDataHora,
  hasUltimoServico,
} from "./cliente-detalhes.utils";

const DOCUMENTOS_PAGE_SIZE = 4;

const ClienteDetalhes = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [documentosPage, setDocumentosPage] = useState(0);

  const { cliente, getClienteError, isGetClienteLoading } = useGetCliente({ id });

  const documentos = cliente?.documentos ?? [];
  const totalDocumentosPages = Math.max(1, Math.ceil(documentos.length / DOCUMENTOS_PAGE_SIZE));
  const paginatedDocumentos = documentos.slice(
    documentosPage * DOCUMENTOS_PAGE_SIZE,
    (documentosPage + 1) * DOCUMENTOS_PAGE_SIZE,
  );

  function handleDownloadDocumento(doc: ClienteDocumentoResponse) {
    if (!doc.url) {
      toast.error("Documento sem referencia para download.");
      return;
    }
    triggerDownload(doc.url, doc.nome ?? doc.id);
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <Button
          variant="link"
          className="self-start hover:no-underline"
          onClick={() => navigate(ROUTES.ADMIN.CLIENT.BASE)}
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

        <LoadingState loading={isGetClienteLoading} error={!!getClienteError} data={!!cliente}>
          <LoadingState.Shimmer>
            <ClienteDetalhesSkeleton />
          </LoadingState.Shimmer>

          <LoadingState.Error>
            <div className="text-center py-12">
              <p className="text-lg font-medium text-foreground">Erro ao carregar cliente</p>
              <p className="text-sm text-muted-foreground mt-1">Tente recarregar a página</p>
            </div>
          </LoadingState.Error>

          {cliente && (
            <div className="flex flex-col gap-sm p-lg bg-white rounded-lg shadow-sm border border-grayscale-light">
              <div className="flex flex-col gap-xs">
                <H2>{cliente.nomeRazaoSocial}</H2>
                <div className="flex flex-wrap items-center gap-sm text-grayscale-dark text-sm">
                  <div className="flex items-center gap-1">
                    <IdentificationIcon className="size-lg" />
                    <Body2>{cliente.cnpjCpf ? formatCPFCNPJ(cliente.cnpjCpf) : "-"}</Body2>
                  </div>
                  <div className="flex items-center gap-1">
                    <PhoneIcon className="size-lg" />
                    <Body2>{cliente.telefone ? formatPhone(cliente.telefone) : "-"}</Body2>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="size-lg" />
                    <Body2>{formatClienteEndereco(cliente)}</Body2>
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-grayscale-light mb-2xs" />

              <div className="space-y-4">
                <H3>Ultimo Servico</H3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md bg-gray-50 rounded-lg">
                  {hasUltimoServico(cliente) ? (
                    <>
                      <DetailItem
                        label="Tipo de servico"
                        value={[TIPO_SERVICO_LABELS[cliente.tipoDeServico]]}
                      />
                      <DetailItem
                        label="Tecnico Responsavel"
                        value={[cliente.tecnicoResponsavel]}
                      />
                      <DetailItem
                        label="Data e horario"
                        value={[formatUltimoServicoDataHora(cliente.dataUltimoServico)]}
                      />
                      <DetailItem
                        label="Valor do servico"
                        value={[
                          cliente.valor != null ? (
                            <b key="valor-servico">{formatCurrency(cliente.valor)}</b>
                          ) : (
                            "-"
                          ),
                        ]}
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
                      {paginatedDocumentos.map((doc, index) => {
                        const documentoKey = doc.id ?? `${doc.nome ?? "doc"}-${index}`;

                        return (
                          <div
                            key={documentoKey}
                            className="flex items-center justify-between p-md border border-grayscale-light rounded-small hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-sm">
                              <PdfFile />
                              <div className="flex flex-col gap-2xs">
                                <H4>{doc.nome}</H4>
                                <InputCaption className="text-grayscale-medium">
                                  {/* TODO: colocar o tamanho */}
                                  {doc.tipo ?? "-"}
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
                        );
                      })}
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
          )}
        </LoadingState>
      </div>
    </MainLayout>
  );
};

export default ClienteDetalhes;

const ClienteDetalhesSkeleton = () => (
  <div className="flex flex-col gap-sm p-lg bg-white rounded-lg shadow-sm border border-grayscale-light">
    <Skeleton className="h-[32px] w-[280px]" />
    <div className="flex flex-wrap gap-sm">
      <Skeleton className="h-[20px] w-[160px]" />
      <Skeleton className="h-[20px] w-[140px]" />
      <Skeleton className="h-[20px] w-[240px]" />
    </div>
    <Skeleton className="h-[1px] w-full" />
    <Skeleton className="h-[24px] w-[140px]" />
    <Skeleton className="h-[80px] w-full" />
    <Skeleton className="h-[1px] w-full" />
    <Skeleton className="h-[24px] w-[140px]" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-xs">
      <Skeleton className="h-[72px] w-full" />
      <Skeleton className="h-[72px] w-full" />
    </div>
  </div>
);
