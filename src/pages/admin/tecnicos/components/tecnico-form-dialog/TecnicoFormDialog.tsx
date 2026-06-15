import { H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent, DialogHeader } from "@/atomic/mol.dialog/dialog.component";
import type { Tecnico, UpdateTecnicoDTO } from "@/model/rest/tecnico";
import { TecnicoForm } from "./TecnicoForm";

interface TecnicoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tecnico: Tecnico | null;
  onSubmit: (data: UpdateTecnicoDTO, id?: string) => Promise<void>;
}

export const TecnicoFormDialog = ({
  open,
  onOpenChange,
  tecnico,
  onSubmit,
}: TecnicoFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px]">
        <DialogHeader className="mb-md">
          <H2>{tecnico ? "Editar Técnico" : "Novo Técnico"}</H2>
        </DialogHeader>

        {open && (
          <TecnicoForm
            key={tecnico?.id ?? "new"}
            tecnico={tecnico}
            onSubmit={onSubmit}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
