import { ExclamationTriangleFilledIcon } from "@/assets/icons/exclamation-triangle-filled";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent } from "@/atomic/mol.dialog/dialog.component";
import type { Tecnico } from "@/model/rest/tecnico";

interface DeleteTecnicoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tecnico: Tecnico | null;
  onConfirm: () => void;
}

export const DeleteTecnicoDialog = ({
  open,
  onOpenChange,
  tecnico,
  onConfirm,
}: DeleteTecnicoDialogProps) => {
  if (!tecnico) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[442px] text-center">
        <div className="flex items-center justify-center p-lg mt-lg">
          <ExclamationTriangleFilledIcon className="size-2xl text-feedback-error-medium" />
        </div>

        <div className="flex flex-col gap-md">
          <div className="flex flex-col gap-xs">
            <H2>Excluir Técnico?</H2>
            <Body1 className="font-normal text-grayscale-dark">
              Você está prestes a excluir este técnico. Todas as informações inseridas serão
              removidas.
            </Body1>
          </div>

          <div className="flex gap-md w-full">
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" size="lg" className="flex-1" onClick={onConfirm}>
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
