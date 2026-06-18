import {
  ChevronLeft,
  MapPin,
  Phone,
  User,
  IdCard,
  ChevronDown,
  Plus,
  Upload,
  Check,
  Bug,
  Beaker,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Badge } from '@/atomic/atm.badge/badge.component';
import { Button } from '@/atomic/atm.button/button.component';
import { Separator } from '@/atomic/atm.separator/separator.component';
import { Body1, Body2, H1, H3, H4 } from '@/atomic/atm.typography';
import { Card, CardContent } from '@/atomic/mol.card/card.component';
import { MainLayout } from '@/atomic/tpl.main-layout/main-layout.component';
import { ROUTES } from '@/constants/routes';
import { DetailItem } from '@/atomic/atm.detail-item/detail-item.component';
import { TextInput } from '@/atomic/atm.text-input/text-input.component';
import { SelectInput } from '@/atomic/atm.select-input/select-input.component';
import { TextareaInput } from '@/atomic/atm.textarea-input/textarea-input.component';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/atomic/mol.popover/popover.component';
import { Checkbox } from '@/atomic/atm.checkbox/checkbox.component';
import { FileUpload } from '@/atomic/atm.file-upload';
import { SelectorGroup } from '@/atomic/atm.selector-group';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/atomic/mol.accordion/accordion.component';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/atomic/mol.table/table.component';

const MonitoringPointDetails = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <div className='flex flex-col gap-md pt-sm text-grayscale-dark'>
      <div className='grid grid-cols-2 gap-md'>
        <div className='flex flex-col gap-2xs'>
          <p className='font-bold text-xs'>Grau de Infestação</p>
          <p className='text-xs'>Alto</p>
        </div>
        <div className='flex flex-col gap-2xs'>
          <p className='font-bold text-xs'>Produto utilizado</p>
          <p className='text-xs'>J Sanetização</p>
        </div>
      </div>
      
      <div className='grid grid-cols-2 gap-md'>
        <div className='flex flex-col gap-2xs'>
          <p className='font-bold text-xs'>Adesiva</p>
          <p className='text-xs'>NA</p>
        </div>
      </div>

      <Separator className='bg-muted-foreground/20' />

      <div className='grid grid-cols-2 gap-md'>
        <div className='flex flex-col gap-2xs'>
          <p className='font-bold text-xs'>Produto</p>
          <p className='text-xs'>Hipoalérgico</p>
        </div>
        <div className='flex flex-col gap-2xs'>
          <p className='font-bold text-xs'>ml/L ou g/m³</p>
          <p className='text-xs'>1000</p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-md'>
        <div className='flex flex-col gap-2xs'>
          <p className='font-bold text-xs'>Refil Luminosa</p>
          <p className='text-xs'>Sim</p>
        </div>
        <div className='flex flex-col gap-2xs'>
          <p className='font-bold text-xs'>Quantidade</p>
          <p className='text-xs'>12</p>
        </div>
      </div>

      <Separator className='bg-muted-foreground/20' />

      <div className='flex flex-col gap-md'>
        <H3 className='text-grayscale-dark font-bold text-lg'>
          Fotos do Serviço
        </H3>
        <div className='grid grid-cols-3 gap-xs'>
          {[1, 2, 3].map((img) => (
            <div key={img} className='aspect-[3/2] bg-grayscale-x-dark rounded-md flex flex-col items-center justify-center text-white p-xs text-center relative overflow-hidden'>
              <div className='absolute inset-0 border-[0.5px] border-white/20' style={{ background: 'linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%), linear-gradient(-45deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%), linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%), linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%)' }}></div>
              <span className='text-2xl font-bold z-10'>3:2</span>
              <span className='text-[8px] z-10'>Replace with Image</span>
              <span className='text-[6px] z-10'>@solo_cube's aspect ratio keeper</span>
            </div>
          ))}
        </div>
        
        {/* Pagination Mock */}
        <div className='flex items-center justify-center gap-md text-xs text-grayscale-medium pt-sm'>
          <button className='flex items-center gap-xs text-grayscale-light hover:text-grayscale-medium transition-colors'>
            <ArrowLeft size={12} /> Anterior
          </button>
          <div className='flex items-center gap-sm'>
            <button className='w-6 h-6 rounded-sm bg-brand-primary-medium text-white flex items-center justify-center'>1</button>
            <button className='w-6 h-6 rounded-sm hover:bg-grayscale-light/20 flex items-center justify-center text-grayscale-dark'>2</button>
            <span>...</span>
            <button className='w-6 h-6 rounded-sm hover:bg-grayscale-light/20 flex items-center justify-center text-grayscale-dark'>3</button>
          </div>
          <button className='flex items-center gap-xs text-grayscale-x-dark hover:text-grayscale-dark transition-colors font-medium'>
            Seguinte <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-xs pt-md'>
        <p className='text-xs text-grayscale-dark'>Observações gerais</p>
        <p className='text-xs text-grayscale-medium leading-relaxed text-justify'>
          Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
        </p>
        <p className='text-xs text-grayscale-medium leading-relaxed text-justify mt-sm'>
          Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
        </p>
      </div>
    </div>
  );
};

