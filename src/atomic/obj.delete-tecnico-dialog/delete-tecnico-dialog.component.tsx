import { TriangleAlert, X } from "lucide-react";
import { Button } from "@/atomic/atm.button/button.component";
import { Dialog, DialogContent } from "@/atomic/mol.dialog/dialog.component";
import type { Tecnico } from "@/services/tecnicos.service";

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
      <DialogContent className="sm:max-w-[425px] flex flex-col items-center text-center p-8">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="h-12 w-12 rounded-full bg-feedback-error-light flex items-center justify-center mb-4">
          <TriangleAlert className="h-6 w-6 text-feedback-error-medium" />
        </div>

        <h2 className="text-xl font-bold text-foreground mb-2">Excluir Técnico?</h2>

        <p className="text-muted-foreground text-center mb-8">
          Você está prestes a excluir este técnico. Todas as informações inseridas serão removidas.
        </p>

        <div className="flex gap-3 w-full">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            className="flex-1 bg-feedback-error-medium hover:bg-feedback-error-dark text-white"
            onClick={onConfirm}
          >
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
