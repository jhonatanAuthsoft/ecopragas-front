import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { Skeleton } from "@/atomic/atm.skeleton/skeleton.component";
import { H1 } from "@/atomic/atm.typography";
import { LoadingState } from "@/atomic/obj.loading-state";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import {
  useDeleteOrdemServico,
  useDownloadOrdensServicoPdf,
  useGetOrdemServico,
} from "@/domain/ordem-servico";
import { downloadFile } from "@/utils/download-file";
import { formatOsNumero } from "@/utils/ordem-servico";
import { AddOrdemServicoDialog } from "./components/add-ordem-servico-dialog";
import { OrdemServicoDetalhesCard } from "./components/ordem-servico-detalhes";
import { OrdemServicoVariationsCards } from "./components/ordem-servico-detalhes/components/OrdemServicoVariationsCards";

export default function OrdemServicoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { ordemServico, getOrdemServicoError, isGetOrdemServicoLoading } = useGetOrdemServico({
    id: id ?? "",
  });

  const { deleteOrdemServico, isDeleteOrdemServicoLoading } = useDeleteOrdemServico({
    onSuccess: () => {
      toast.success("Ordem de serviço excluída com sucesso!");
      navigate(ROUTES.ADMIN.SERVICE_ORDER.BASE);
    },
  });

  const { downloadOrdensServicoPdf, isDownloadOrdensServicoPdfLoading } =
    useDownloadOrdensServicoPdf({
      onSuccess: (blob) => {
        if (!blob || blob.size === 0) {
          toast.error("PDF da ordem de serviço indisponível.");
          return;
        }

        if (!ordemServico) return;

        downloadFile(
          new Blob([blob], { type: "application/pdf" }),
          `${formatOsNumero(ordemServico.osNumero).replace(/\s/g, "_")}.pdf`,
        );
      },
    });

  const handleDelete = () => {
    if (!ordemServico?.id) return;
    deleteOrdemServico({ id: ordemServico.id });
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleDownload = () => {
    if (!ordemServico?.id) return;
    downloadOrdensServicoPdf({ id: ordemServico.id });
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <div className="flex flex-col self-start gap-xs">
          <Button
            className="w-fit"
            variant="link"
            size="lg"
            onClick={() => navigate(ROUTES.ADMIN.SERVICE_ORDER.BASE)}
            leftIcon={<ChevronLeft className="size-md" />}
          >
            Voltar para Ordens de Serviço
          </Button>

          <H1>Detalhes do Serviço</H1>
        </div>

        <LoadingState
          loading={isGetOrdemServicoLoading}
          error={!!getOrdemServicoError}
          data={!!ordemServico}
          renderOnlyWhenData
        >
          <LoadingState.Shimmer>
            <Skeleton className="h-[400px] w-full rounded-medium" />
          </LoadingState.Shimmer>

          <LoadingState.Error>
            <div className="text-center py-12">
              <p className="text-lg font-medium text-foreground">
                Erro ao carregar ordem de serviço
              </p>
              <p className="text-sm text-muted-foreground mt-1">Tente recarregar a página</p>
            </div>
          </LoadingState.Error>

          <OrdemServicoDetalhesCard
            ordem={ordemServico}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDownload={handleDownload}
            isDeleteLoading={isDeleteOrdemServicoLoading}
            isDownloadLoading={isDownloadOrdensServicoPdfLoading}
          />

          <OrdemServicoVariationsCards ordemServico={ordemServico} />

          <AddOrdemServicoDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            ordemServico={ordemServico}
          />
        </LoadingState>
      </div>
    </MainLayout>
  );
}