const MonitoringPointForm = ({ pointId, onSave }: { pointId: number; onSave: () => void }) => {
  const [refilLuminosa, setRefilLuminosa] = useState<boolean | undefined>(undefined);

  return (
    <div className='flex flex-col gap-md pt-sm'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
        <SelectInput
          label='Grau de Infestação'
          placeholder='Selecione o grau'
          options={[
            { label: 'Baixo', value: 'baixo' },
            { label: 'Médio', value: 'medio' },
            { label: 'Alto', value: 'alto' },
          ]}
        />
        <TextInput label='Produto Utilizado' placeholder='Informe o produto' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
        <TextInput label='Adesiva Trocada' placeholder='Informe a quantidade' />
      </div>

      <Separator className='bg-muted-foreground/20' />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
        <TextInput label='Produto' placeholder='Informe o produto' />
        <TextInput label='ml/L ou g/m³' placeholder='Informe a dosagem' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-md items-start'>
        <SelectorGroup
          label='Refil Luminosa'
          value={refilLuminosa}
          onChange={setRefilLuminosa}
          options={[
            { label: 'Sim', value: true },
            { label: 'Não', value: false },
          ]}
        />
        {refilLuminosa && (
          <TextInput
            label='Quantidade(unidades)'
            placeholder='Ex: 2'
            type='number'
          />
        )}
      </div>

      <div className='flex flex-col gap-md pt-md'>
        <H3 className='text-grayscale-dark font-bold text-lg'>
          Fotos do Serviço
        </H3>
        <FileUpload
          id={`fotos-ponto-${pointId}`}
          onFilesChange={(files) => console.log(`Files for point ${pointId}:`, files)}
        />
        <TextareaInput
          label='Observações gerais'
          placeholder='Registre informações importantes sobre a execução do serviço...'
        />
      </div>
      
      <div className='flex justify-center pt-md'>
        <Button 
          className='bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md'
          onClick={onSave}
        >
          Salvar área
        </Button>
      </div>
    </div>
  );
};

const MonitoringPointContainer = ({ pointId }: { pointId: number }) => {
  const [isSaved, setIsSaved] = useState(false);

  return isSaved ? (
    <MonitoringPointDetails onEdit={() => setIsSaved(false)} />
  ) : (
    <MonitoringPointForm pointId={pointId} onSave={() => setIsSaved(true)} />
  );
};

