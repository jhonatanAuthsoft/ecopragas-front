import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/atomic/atm.button/button.component";
import { H1 } from "@/atomic/atm.typography";
import { MainLayout } from "@/atomic/tpl.main-layout/main-layout.component";
import { ROUTES } from "@/constants/routes";
import {
  EditOrdemServicoDialog,
  getOrdemServicoDetalhesById,
  OrdemServicoDetalhesCard,
} from "./components/ordem-servico-detalhes";
import type { OrdemServicoDetalhesData } from "./components/ordem-servico-detalhes/ordem-servico-detalhes.types";
import type { OrdemServico } from "./OrdensServico";

// TODO: organizar os labels na pasta de model/
export const TIPO_SERVICO_LABELS: Record<OrdemServico["tipoServico"], string> = {
  sanitizacao: "Sanitizacao",
  controle_pragas_vetores: "Controle de Pragas e Vetores",
  higienizacao: "Higienizacao",
  monitoramento_insetos: "Monitoramento de insetos",
  monitoramento_roedores: "Monitoramento de roedores",
};

export default function OrdemServicoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ordem, setOrdem] = useState<OrdemServicoDetalhesData>(() =>
    getOrdemServicoDetalhesById(id ?? "4"),
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    setOrdem(getOrdemServicoDetalhesById(id ?? "4"));
  }, [id]);

  const handleDelete = () => {
    toast.info("Em desenvolvimento...");
    navigate(ROUTES.SERVICE_ORDER.BASE);
  };

  const handleEditSubmit = (updatedOrdem: OrdemServicoDetalhesData) => {
    setOrdem(updatedOrdem);
    setIsEditDialogOpen(false);
    toast.info("Em desenvolvimento...");
  };

  const handleDownload = () => {
    toast.info("Em desenvolvimento...");
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-md">
        <div className="flex flex-col self-start gap-xs">
          <Button
            variant="link"
            size="lg"
            onClick={() => navigate(ROUTES.SERVICE_ORDER.BASE)}
            leftIcon={<ChevronLeft className="size-md" />}
          >
            Voltar para Ordens de Serviço
          </Button>

          <H1>Detalhes do Serviço</H1>
        </div>

        <OrdemServicoDetalhesCard
          ordem={ordem}
          onDelete={handleDelete}
          onEdit={() => setIsEditDialogOpen(true)}
          onDownload={handleDownload}
        />

        <EditOrdemServicoDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          ordem={ordem}
          onSubmit={handleEditSubmit}
        />
      </div>
    </MainLayout>
  );
}
