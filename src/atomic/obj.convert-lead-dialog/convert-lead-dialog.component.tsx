import { CheckBadgeIcon } from "@/assets/icons/check-badge";
import { Button } from "@/atomic/atm.button/button.component";
import { Dialog, DialogContent } from "@/atomic/mol.dialog/dialog.component";
import type { Lead } from "@/pages/leads/Leads";
import { Body1, H2 } from "../atm.typography";

interface ConvertLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  lead: Lead | null;
}

export const ConvertLeadDialog = ({
  open,
  onOpenChange,
  onConfirm,
  lead,
}: ConvertLeadDialogProps) => {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[442px] flex flex-col items-center text-center p-lg pt-[70px]">
        <div className="flex flex-col items-center text-center gap-md mb-lg">
          <div className="flex items-center justify-center p-lg">
            <CheckBadgeIcon />
          </div>

          <div className="flex flex-col items-center text-center gap-xs">
            <H2>Converter lead em cliente</H2>
            <Body1 className="text-muted-foreground text-center">
              Use as informações do lead para gerar um novo cadastro de cliente.
            </Body1>
          </div>
        </div>

        <div className="flex gap-md w-full">
          <Button variant="outline" size="lg" fullWidth onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button size="lg" fullWidth onClick={onConfirm}>
            Cadastrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
