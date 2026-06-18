import { Card } from '@/atomic/mol.card/card.component';
import { H3 } from '@/atomic/atm.typography';
import { FileUpload } from '@/atomic/atm.file-upload';
import { TextareaInput } from '@/atomic/atm.textarea-input/textarea-input.component';

export interface ServicoFotosProps {
  onFilesAntesChange: (files: File[]) => void;
  onFilesDepoisChange: (files: File[]) => void;
  className?: string;
}

export const ServicoFotos = ({ onFilesAntesChange, onFilesDepoisChange, className }: ServicoFotosProps) => {
  return (
    <Card className={`rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl ${className || ''}`}>
      <div className='flex flex-col gap-lg'>
        <H3 className='text-grayscale-dark font-bold text-lg'>
          Fotos do Serviço
        </H3>

        <div className='flex flex-col gap-md'>
          <p className='text-xs font-medium text-grayscale-dark'>
            Antes
          </p>
          <FileUpload
            id='fotos-antes'
            onFilesChange={onFilesAntesChange}
          />
        </div>

        <div className='flex flex-col gap-md'>
          <p className='text-xs font-medium text-grayscale-dark'>
            Depois
          </p>
          <FileUpload
            id='fotos-depois'
            onFilesChange={onFilesDepoisChange}
          />
        </div>

        <TextareaInput
          label='Observações gerais'
          placeholder='Registre informações importantes sobre a execução do serviço...'
        />
      </div>
    </Card>
  );
};