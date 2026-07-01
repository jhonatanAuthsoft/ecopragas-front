import { FileUpload } from "@/atomic/atm.file-upload";
import { TextareaInput } from "@/atomic/atm.textarea-input/textarea-input.component";
import { H3 } from "@/atomic/atm.typography";
import { Card } from "@/atomic/mol.card/card.component";

export interface ServicoFotosProps {
  onFilesAntesChange: (files: File[]) => void;
  onFilesDepoisChange: (files: File[]) => void;
  observacoesGerais?: string;
  onChangeObservacoes?: (v: string) => void;
  className?: string;
}

export const ServicoFotos = ({
  onFilesAntesChange,
  onFilesDepoisChange,
  observacoesGerais,
  onChangeObservacoes,
  className,
}: ServicoFotosProps) => {
  return (
    <Card
      className={`rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl ${className || ""}`}
    >
      <div className="flex flex-col gap-lg w-full">
        <H3 className="text-grayscale-dark font-bold text-lg">Fotos do Serviço</H3>

        <div className="flex flex-col gap-md">
          <p className="text-xs font-medium text-grayscale-dark">Antes</p>
          <FileUpload id="fotos-antes" onFilesChange={onFilesAntesChange} />
        </div>

        <div className="flex flex-col gap-md">
          <p className="text-xs font-medium text-grayscale-dark">Depois</p>
          <FileUpload id="fotos-depois" onFilesChange={onFilesDepoisChange} />
        </div>

        <TextareaInput
          label="Observações gerais"
          placeholder="Registre informações importantes sobre a execução do serviço..."
          value={observacoesGerais}
          onChange={onChangeObservacoes}
          className="w-full"
        />
      </div>
    </Card>
  );
};