const RodentStationDetails = ({ onEdit }: { onEdit: () => void }) => {
  const isMobile = useIsMobile();

  return (
    <div className='flex flex-col gap-md pt-sm text-grayscale-dark'>
      <SelectorGroup
        label='Porta Isca Raticida'
        value={'consumida'}
        options={[
          { label: 'Isca Consumida', value: 'consumida' },
          { label: 'Isca Danificada', value: 'danificada' },
          { label: 'Isca Extraviada', value: 'extraviada' },
          { label: 'Porta Isca Extraviado', value: 'porta_isca_extraviado' },
          { label: 'Isca em conformidade', value: 'conformidade' },
        ]}
        className='pointer-events-none'
      />
      <SelectorGroup
        label='Armadilha Adesiva'
        value={'conformidade'}
        options={[
          { label: 'Cola danificada', value: 'cola_danificada' },
          { label: 'Porta adesivo Quebrado', value: 'porta_adesivo_quebrado' },
          { label: 'Porta adesivo extraviado', value: 'porta_adesivo_extraviado' },
          { label: 'Em conformidade', value: 'conformidade' },
        ]}
        className='pointer-events-none'
      />

      <Separator className='bg-muted-foreground/20' />

      <H3 className='text-grayscale-dark font-bold text-lg'>Controle</H3>
      {isMobile ? (
        <div className='flex flex-col gap-sm border border-grayscale-light rounded-md p-md'>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-xs'>Produto</span>
            <span className='text-xs'>Raticida Granulado</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-xs'>Quantidade</span>
            <span className='text-xs'>2</span>
          </div>
        </div>
      ) : (
        <div className='rounded-md border border-grayscale-light overflow-hidden'>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='font-bold h-auto py-sm text-xs'>Produto</TableHead>
                <TableHead className='font-bold h-auto py-sm text-xs text-right'>Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className='hover:bg-transparent border-0'>
                <TableCell className='py-md text-xs'>Raticida Granulado</TableCell>
                <TableCell className='py-md text-xs text-right'>2</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      <Separator className='bg-muted-foreground/20' />

      <H3 className='text-grayscale-dark font-bold text-lg'>Pontos Variáveis</H3>
      {isMobile ? (
        <div className='flex flex-col gap-sm border border-grayscale-light rounded-md p-md'>
          <div className='flex flex-col gap-2xs pb-sm border-b border-grayscale-light/30'>
            <span className='font-bold text-xs'>Local</span>
            <span className='text-xs'>Despensa Principal</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-xs'>Produto</span>
            <span className='text-xs'>Bloco Parafinado</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-xs'>Quantidade</span>
            <span className='text-xs'>1</span>
          </div>
        </div>
      ) : (
        <div className='rounded-md border border-grayscale-light overflow-hidden'>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='font-bold h-auto py-sm text-xs'>Local</TableHead>
                <TableHead className='font-bold h-auto py-sm text-xs'>Produto</TableHead>
                <TableHead className='font-bold h-auto py-sm text-xs text-right'>Quantidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className='hover:bg-transparent border-0'>
                <TableCell className='py-md text-xs'>Despensa Principal</TableCell>
                <TableCell className='py-md text-xs'>Bloco Parafinado</TableCell>
                <TableCell className='py-md text-xs text-right'>1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      <Separator className='bg-muted-foreground/20' />

      <div className='flex flex-col gap-md'>
        <H3 className='text-grayscale-dark font-bold text-lg'>
          Fotos do Serviço
        </H3>
        <div className='grid grid-cols-3 gap-xs'>
          {[1, 2, 3].map((img) => (
            <div key={img} className='aspect-[3/2] bg-grayscale-x-dark rounded-md flex flex-col items-center justify-center text-white p-xs text-center relative overflow-hidden'>
              <div className='absolute inset-0 border-[0.5px] border-white/20' style={{ background: 'linear-gradient(45deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%), linear-gradient(-45deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%), linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%), linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 51%)' }}></div>
              <span className='text-2xl font-bold z-10'>3:2</span>
              <span className='text-[8px] z-10'>Replace with Image</span>
              <span className='text-[6px] z-10'>@solo_cube's aspect ratio keeper</span>
            </div>
          ))}
        </div>
        
        {/* Pagination Mock */}
        <div className='flex items-center justify-center gap-md text-xs text-grayscale-medium pt-sm'>
          <button className='flex items-center gap-xs text-grayscale-light hover:text-grayscale-medium transition-colors'>
            <ArrowLeft size={12} /> Anterior
          </button>
          <div className='flex items-center gap-sm'>
            <button className='w-6 h-6 rounded-sm bg-brand-primary-medium text-white flex items-center justify-center'>1</button>
            <button className='w-6 h-6 rounded-sm hover:bg-grayscale-light/20 flex items-center justify-center text-grayscale-dark'>2</button>
            <span>...</span>
            <button className='w-6 h-6 rounded-sm hover:bg-grayscale-light/20 flex items-center justify-center text-grayscale-dark'>3</button>
          </div>
          <button className='flex items-center gap-xs text-grayscale-x-dark hover:text-grayscale-dark transition-colors font-medium'>
            Seguinte <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-xs pt-md'>
        <p className='text-xs text-grayscale-dark'>Observações gerais</p>
        <p className='text-xs text-grayscale-medium leading-relaxed text-justify'>
          Sorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
        </p>
        <p className='text-xs text-grayscale-medium leading-relaxed text-justify mt-sm'>
          Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.
        </p>
      </div>

      {/* Action removed to match the updated Monitoramento de Insetos design (no Editar area button as requested before) */}
    </div>
  );
};

const RodentStationForm = ({ pointId, onSave }: { pointId: number; onSave: () => void }) => {
  const [portaIsca, setPortaIsca] = useState<string | undefined>(undefined);
  const [adhesiveTrap, setAdhesiveTrap] = useState<string | undefined>(undefined);

  return (
    <div className='flex flex-col gap-md pt-sm'>
      <SelectorGroup
        label='Porta Isca Raticida'
        value={portaIsca}
        onChange={setPortaIsca}
        options={[
          { label: 'Isca Consumida', value: 'consumida' },
          { label: 'Isca Danificada', value: 'danificada' },
          { label: 'Isca Extraviada', value: 'extraviada' },
          { label: 'Porta Isca Extraviado', value: 'porta_isca_extraviado' },
          { label: 'Isca em conformidade', value: 'conformidade' },
        ]}
      />
      <SelectorGroup
        label='Armadilha Adesiva'
        value={adhesiveTrap}
        onChange={setAdhesiveTrap}
        options={[
          { label: 'Cola danificada', value: 'cola_danificada' },
          { label: 'Porta adesivo Quebrado', value: 'porta_adesivo_quebrado' },
          { label: 'Porta adesivo extraviado', value: 'porta_adesivo_extraviado' },
          { label: 'Em conformidade', value: 'conformidade' },
        ]}
      />

      <Separator className='bg-muted-foreground/20' />

      <H3 className='text-grayscale-dark font-bold text-lg'>
        Controle
      </H3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
        <TextInput label='Produto' placeholder='Informe o produto' />
        <TextInput label='Quantidade' placeholder='Informe a quantidade' type='number' />
      </div>

      <Button
        variant='link'
        className='w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium'
      >
        <Plus size={16} />
        Adicionar outro controle
      </Button>

      <Separator className='bg-muted-foreground/20' />

      <H3 className='text-grayscale-dark font-bold text-lg'>
        Pontos Variáveis
      </H3>

      <div className='flex flex-col gap-md'>
        <TextInput label='Local' placeholder='Informe o local' className='w-full' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
          <TextInput label='Produto' placeholder='Informe o produto' />
          <TextInput label='Quantidade' placeholder='Informe a quantidade' type='number' />
        </div>
      </div>

      <Button
        variant='link'
        className='w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium'
      >
        <Plus size={16} />
        Adicionar outro ponto
      </Button>

      <Separator className='bg-muted-foreground/20' />

      <div className='flex flex-col gap-md'>
        <div className='flex flex-col gap-xs'>
          <p className='text-xs font-medium text-grayscale-dark'>
            Fotos do Serviço
          </p>
          <FileUpload
            id={`fotos-servico-roedores-${pointId}`}
            onFilesChange={(files) => console.log(`Files for service point ${pointId}:`, files)}
          />
        </div>

        <div className='flex flex-col gap-xs'>
          <p className='text-xs font-medium text-grayscale-dark'>
            Porta-isca
          </p>
          <FileUpload
            id={`fotos-porta-isca-${pointId}`}
            onFilesChange={(files) => console.log(`Files for trap point ${pointId}:`, files)}
          />
        </div>

        <TextareaInput
          label='Observações gerais'
          placeholder='Registre informações importantes sobre a execução do serviço...'
        />
      </div>

      <div className='flex justify-center pt-md'>
        <Button 
          className='bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md'
          onClick={onSave}
        >
          Salvar estação
        </Button>
      </div>
    </div>
  );
};

const RodentStationContainer = ({ stationId }: { stationId: number }) => {
  const [isSaved, setIsSaved] = useState(false);

  return isSaved ? (
    <RodentStationDetails onEdit={() => setIsSaved(false)} />
  ) : (
    <RodentStationForm pointId={stationId} onSave={() => setIsSaved(true)} />
  );
};

const DetalhesAgendamento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isStarted, setIsStarted] = useState(false);
  const isMobile = useIsMobile();

  // MOCK: Em uma aplicação real, buscaríamos os dados pelo ID
  const MOCK_AGENDAMENTOS = [
    {
      id: '1',
      osNumber: 'OS-2025-001',
      status: 'Agendada',
      clientName: 'João Silva de Jesus da Souza',
      cpf: '000.000.000-00',
      phone: '(11) 0000-0000',
      address: 'Rio da Dona, 139, 44380-00, Cruz das Almas - Ba',
      serviceType: 'Controle de Pragas e Vetores',
      technician: 'João Carlos Silva',
      date: '03/12/2025',
      time: '08:00',
      value: 'R$ 400,00',
    },
    {
      id: '2',
      osNumber: 'OS-2025-002',
      status: 'Agendada',
      clientName: 'Maria Santos',
      cpf: '111.111.111-11',
      phone: '(11) 9999-9999',
      address: 'Av. Principal, 123 - Centro',
      serviceType: "Limpeza de caixa d'água",
      technician: 'João Carlos Silva',
      date: '04/12/2025',
      time: '10:30',
      value: 'R$ 250,00',
    },
    {
      id: '3',
      osNumber: 'OS-2025-003',
      status: 'Agendada',
      clientName: 'Condomínio Solar',
      cpf: '222.222.222-22',
      phone: '(11) 8888-8888',
      address: 'Rua das Flores, 456 - Jardim',
      serviceType: 'Desinsetização',
      technician: 'João Carlos Silva',
      date: '05/12/2025',
      time: '14:00',
      value: 'R$ 800,00',
    },
    {
      id: '4',
      osNumber: 'OS-2025-004',
      status: 'Agendada',
      clientName: 'Academia Fit',
      cpf: '333.333.333-33',
      phone: '(11) 7777-7777',
      address: 'Rua da Saúde, 789 - Centro',
      serviceType: 'Higienização',
      technician: 'João Carlos Silva',
      date: '06/12/2025',
      time: '16:00',
      value: 'R$ 500,00',
    },
    {
      id: '5',
      osNumber: 'OS-2025-005',
      status: 'Agendada',
      clientName: 'Restaurante Gourmet',
      cpf: '444.444.444-44',
      phone: '(11) 6666-6666',
      address: 'Rua do Sabor, 101 - Gastronomia',
      serviceType: 'Monitoramento de Insetos',
      technician: 'João Carlos Silva',
      date: '07/12/2025',
      time: '18:00',
      value: 'R$ 350,00',
    },
    {
      id: '6',
      osNumber: 'OS-2025-006',
      status: 'Agendada',
      clientName: 'Armazém Central',
      cpf: '555.555.555-55',
      phone: '(11) 5555-5555',
      address: 'Av. Industrial, 500 - Galpão 3',
      serviceType: 'Monitoramento de Roedores',
      technician: 'João Carlos Silva',
      date: '08/12/2025',
      time: '19:30',
      value: 'R$ 600,00',
    },
    ];

    const agendamento =
    MOCK_AGENDAMENTOS.find((a) => a.id === id) || MOCK_AGENDAMENTOS[0];

    const [selectedPests, setSelectedPests] = useState<string[]>(['Aranha']);

    const pests = [
    'Aranha',
    'Barata',
    'Camundongo',
    'Cupim',
    'Formiga',
    'Mosca',
    'Mosquito',
    'Ratazana',
    'Ratos',
    'Pombos',
    'Morcegos',
    'Outros',
    ];

    const togglePest = (pest: string) => {
    setSelectedPests((prev) =>
      prev.includes(pest) ? prev.filter((p) => p !== pest) : [...prev, pest]
    );
    };

    const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
    const equipmentOptions = [
    'Bomba de sucção',
    'Mangueira P',
    'Mangueira G',
    'Lava-jato',
    'Bombona',
    'Cinto de segurança',
    'Extensão de luz',
    'Escada P',
    'Escada G',
    ];

    const toggleEquipment = (equipment: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipment)
        ? prev.filter((e) => e !== equipment)
        : [...prev, equipment]
    );
    };

  const [areaExterna, setAreaExterna] = useState<string[]>([]);
  const areaExternaOptions = [
    'Não há',
    'Pavimentada',
    'Não Pavimentada',
    'Sem conservação',
    'Animais domésticos',
    'Outros',
  ];

  const toggleAreaExterna = (option: string) => {
    setAreaExterna((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const [areaVicinal, setAreaVicinal] = useState<string[]>([]);
  const areaVicinalOptions = [
    'Área Construída',
    'Terreno Baldio',
    'Riachos, canais',
    'Mata',
    'Animais domésticos',
  ];

  const toggleAreaVicinal = (option: string) => {
    setAreaVicinal((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const [uploadedFilesAntes, setUploadedFilesAntes] = useState<File[]>([]);
  const [uploadedFilesDepois, setUploadedFilesDepois] = useState<File[]>([]);
  const [hasPool, setHasPool] = useState<boolean | undefined>(undefined);
  const [hasPet, setHasPet] = useState<boolean | undefined>(undefined);
  const [localHygiene, setLocalHygiene] = useState<boolean | undefined>(
    undefined
  );
  const [hasRain, setHasRain] = useState<boolean | undefined>(undefined);
  const [performCollection, setPerformCollection] = useState<
    boolean | undefined
  >(undefined);
  const [closeRegistry, setCloseRegistry] = useState<boolean | undefined>(
    undefined
  );
  const [reservoirInstallation, setReservoirInstallation] = useState<
    boolean | undefined
  >(undefined);

  const [floatCondition, setFloatCondition] = useState<string | undefined>(
    undefined
  );
  const [coverageCondition, setCoverageCondition] = useState<
    string | undefined
  >(undefined);
  const [reservoirStructure, setReservoirStructure] = useState<
    string | undefined
  >(undefined);
  const [paintingCondition, setPaintingCondition] = useState<
    string | undefined
  >(undefined);
  const [internalCoating, setInternalCoating] = useState<string | undefined>(
    undefined
  );
  const [overflowSystem, setOverflowSystem] = useState<string | undefined>(
    undefined
  );

  const [monitoringPoints, setMonitoringPoints] = useState<number[]>([1, 2, 3]);
  const [rodentStations, setRodentStations] = useState<number[]>([1, 2, 3]);

  const removePoint = (pointIdToRemove: number) => {
    setMonitoringPoints((prev) => prev.filter((id) => id !== pointIdToRemove));
  };

  const removeRodentStation = (stationIdToRemove: number) => {
    setRodentStations((prev) => prev.filter((id) => id !== stationIdToRemove));
  };

  return (
    <MainLayout>
      <div
        className={cn(
          'flex flex-col gap-lg pb-xl',
          isMobile && 'bg-grayscale-x-light -mx-lg -mt-xl p-lg pt-xl min-h-screen'
        )}
      >
        {/* Back Link */}
        <Button
          variant='link'
          className='w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs'
          onClick={() => navigate(ROUTES.TECHNICIAN_SCHEDULING)}
        >
          <ChevronLeft size={20} />
          Voltar para Agendamentos
        </Button>

        {/* Header */}
        <div className='flex flex-col gap-xs'>
          <H1>Detalhes do Agendamento</H1>
          <Body2 className='text-muted-foreground'>
            Visualize informações sobre o agendamento
          </Body2>
        </div>

        {/* Client Info Header Card */}
        <Card className='rounded-large! border-muted-foreground/20 bg-background overflow-hidden'>
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

            {!isStarted && (
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
                        <span
                          key='value'
                          className='text-brand-cta-dark font-bold'
                        >
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
                    onClick={() => setIsStarted(true)}
                  >
                    Iniciar Serviço
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>

        {isStarted &&
          agendamento.serviceType !== 'Monitoramento de Insetos' &&
          agendamento.serviceType !== 'Monitoramento de Roedores' && (
          <div className='flex flex-col gap-lg'>
            {/* Diagnóstico do Local */}
            <Card className='rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl'>
              <div className='flex flex-col gap-md'>
                <H3 className='text-grayscale-dark font-bold text-lg'>
                  Diagnóstico do Local
                </H3>

                <div className='flex flex-col gap-sm'>
                  <Body2 className='font-medium text-grayscale-dark'>
                    {agendamento.serviceType === 'Higienização'
                      ? 'Tipo de equipamento'
                      : 'Praga-alvo'}
                  </Body2>
                  {isMobile ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type='button'
                          className='flex h-[55px] w-full items-center justify-between rounded-lg border border-grayscale-light bg-background px-md text-xs font-medium transition-all hover:border-grayscale-medium'
                        >
                          <span
                            className={cn(
                              'truncate',
                              agendamento.serviceType === 'Higienização'
                                ? selectedEquipment.length > 0
                                  ? 'text-grayscale-x-dark'
                                  : 'text-grayscale-medium'
                                : selectedPests.length > 0
                                  ? 'text-grayscale-x-dark'
                                  : 'text-grayscale-medium'
                            )}
                          >
                            {agendamento.serviceType === 'Higienização'
                              ? selectedEquipment.length > 0
                                ? selectedEquipment.join(', ')
                                : 'Selecione os equipamentos'
                              : selectedPests.length > 0
                                ? selectedPests.join(', ')
                                : 'Selecione as pragas'}
                          </span>
                          <ChevronDown className='h-4 w-4 opacity-50' />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        className='w-full min-w-[var(--radix-popover-trigger-width)] p-0'
                        align='start'
                      >
                        <div className='flex flex-col p-xs'>
                          {(agendamento.serviceType === 'Higienização'
                            ? equipmentOptions
                            : pests
                          ).map((item) => (
                            <button
                              key={item}
                              type='button'
                              onClick={() =>
                                agendamento.serviceType === 'Higienização'
                                  ? toggleEquipment(item)
                                  : togglePest(item)
                              }
                              className='flex items-center gap-sm px-sm py-xs hover:bg-grayscale-light/10 rounded-sm transition-colors text-left'
                            >
                              <Checkbox
                                checked={
                                  agendamento.serviceType === 'Higienização'
                                    ? selectedEquipment.includes(item)
                                    : selectedPests.includes(item)
                                }
                                onCheckedChange={() =>
                                  agendamento.serviceType === 'Higienização'
                                    ? toggleEquipment(item)
                                    : togglePest(item)
                                }
                              />
                              <span className='text-xs text-grayscale-dark'>
                                {item}
                              </span>
                            </button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <div className='flex flex-wrap gap-sm'>
                      {(agendamento.serviceType === 'Higienização'
                        ? equipmentOptions
                        : pests
                      ).map((item) => (
                        <button
                          key={item}
                          type='button'
                          onClick={() =>
                            agendamento.serviceType === 'Higienização'
                              ? toggleEquipment(item)
                              : togglePest(item)
                          }
                          className={cn(
                            'flex items-center gap-xs px-md py-xs rounded-md border text-xs font-medium transition-all',
                            (agendamento.serviceType === 'Higienização'
                              ? selectedEquipment.includes(item)
                              : selectedPests.includes(item))
                              ? 'bg-brand-cta-dark text-white border-brand-cta-dark'
                              : 'bg-white text-grayscale-dark border-grayscale-light hover:border-grayscale-medium'
                          )}
                        >
                          {(agendamento.serviceType === 'Higienização'
                            ? selectedEquipment.includes(item)
                            : selectedPests.includes(item)) && (
                            <Check size={14} />
                          )}
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {agendamento.serviceType === 'Higienização' && (
                  <>
                    <SelectorGroup
                      label='Chuva'
                      value={hasRain}
                      onChange={setHasRain}
                      options={[
                        { label: 'Sim', value: true },
                        { label: 'Não', value: false },
                      ]}
                    />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
                      <TextInput
                        label='Tempo de duração estimado'
                        placeholder='Ex: 2 horas'
                      />
                      <TextInput
                        label='Número de Técnicos'
                        placeholder='Ex: 2'
                        type='number'
                      />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
                      <SelectorGroup
                        label='Realizar coleta'
                        value={performCollection}
                        onChange={setPerformCollection}
                        options={[
                          { label: 'Sim', value: true },
                          { label: 'Não', value: false },
                        ]}
                      />
                      <SelectorGroup
                        label='Fechar registro'
                        value={closeRegistry}
                        onChange={setCloseRegistry}
                        options={[
                          { label: 'Sim', value: true },
                          { label: 'Não', value: false },
                        ]}
                      />
                    </div>

                    <Separator className='bg-muted-foreground/20' />

                    <div className='flex flex-col gap-sm'>
                      <H3 className='text-grayscale-dark font-bold text-lg'>
                        Foto do local do serviço
                      </H3>
                      <Body2 className='text-muted-foreground'>
                        Anexe uma foto para cada item: fachada do local,
                        estrutura do ambiente e localização da caixa d’água
                        (incluindo o acesso a ela).
                      </Body2>
                    </div>

                    <FileUpload
                      id='fotos-local-servico'
                      onFilesChange={(files) => console.log('Local files:', files)}
                    />
                  </>
                )}

                {agendamento.serviceType === 'Controle de Pragas e Vetores' && (
                  <>
                    <Separator className='bg-muted-foreground/20' />
                    <H3 className='text-grayscale-dark font-bold text-lg'>
                      Características do Local
                    </H3>
                    <TextInput
                      label='Ponto de referência'
                      placeholder='Informe um ponto de referência'
                      className='w-full'
                    />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
                      <SelectorGroup
                        label='Piscina'
                        value={hasPool}
                        onChange={setHasPool}
                        options={[
                          { label: 'Sim', value: true },
                          { label: 'Não', value: false },
                        ]}
                      />
                      <SelectorGroup
                        label='Pet'
                        value={hasPet}
                        onChange={setHasPet}
                        options={[
                          { label: 'Sim', value: true },
                          { label: 'Não', value: false },
                        ]}
                      />
                    </div>
                  </>
                )}

                {!['Controle de Pragas e Vetores', 'Higienização'].includes(
                  agendamento.serviceType
                ) && (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
                    <div className='space-y-2 w-full'>
                      <div className='flex items-center justify-between gap-xs'>
                        <label className='w-full'>
                          <p className='text-xs font-normal'>Área externa</p>
                        </label>
                      </div>
                      <Separator className='h-[1px] bg-grayscale-light/20' />
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type='button'
                            className='flex h-[55px] w-full items-center justify-between rounded-lg border border-grayscale-light bg-background px-md text-xs transition-all hover:border-grayscale-medium'
                          >
                            <span
                              className={cn(
                                'truncate',
                                areaExterna.length > 0
                                  ? 'text-grayscale-x-dark'
                                  : 'text-grayscale-medium'
                              )}
                            >
                              {areaExterna.length > 0
                                ? areaExterna.join(', ')
                                : 'Selecione o tipo'}
                            </span>
                            <ChevronDown className='h-4 w-4 opacity-50' />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className='w-full min-w-[var(--radix-popover-trigger-width)] p-0'
                          align='start'
                        >
                          <div className='flex flex-col p-xs'>
                            {areaExternaOptions.map((option) => (
                              <button
                                key={option}
                                type='button'
                                onClick={() => toggleAreaExterna(option)}
                                className='flex items-center gap-sm px-sm py-xs hover:bg-grayscale-light/10 rounded-sm transition-colors text-left'
                              >
                                <Checkbox
                                  checked={areaExterna.includes(option)}
                                  onCheckedChange={() =>
                                    toggleAreaExterna(option)
                                  }
                                />
                                <span className='text-xs text-grayscale-dark'>
                                  {option}
                                </span>
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className='space-y-2 w-full'>
                      <div className='flex items-center justify-between gap-xs'>
                        <label className='w-full'>
                          <p className='text-xs font-normal'>Área Vicinal</p>
                        </label>
                      </div>
                      <Separator className='h-[1px] bg-grayscale-light/20' />
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type='button'
                            className='flex h-[55px] w-full items-center justify-between rounded-lg border border-grayscale-light bg-background px-md text-xs transition-all hover:border-grayscale-medium'
                          >
                            <span
                              className={cn(
                                'truncate',
                                areaVicinal.length > 0
                                  ? 'text-grayscale-x-dark'
                                  : 'text-grayscale-medium'
                              )}
                            >
                              {areaVicinal.length > 0
                                ? areaVicinal.join(', ')
                                : 'Selecione o tipo'}
                            </span>
                            <ChevronDown className='h-4 w-4 opacity-50' />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent
                          className='w-full min-w-[var(--radix-popover-trigger-width)] p-0'
                          align='start'
                        >
                          <div className='flex flex-col p-xs'>
                            {areaVicinalOptions.map((option) => (
                              <button
                                key={option}
                                type='button'
                                onClick={() => toggleAreaVicinal(option)}
                                className='flex items-center gap-sm px-sm py-xs hover:bg-grayscale-light/10 rounded-sm transition-colors text-left'
                              >
                                <Checkbox
                                  checked={areaVicinal.includes(option)}
                                  onCheckedChange={() =>
                                    toggleAreaVicinal(option)
                                  }
                                />
                                <span className='text-xs text-grayscale-dark'>
                                  {option}
                                </span>
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Dados do Produto / Reservatório */}
            {agendamento.serviceType === 'Higienização' ? (
              <Card className='rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl'>
                <div className='flex flex-col gap-md'>
                  <H3 className='text-grayscale-dark font-bold text-lg'>
                    Reservatório
                  </H3>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
                    <div className='md:col-span-2'>
                      <TextInput
                        label='Localização'
                        placeholder='Informe a localização'
                      />
                    </div>
                    <SelectInput
                      label='Material do Reservatório'
                      placeholder='Selecione o material'
                      options={[
                        { label: 'Concreto', value: 'concreto' },
                        { label: 'Fibra', value: 'fibra' },
                        { label: 'Amianto', value: 'amianto' },
                        { label: 'PVC', value: 'pvc' },
                        { label: 'Fibrocimento', value: 'fibrocimento' },
                      ]}
                    />
                    <TextInput
                      label='Volume do reservatório (em litros)'
                      placeholder='Ex: 500'
                      type='number'
                    />
                    <TextInput
                      label='Desinfecção(g)'
                      placeholder='Ex: 10'
                    />
                    <SelectInput
                      label='Situação do reservatórios'
                      placeholder='Selecione a situação'
                      options={[
                        { label: 'Externo', value: 'externo' },
                        { label: 'Interno', value: 'interno' },
                        { label: 'Enterrada', value: 'enterrada' },
                        { label: 'Semi-enterrada', value: 'semi-enterrada' },
                      ]}
                    />
                    <SelectorGroup
                      label='Instalação do reservatório'
                      value={reservoirInstallation}
                      onChange={setReservoirInstallation}
                      options={[
                        { label: 'Correto', value: true },
                        { label: 'Incorreto', value: false },
                      ]}
                    />
                  </div>

                  <Separator className='bg-muted-foreground/20' />
                  <H3 className='text-grayscale-dark font-bold text-lg'>
                    Condições dos componentes
                  </H3>

                  <div className='flex flex-col gap-md'>
                    <SelectorGroup
                      label='Condições da boia'
                      value={floatCondition}
                      onChange={setFloatCondition}
                      options={[
                        { label: 'Bom estado', value: 'bom' },
                        { label: 'Comprometida', value: 'comprometida' },
                      ]}
                    />
                    <SelectorGroup
                      label='Condições da cobertura'
                      value={coverageCondition}
                      onChange={setCoverageCondition}
                      options={[
                        { label: 'Totalmente coberta', value: 'total' },
                        { label: 'Parcialmente', value: 'parcial' },
                        { label: 'Coberta', value: 'coberta' },
                      ]}
                    />
                    <SelectorGroup
                      label='Estrutura do reservatório'
                      value={reservoirStructure}
                      onChange={setReservoirStructure}
                      options={[
                        { label: 'Bom estado', value: 'bom' },
                        { label: 'Comprometida', value: 'comprometida' },
                      ]}
                    />
                    <SelectorGroup
                      label='Pintura'
                      value={paintingCondition}
                      onChange={setPaintingCondition}
                      options={[
                        { label: 'Bom estado', value: 'bom' },
                        { label: 'Comprometida', value: 'comprometida' },
                      ]}
                    />
                    <SelectorGroup
                      label='Revestimento interno'
                      value={internalCoating}
                      onChange={setInternalCoating}
                      options={[
                        { label: 'Bom estado', value: 'bom' },
                        { label: 'Ruim', value: 'ruim' },
                      ]}
                    />
                    <SelectorGroup
                      label='Sistema de ladrão'
                      value={overflowSystem}
                      onChange={setOverflowSystem}
                      options={[
                        { label: 'Correto', value: 'correto' },
                        { label: 'Incorreto', value: 'incorreto' },
                      ]}
                    />
                  </div>

                  <Button
                    variant='link'
                    className='w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium'
                  >
                    <Plus size={16} />
                    Adicionar novo reservatório
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className='rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl'>
                <div className='flex flex-col gap-md'>
                  <H3 className='text-grayscale-dark font-bold text-lg'>
                    Dados do Produto
                  </H3>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
                    {agendamento.serviceType ===
                    'Controle de Pragas e Vetores' ? (
                      <>
                        <TextInput
                          label='Princípio Ativo'
                          placeholder='Digite o princípio ativo'
                        />
                        <TextInput
                          label='Concentração'
                          placeholder='Digite a concentração'
                        />
                        <TextInput
                          label='Diluente'
                          placeholder='Digite o diluente'
                        />
                        <TextInput
                          label='Volume'
                          placeholder='Digite o volume'
                        />
                        <TextInput label='Setor' placeholder='Digite o setor' />
                        <TextInput
                          label='Equipamento utilizado'
                          placeholder='Digite o equipamento'
                        />
                      </>
                    ) : (
                      <>
                        <TextInput
                          label='Princípio Ativo'
                          placeholder='Digite o princípio ativo'
                        />
                        <TextInput
                          label='Produto'
                          placeholder='Digite o nome do produto'
                        />
                        <TextInput
                          label='Diluente'
                          placeholder='Digite o diluente'
                        />
                        <TextInput
                          label='Volume'
                          placeholder='Digite o volume'
                        />
                        <TextInput label='Setor' placeholder='Digite o setor' />
                        <TextInput
                          label='Equipamento'
                          placeholder='Digite o equipamento'
                        />
                        <TextInput
                          label='Registro MS'
                          placeholder='Informe o registro'
                          className='md:col-span-1'
                        />
                      </>
                    )}
                  </div>

                  <Button
                    variant='link'
                    className='w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium'
                  >
                    <Plus size={16} />
                    Adicionar outro produto
                  </Button>
                </div>
              </Card>
            )}

            {/* Vistoria / Descrição do Serviço */}
            {agendamento.serviceType === 'Controle de Pragas e Vetores' && (
              <Card className='rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl'>
                <div className='flex flex-col gap-md'>
                  <H3 className='text-grayscale-dark font-bold text-lg'>
                    Descrição do serviço
                  </H3>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
                    <TextInput label='Setor' placeholder='Digite o setor' />
                    <SelectorGroup
                      label='Higiene do local'
                      value={localHygiene}
                      onChange={setLocalHygiene}
                      options={[
                        { label: 'Boa', value: true },
                        { label: 'Ruim', value: false },
                      ]}
                    />
                    <TextInput
                      label='Nível de infestação'
                      placeholder='Informe o nível'
                    />
                    <TextInput
                      label='Equipamento utilizado'
                      placeholder='Digite o equipamento'
                    />
                  </div>

                  <Button
                    variant='link'
                    className='w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium'
                  >
                    <Plus size={16} />
                    Adicionar novo setor
                  </Button>
                </div>
              </Card>
            )}

            {!['Controle de Pragas e Vetores', 'Higienização'].includes(
              agendamento.serviceType
            ) && (
              <Card className='rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl'>
                <div className='flex flex-col gap-md'>
                  <H3 className='text-grayscale-dark font-bold text-lg'>
                    Vistoria
                  </H3>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-md'>
                    <TextInput label='Setor' placeholder='Digite o setor' />
                    <TextInput
                      label='Situação'
                      placeholder='Informe a situação'
                    />
                    <TextInput
                      label='Medida Corretiva'
                      placeholder='Informe a medida'
                    />
                    <SelectInput
                      label='Avaliação'
                      placeholder='Selecione o estado'
                      options={[
                        { label: 'Aplicado', value: 'aplicado' },
                        { label: 'Controlado', value: 'controlado' },
                        { label: 'Não controlado', value: 'nao-controlado' },
                      ]}
                    />
                  </div>

                  <Button
                    variant='link'
                    className='w-fit p-0 h-auto text-brand-cta-dark hover:no-underline gap-xs text-xs font-medium'
                  >
                    <Plus size={16} />
                    Adicionar novo setor
                  </Button>
                </div>
              </Card>
            )}

            {/* Fotos do Serviço */}
            <Card className='rounded-large! border-muted-foreground/20 bg-background overflow-hidden p-xl'>
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
                    onFilesChange={setUploadedFilesAntes}
                  />
                </div>

                <div className='flex flex-col gap-md'>
                  <p className='text-xs font-medium text-grayscale-dark'>
                    Depois
                  </p>
                  <FileUpload
                    id='fotos-depois'
                    onFilesChange={setUploadedFilesDepois}
                  />
                </div>

                <TextareaInput
                  label='Observações gerais'
                  placeholder='Registre informações importantes sobre a execução do serviço...'
                />
              </div>
            </Card>

            {/* Footer Actions */}
            <div className='flex flex-col-reverse md:flex-row items-center justify-center gap-md md:gap-xl pt-md'>
              <Button
                variant='link'
                className='text-feedback-error-medium hover:text-feedback-error-medium/80 hover:no-underline'
                onClick={() => setIsStarted(false)}
              >
                Cancelar
              </Button>
              <Button className='bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white w-full md:w-auto md:min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md'>
                <Check className='mr-xs' size={20} />
                Finalizar serviço
              </Button>
            </div>
          </div>
        )}

        {isStarted && agendamento.serviceType === 'Monitoramento de Insetos' && (
          <div className='flex flex-col gap-lg'>
            <div className='flex flex-col gap-md'>
              <H3 className='text-grayscale-dark font-bold text-lg'>
                Monitoramento
              </H3>
              
              <Accordion type='single' collapsible className='w-full flex flex-col gap-md'>
                {monitoringPoints.map((point) => (
                  <AccordionItem 
                    key={point} 
                    value={`item-${point}`} 
                    className='bg-white rounded-large! border border-muted-foreground/20 px-xl'
                  >
                    <AccordionTrigger className='hover:no-underline py-md'>
                      <div className='flex items-center justify-between w-full pr-sm'>
                        <div className='flex flex-col items-start gap-2xs text-left w-full'>
                          <span className='font-bold text-grayscale-dark text-md'>Área {point}</span>
                          <div className='flex flex-wrap items-center gap-x-md gap-y-xs text-grayscale-medium text-xs font-normal'>
                            <div className='flex items-center gap-xs'>
                              <Bug size={14} />
                              <span>Mosca Doméstica; Mosca Varejeira; Mosca Palomilla</span>
                            </div>
                            <div className='flex items-center gap-xs'>
                              <Beaker size={14} />
                              <span>Armadilha Luminosa</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          type='button'
                          className='text-feedback-error-medium hover:text-feedback-error-medium/80 transition-colors z-10 shrink-0 ml-xs cursor-pointer'
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removePoint(point);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='flex flex-col gap-md pb-xl'>
                      <MonitoringPointContainer pointId={point} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Footer Actions */}
            <div className='flex flex-col-reverse md:flex-row items-center justify-center gap-md md:gap-xl pt-md'>
              <Button
                variant='link'
                className='text-feedback-error-medium hover:text-feedback-error-medium/80 hover:no-underline'
                onClick={() => setIsStarted(false)}
              >
                Cancelar
              </Button>
              <Button className='bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white w-full md:w-auto md:min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md'>
                <Check className='mr-xs' size={20} />
                Finalizar serviço
              </Button>
            </div>
          </div>
        )}

        {isStarted && agendamento.serviceType === 'Monitoramento de Roedores' && (
          <div className='flex flex-col gap-lg'>
            <div className='flex flex-col gap-md'>
              <H3 className='text-grayscale-dark font-bold text-lg'>
                Estações de Monitoramento
              </H3>

              <Accordion type='single' collapsible className='w-full flex flex-col gap-md'>
                {rodentStations.map((station) => (
                  <AccordionItem 
                    key={station} 
                    value={`station-${station}`} 
                    className='bg-white rounded-large! border border-muted-foreground/20 px-xl'
                  >
                    <AccordionTrigger className='hover:no-underline py-md'>
                      <div className='flex items-center justify-between w-full pr-sm'>
                        <span className='font-bold text-grayscale-dark text-md text-left w-full'>Estação {station}</span>
                        <button 
                          type='button'
                          className='text-feedback-error-medium hover:text-feedback-error-medium/80 transition-colors z-10 shrink-0 ml-xs cursor-pointer'
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeRodentStation(station);
                          }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='flex flex-col gap-md pb-xl'>
                      <RodentStationContainer stationId={station} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            {/* Footer Actions */}
            <div className='flex flex-col-reverse md:flex-row items-center justify-center gap-md md:gap-xl pt-md'>
              <Button
                variant='link'
                className='text-feedback-error-medium hover:text-feedback-error-medium/80 hover:no-underline'
                onClick={() => setIsStarted(false)}
              >
                Cancelar
              </Button>
              <Button className='bg-brand-cta-dark hover:bg-brand-cta-dark/90 text-white w-full md:w-auto md:min-w-[200px] h-[48px] rounded-small px-xl font-bold text-md'>
                <Check className='mr-xs' size={20} />
                Finalizar serviço
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DetalhesAgendamento;
