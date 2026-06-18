import { Separator } from '@/atomic/atm.separator/separator.component';
import { H4 } from '@/atomic/atm.typography';
import { DetailItem } from '@/atomic/atm.detail-item/detail-item.component';
import { Button } from '@/atomic/atm.button/button.component';

export interface ServicoHeaderProps {
  agendamento: {
    serviceType: string;
    technician: string;
    date: string;
    time: string;
    value: string;
  };
  onStart: () => void;
}

export const ServicoHeader = ({ agendamento, onStart }: ServicoHeaderProps) => {
  return (
    <>
      <Separator className='bg-muted-foreground/20' />
      <div className='flex flex-col gap-md'>
        <H4 className='text-grayscale-medium font-medium tracking-wider text-xxs uppercase'>
          Dados do Serviço
        </H4>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-md gap-x-xl'>
          <DetailItem
            label='Tipo de Serviço'
            value={[agendamento.serviceType]}
            className='gap-1'
          />
          <DetailItem
            label='Técnico responsável.'
            value={[agendamento.technician]}
            className='gap-1'
          />
          <DetailItem
            label='Data e horário'
            value={[`${agendamento.date} - ${agendamento.time}`]}
            className='gap-1'
          />
          <DetailItem
            label='Valor do serviço'
            value={[
              <span key='value' className='text-brand-cta-dark font-bold'>
                {agendamento.value}
              </span>,
            ]}
            className='gap-1'
          />
        </div>
      </div>

      <Separator className='bg-muted-foreground/20' />

      <div className='flex justify-center pt-md'>
        <Button
          className='bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md'
          onClick={onStart}
        >
          Iniciar Serviço
        </Button>
      </div>
    </>
  );
};
