import { Button } from "@/atomic/atm.button/button.component";
import { Body1, H2 } from "@/atomic/atm.typography";
import { Dialog, DialogContent } from "@/atomic/mol.dialog/dialog.component";
import type { AgendamentoDetalhesView } from "./agendamento-detalhes/agendamento-detalhes.types";

interface ReagendarAgendamentoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agendamento: AgendamentoDetalhesView;
  onConfirm: () => void;
}

export function ReagendarAgendamentoDialog({
  open,
  onOpenChange,
  agendamento,
  onConfirm,
}: ReagendarAgendamentoDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col max-w-[442px] gap-lg">
        <div className="flex flex-col gap-xs">
          <H2>Reagendar</H2>
          {/* TODO: form reagendamento */}
          <Body1 className="font-normal text-grayscale-dark">
            Formulario de reagendamento para {agendamento.clienteNome ?? "-"}.
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
          <Button variant="primary" size="lg" className="flex-1" onClick={handleConfirm}>
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
