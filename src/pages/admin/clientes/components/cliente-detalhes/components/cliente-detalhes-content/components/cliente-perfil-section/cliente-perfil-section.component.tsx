import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { IdentificationIcon } from "@/assets/icons/identification";
import { MapPinIcon } from "@/assets/icons/map-pin";
import { PencilSquareIcon } from "@/assets/icons/pencil-square";
import { PhoneIcon } from "@/assets/icons/phone";
import { TrashIcon } from "@/assets/icons/trash";
import { Body2, H2 } from "@/atomic/atm.typography";
import { ROUTES } from "@/constants/routes";
import { useDeleteCliente } from "@/domain/cliente";
import type { Cliente } from "@/model/rest/cliente";
import { formatCPFCNPJ, formatPhone } from "@/utils/formatters";
import { formatClienteEndereco } from "../../../../cliente-detalhes.utils";
import { DeleteClienteDialog } from "./components/delete-cliente-dialog";
import { EditClienteDialog } from "./components/edit-cliente-dialog";

interface ClientePerfilSectionProps {
  cliente: Cliente;
  onClienteUpdated?: () => void;
}

export const ClientePerfilSection = ({ cliente, onClienteUpdated }: ClientePerfilSectionProps) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { deleteCliente, isDeleteClienteLoading } = useDeleteCliente({
    onSuccess: () => {
      toast.success("Cliente excluído com sucesso!");
      setIsDeleteDialogOpen(false);
      navigate(ROUTES.ADMIN.CLIENT.BASE);
    },
  });

  const handleDeleteConfirm = () => {
    if (!cliente.id) return;
    deleteCliente({ id: cliente.id });
  };

  return (
    <>
      <div className="flex flex-col gap-xs">
        <div className="flex items-center justify-between gap-sm">
          <H2>{cliente.nomeRazaoSocial}</H2>
          <div className="flex items-center gap-sm">
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <TrashIcon className="size-lg text-feedback-error-medium" />
            </button>
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <PencilSquareIcon className="size-lg text-brand-primary-medium" />
            </button>
          </div>
        </div>
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

      <DeleteClienteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleteClienteLoading}
      />
      <EditClienteDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        cliente={cliente}
        onClienteUpdated={() => onClienteUpdated?.()}
      />
    </>
  );
};
