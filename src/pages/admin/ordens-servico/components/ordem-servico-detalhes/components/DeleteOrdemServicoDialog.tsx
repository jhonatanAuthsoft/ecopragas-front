import { ExclamationTriangleFilledIcon } from "@/assets/icons/exclamation-triangle-filled";
import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent } from "@/atomic/mol.dialog/dialog.component";

interface DeleteOrdemServicoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteOrdemServicoDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: DeleteOrdemServicoDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center text-center max-w-[442px] gap-lg">
        <div className="flex flex-col items-center gap-md">
          <ExclamationTriangleFilledIcon className="size-2xl m-lg mt-3xl text-feedback-error-medium" />

          <div className="flex flex-col gap-xs">
            <H2>Excluir Ordem de Serviço?</H2>
            <Body1 className="font-normal text-grayscale-dark">
              Esta ação é destrutiva. Todas as informações inseridas na O.S. serão perdidas.
            </Body1>
          </div>
        </div>

        <div className="flex gap-md w-full">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="flex-1"
            onClick={handleConfirm}
            isLoading={isLoading}
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
