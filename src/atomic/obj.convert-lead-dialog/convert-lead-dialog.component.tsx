import { Dialog, DialogContent } from "@/atomic/mol.dialog/dialog.component";
import { Button } from "@/atomic/atm.button/button.component";
import { Check, X } from "lucide-react";
import { Lead } from "@/pages/leads/Leads";

interface ConvertLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  lead: Lead | null;
}

export const ConvertLeadDialog = ({ open, onOpenChange, onConfirm, lead }: ConvertLeadDialogProps) => {
  if (!lead) return null;

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

        <div className="h-12 w-12 rounded-full bg-feedback-success-medium flex items-center justify-center mb-4">
          <Check className="h-6 w-6 text-white" />
        </div>

        <h2 className="text-xl font-bold text-foreground mb-2">
          Converter lead em cliente
        </h2>

        <p className="text-muted-foreground text-center mb-8">
          Use as informações do lead para gerar um novo cadastro de cliente.
        </p>

        <div className="flex gap-3 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1 bg-feedback-success-medium hover:bg-feedback-success-dark text-white"
            onClick={onConfirm}
          >
            Cadastrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
