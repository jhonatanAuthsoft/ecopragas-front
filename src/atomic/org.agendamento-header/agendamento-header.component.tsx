import { MapPin, Phone, IdCard } from 'lucide-react';
import { Badge } from '@/atomic/atm.badge/badge.component';
import { Body2, H3 } from '@/atomic/atm.typography';
import { Card } from '@/atomic/mol.card/card.component';

export interface AgendamentoHeaderProps {
  agendamento: {
    status: string;
    osNumber: string;
    clientName: string;
    cpf: string;
    phone: string;
    address: string;
  };
  className?: string;
  children?: React.ReactNode;
}

export const AgendamentoHeader = ({ agendamento, className, children }: AgendamentoHeaderProps) => {
  return (
    <Card className={`rounded-large! border-muted-foreground/20 bg-background overflow-hidden ${className || ''}`}>
      <div className='p-xl pt-md flex flex-col gap-md'>
        <div className='flex justify-between items-start'>
          <div className='flex flex-col gap-md'>
            <div className='flex pt-xs'>
              <Badge
                variant='secondary'
                className='bg-brand-secondary-medium/10 text-brand-secondary-medium border-brand-secondary-medium/20 px-md py-1'
              >
                {agendamento.status} - {agendamento.osNumber}
              </Badge>
            </div>
            <div className='flex flex-col gap-sm'>
              <H3 className='text-grayscale-dark font-bold text-lg'>
                {agendamento.clientName}
              </H3>

              <div className='flex flex-wrap gap-x-md gap-y-xs text-grayscale-dark'>
                <div className='flex items-center gap-xs'>
                  <IdCard size={16} />
                  <Body2>{agendamento.cpf}</Body2>
                </div>
                <div className='flex items-center gap-xs'>
                  <Phone size={16} />
                  <Body2>{agendamento.phone}</Body2>
                </div>
                <div className='flex items-center gap-xs'>
                  <MapPin size={16} />
                  <Body2>{agendamento.address}</Body2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </Card>
  );
};
